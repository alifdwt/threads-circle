import { Repository } from "typeorm";
import { Likes } from "../entities/likes";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class LikeServices {
  private readonly LikeRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);

  async findLikes(req: Request, res: Response): Promise<Response> {
    try {
      const likes = await this.LikeRepository.find({
        relations: {
          user: true,
          thread: true,
        },
      });
      if (likes.length <= 0) {
        return res.status(404).json({ code: 404, message: "Likes not found" });
      }

      return res.status(201).json({ code: 201, data: likes });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async getLikeById(req: Request, res: Response): Promise<Response> {
    try {
      const likeId: number = parseInt(req.params.likeId);
      const like = await this.LikeRepository.findOne({
        where: {
          id: likeId,
        },
        relations: {
          user: true,
          thread: true,
        },
      });
      if (!like) {
        return res.status(404).json({ code: 404, message: "Like not found" });
      }

      return res.status(201).json({ code: 201, data: like });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async createLike(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const like = this.LikeRepository.create({
        user: data.userId,
        thread: data.threadId,
      });

      const createLike = await this.LikeRepository.save(like);
      return res.status(201).json({ code: 201, data: createLike });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async deleteLike(req: Request, res: Response): Promise<Response> {
    try {
      const likeId: number = parseInt(req.params.likeId);
      const likeToDelete = await this.LikeRepository.findOne({
        where: {
          id: likeId,
        },
      });
      if (!likeToDelete) {
        return res.status(404).json({ code: 404, error: "Like not found" });
      }

      const deleteLike = await this.LikeRepository.remove(likeToDelete);
      return res.status(201).json({ code: 201, data: deleteLike });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  // async getUserLikes(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { username } = req.params;
  //     const likes = await this.LikeRepository.find({
  //       relations: {
  //         user: true,
  //         thread: true,
  //       },
  //       where: {
  //         user: {
  //           username: username,
  //         },
  //       },
  //     });

  //     if (likes.length <= 0) {
  //       return res.status(404).json({ code: 404, message: "Likes not found" });
  //     }
  //     return res.status(201).json({ code: 201, data: likes });
  //   } catch (error) {
  //     return res.status(500).json({ code: 500, error: error.message });
  //   }
  // }
})();
