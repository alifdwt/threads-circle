// import { NextFunction, Request, Response } from "express";
// import * as multer from "multer";

// export default new (class UploadImgMiddleware {
//   Upload(fieldName: string) {
//     const storage = multer.diskStorage({
//       destination: (req, res, cb) => {
//         cb(null, "src/uploads");
//       },
//       filename: (req, file, cb) => {
//         cb(null, file.fieldname + "-" + Date.now() + ".png");
//       },
//     });

//     const uploadFile = multer({
//       storage: storage,
//     });

//     return (req: Request, res: Response, next: NextFunction) => {
//       uploadFile.single(fieldName)(req, res, function (err: any) {
//         if (err) {
//           return res.status(400).json({ error: "file uploads failed." });
//         }

//         res.locals.filename = req.file.filename;
//         next();
//       });
//     };
//   }
// })();

const multer = require("multer");
const path = require("path"); // Import modul 'path'

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads")); // Menggunakan path absolut untuk direktori "uploads"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});

const upload = multer({
  storage: store,
});

module.exports = upload;
