import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

export default class FileUpload {
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  private storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.DESTINATION);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  private uploadFile = multer({ storage: this.storage });

  public handleUpload(req: Request, res: Response, next: NextFunction) {
    this.uploadFile.single(this.fieldName)(req, res, function (error: any) {
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.locals.filename = "";
      if (req.file) {
        res.locals.filename = req.file.filename;
      }
      next();
    });
  }
}
