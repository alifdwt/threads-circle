import { Request, Response } from "express";
import ReplyServices from "../services/ReplyServices";

export default new (class ReplyController {
  findReplies(req: Request, res: Response) {
    ReplyServices.findReplies(req, res);
  }
  getReplyById(req: Request, res: Response) {
    ReplyServices.getReplyById(req, res);
  }
  getRepliesByThreadId(req: Request, res: Response) {
    ReplyServices.getRepliesByThreadId(req, res);
  }
  createReply(req: Request, res: Response) {
    ReplyServices.createReply(req, res);
  }
  updateReply(req: Request, res: Response) {
    ReplyServices.updateReply(req, res);
  }
  deleteReply(req: Request, res: Response) {
    ReplyServices.deleteReply(req, res);
  }
})();
