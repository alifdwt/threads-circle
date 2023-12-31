import { Repository } from "typeorm";
import { Threads } from "../entities/threads";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  createThreadsSchema,
  updateThreadsSchema,
} from "../utils/validator/threads";
import { uploadToCloudinary } from "../utils/cloudinary/cloudinary";
import { deleteFile } from "../utils/fileHelper/fileHelper";

export default new (class ThreadServices {
  private readonly ThreadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  async findThreads(req: Request, res: Response): Promise<Response> {
    try {
      const threads = await this.ThreadRepository.find({
        relations: {
          user: true,
          replies: true,
          likes: {
            user: true,
          },
        },
        order: {
          created_at: "DESC",
        },
      });

      if (threads.length <= 0) {
        return res
          .status(404)
          .json({ code: 404, message: "Threads not found" });
      }

      return res.status(200).json({ code: 200, data: threads });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async getThreadById(req: Request, res: Response): Promise<Response> {
    try {
      const threadId: number = parseInt(req.params.threadId);
      const thread = await this.ThreadRepository.findOne({
        where: {
          id: threadId,
        },
        relations: {
          user: true,
          replies: true,
          likes: {
            user: true,
          },
        },
      });

      if (!thread) {
        return res.status(404).json({ code: 404, message: "Thread not found" });
      }

      return res.status(200).json({ code: 200, data: thread });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async getThreadsByUsername(req: Request, res: Response): Promise<Response> {
    try {
      const username: string = req.params.username;
      const threads = await this.ThreadRepository.find({
        where: {
          user: {
            username: username,
          },
        },
        relations: {
          user: true,
          replies: true,
          likes: {
            user: true,
          },
        },
        order: {
          created_at: "DESC",
        },
      });
      if (threads.length <= 0) {
        return res
          .status(404)
          .json({ code: 404, message: "Threads not found" });
      }

      return res.status(200).json({ code: 200, data: threads });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async getThreadsThatUserLiked(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const username: string = req.params.username;
      const threads = await this.ThreadRepository.find({
        where: {
          likes: {
            user: {
              username: username,
            },
          },
        },
        relations: {
          user: true,
          replies: true,
          likes: {
            user: true,
          },
        },
      });

      if (threads.length <= 0) {
        return res
          .status(404)
          .json({ code: 404, message: "Threads not found" });
      }
      return res.status(200).json({ code: 200, data: threads });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async createThread(req: Request, res: Response): Promise<Response> {
    try {
      const user = res.locals.loginSession;
      const inputData = req.body;
      let imageResult;
      if (req.file && req.file.filename) {
        const image = req.file.filename;
        imageResult = await uploadToCloudinary(
          image,
          `Circle/profile/${user.user.username}/threads`,
          image
        );
        deleteFile(req.file.filename);
      }

      const data = {
        content: inputData.content,
        image: imageResult,
        userId: user.user.id,
      };

      const { error, value } = createThreadsSchema.validate(data);
      if (error) {
        return res.status(400).json({ code: 400, error: error.message });
      }

      const thread = this.ThreadRepository.create({
        content: value.content,
        image: value.image,
        user: value.userId,
      });

      const createdThread = await this.ThreadRepository.save(thread);

      return res.status(201).json({ code: 201, data: createdThread });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async updateThread(req: Request, res: Response): Promise<Response> {
    try {
      const threadId: number = parseInt(req.params.threadId);
      const user = res.locals.loginSession;

      const updateThread = req.body;
      if (!updateThread) {
        return res.status(404).json({ code: 404, error: "Thread not found" });
      }

      let imageResult;
      if (req.file && req.file.filename) {
        const image = req.file.filename;
        imageResult = await uploadToCloudinary(
          image,
          `Circle/profile/${user.user.username}/threads`,
          image
        );
        deleteFile(req.file.filename);
      }

      const data = {
        content: updateThread.content,
        image: imageResult,
        userId: user.user.id,
      };

      const { value, error } = updateThreadsSchema.validate(data);
      if (error) {
        return res.status(400).json({ code: 400, error: error.message });
      }

      const thread = await this.ThreadRepository.findOne({
        relations: {
          user: true,
          replies: true,
          likes: {
            user: true,
          },
        },
        where: {
          id: threadId,
        },
      });

      if (value.content == "") {
        value.content = thread[0].content;
      }
      if (value.image == "") {
        value.image = thread[0].image;
      }

      console.log(value);

      // const update = await this.ThreadRepository.update(thread, value);
      const update = await this.ThreadRepository.createQueryBuilder()
        .update(Threads)
        .set({
          content: value.content,
          image: value.image,
          user: value.userId,
        })
        .where("id = :id", { id: threadId })
        .execute();
      res.status(200).json({ code: 200, data: update });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async deleteThread(req: Request, res: Response): Promise<Response> {
    try {
      const threadId: number = parseInt(req.params.threadId);
      const threadToDelete = await this.ThreadRepository.findOne({
        where: {
          id: threadId,
        },
      });

      if (!threadToDelete) {
        return res.status(404).json({ code: 404, message: "Thread not found" });
      }

      await this.ThreadRepository.remove(threadToDelete);
      return res
        .status(200)
        .json({ code: 200, message: `Thread with id ${threadId} deleted` });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }
})();
