import { Request, Response } from "express";
import LikeServices from "../services/LikeServices";

export default new (class LikeController {
  findLikes(req: Request, res: Response) {
    LikeServices.findLikes(req, res);
  }
  getLikeById(req: Request, res: Response) {
    LikeServices.getLikeById(req, res);
  }
  createLike(req: Request, res: Response) {
    LikeServices.createLike(req, res);
  }
  deleteLike(req: Request, res: Response) {
    LikeServices.deleteLike(req, res);
  }
  // getUserLikes(req: Request, res: Response) {
  //   LikeServices.getUserLikes(req, res);
  // }
})();
