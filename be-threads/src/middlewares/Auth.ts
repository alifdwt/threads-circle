import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export default new (class AuthMiddleware {
  Authentication(req: Request, res: Response, next: NextFunction): Response {
    try {
      const Authorization = req.headers.authorization;
      if (!Authorization || !Authorization.startsWith("Bearer ")) {
        return res.status(401).json({ code: 401, message: "Unauthorized" });
      }

      const token = Authorization.split(" ")[1];
      try {
        const loginSession = jwt.verify(token, "rahasia-ilahi");
        res.locals.loginSession = loginSession;
        next();
      } catch (error) {
        return res.status(401).json({ code: 401, message: "Unauthorized" });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "Error while authenticating",
        error: error.message,
      });
    }
  }
})();
