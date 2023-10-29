import { Repository } from "typeorm";
import { Following } from "../entities/following";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class FollowingService {
  private readonly FollowingRepository: Repository<Following> =
    AppDataSource.getRepository(Following);

  async findFollows(req: Request, res: Response): Promise<Response> {
    try {
      const follows = await this.FollowingRepository.find({
        relations: {
          follower: true,
          following: true,
        },
      });
      if (follows.length <= 0) {
        return res
          .status(404)
          .json({ code: 404, message: "Follows not found" });
      }

      return res.status(201).json({ code: 201, data: follows });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async getFollowById(req: Request, res: Response): Promise<Response> {
    try {
      const followId: number = parseInt(req.params.followId);
      const follow = await this.FollowingRepository.findOne({
        where: {
          id: followId,
        },
        relations: {
          follower: true,
          following: true,
        },
      });

      if (!follow) {
        return res.status(404).json({ code: 404, message: "Follow not found" });
      }

      return res.status(201).json({ code: 201, data: follow });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async createFollow(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const follow = this.FollowingRepository.create({
        follower: data.followerId,
        following: data.followingId,
      });

      const createFollow = await this.FollowingRepository.save(follow);
      return res.status(201).json({ code: 201, data: createFollow });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }
})();