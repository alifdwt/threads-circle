import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";

export default new (class ThreadController {
  findThreads(req: Request, res: Response) {
    ThreadServices.findThreads(req, res);
  }
  getThreadById(req: Request, res: Response) {
    ThreadServices.getThreadById(req, res);
  }
  createThread(req: Request, res: Response) {
    ThreadServices.createThread(req, res);
  }
  updateThread(req: Request, res: Response) {
    ThreadServices.updateThread(req, res);
  }
  deleteThread(req: Request, res: Response) {
    ThreadServices.deleteThread(req, res);
  }
})();