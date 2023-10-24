import { Request, Response } from "express";
import UserServices from "../services/UserServices";

export default new (class UserController {
  findUsers(req: Request, res: Response) {
    UserServices.findUsers(req, res);
  }
  getUserById(req: Request, res: Response) {
    UserServices.getUserById(req, res);
  }
  createUser(req: Request, res: Response) {
    UserServices.createUser(req, res);
  }
  updateUser(req: Request, res: Response) {
    UserServices.updateUser(req, res);
  }
  deleteUser(req: Request, res: Response) {
    UserServices.deleteUser(req, res);
  }
})();
