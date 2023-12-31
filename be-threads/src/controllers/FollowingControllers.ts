import { Request, Response } from "express";
import FollowingService from "../services/FollowingService";

export default new (class FollowingController {
  findFollows(req: Request, res: Response) {
    FollowingService.findFollows(req, res);
  }
  getFollowById(req: Request, res: Response) {
    FollowingService.getFollowById(req, res);
  }
  findUsersThatDoNotFollow(req: Request, res: Response) {
    FollowingService.findUsersThatDoNotFollow(req, res);
  }
  createFollow(req: Request, res: Response) {
    FollowingService.createFollow(req, res);
  }
  deleteFollow(req: Request, res: Response) {
    FollowingService.deleteFollow(req, res);
  }
})();
