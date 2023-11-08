import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Replies } from "../entities/replies";
import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinary/cloudinary";
import { deleteFile } from "../utils/fileHelper/fileHelper";

export default new (class ReplyServices {
  private readonly ReplyRepository: Repository<Replies> =
    AppDataSource.getRepository(Replies);

  async findReplies(req: Request, res: Response): Promise<Response> {
    try {
      const replies = await this.ReplyRepository.find({
        relations: {
          user: true,
          thread: true,
        },
      });

      if (replies.length <= 0) {
        return res
          .status(404)
          .json({ code: 404, message: "Replies not found" });
      }

      return res.status(201).json({ code: 201, data: replies });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async getReplyById(req: Request, res: Response): Promise<Response> {
    try {
      const replyId: number = parseInt(req.params.replyId);
      const reply = await this.ReplyRepository.findOne({
        where: {
          id: replyId,
        },
        relations: {
          user: true,
          thread: true,
        },
      });

      if (!reply) {
        return res.status(404).json({ code: 404, message: "Reply not found" });
      }

      return res.status(201).json({ code: 201, data: reply });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async getRepliesByThreadId(req: Request, res: Response): Promise<Response> {
    try {
      const threadId: number = parseInt(req.params.threadId);
      const replies = await this.ReplyRepository.find({
        where: {
          thread: {
            id: threadId,
          },
        },
        relations: {
          user: true,
          thread: true,
        },
      });

      if (replies.length <= 0) {
        return res
          .status(404)
          .json({ code: 404, message: "Replies not found" });
      }

      return res.status(201).json({ code: 201, data: replies });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async createReply(req: Request, res: Response): Promise<Response> {
    try {
      const user = res.locals.loginSession;
      const inputData = req.body;
      let imageResult;
      if (req.file && req.file.filename) {
        const image = req.file.filename;
        imageResult = await uploadToCloudinary(
          image,
          `Circle/profile/${user.user.username}/replies`,
          image
        );
        deleteFile(req.file.filename);
      }

      const reply = this.ReplyRepository.create({
        content: inputData.content,
        image: imageResult,
        user: user.user.id,
        thread: inputData.threadId,
      });

      const createReply = await this.ReplyRepository.save(reply);
      return res.status(201).json({ code: 201, data: createReply });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async updateReply(req: Request, res: Response): Promise<Response> {
    try {
      const replyId: number = parseInt(req.params.replyId);
      const userId = res.locals.loginSession.user.id;
      const replyToUpdate = req.body;
      console.log(replyToUpdate);
      if (!replyToUpdate) {
        return res.status(404).json({ code: 404, error: "Reply not found" });
      }
      const reply = await this.ReplyRepository.findOne({
        where: {
          id: replyId,
        },
        relations: {
          thread: true,
        },
      });

      if (replyToUpdate.content == "") {
        replyToUpdate.content = reply.content;
      }
      if (replyToUpdate.image == "") {
        replyToUpdate.image = reply.image;
      }
      replyToUpdate.thread = reply.thread.id;

      const update = await this.ReplyRepository.createQueryBuilder()
        .update(Replies)
        .set({
          content: replyToUpdate.content,
          image: replyToUpdate.image,
          user: userId,
        })
        .where("id = :id", { id: replyId })
        .execute();
      return res.status(200).json({ code: 200, data: update });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async deleteReply(req: Request, res: Response): Promise<Response> {
    try {
      const replyId: number = parseInt(req.params.replyId);
      const replyToDelete = await this.ReplyRepository.findOne({
        where: {
          id: replyId,
        },
      });
      if (!replyToDelete) {
        return res.status(404).json({ code: 404, error: "Reply not found" });
      }

      const deleteReply = await this.ReplyRepository.remove(replyToDelete);
      return res.status(200).json({ code: 200, data: deleteReply });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }
})();
