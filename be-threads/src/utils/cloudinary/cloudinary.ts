// import { rejects } from "assert";
// import { v2 as cloudinary } from "cloudinary";
// import { error } from "console";
// import * as dotenv from "dotenv";
// import { func } from "joi";
// import { resolve } from "path";

// dotenv.config();

// const uploadToCloudinary = (
//   file: string,
//   folder: string,
//   public_id: string
// ): Promise<string> => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   const imagePublicId: string = public_id.toLowerCase().replace(/ /g, "_");
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       `src/uploads/${file}`,
//       { folder: folder, public_id: imagePublicId },
//       (error, result) => {
//         if (error) {
//           return reject(error);
//         }
//         return resolve(result.secure_url);
//       }
//     );
//   });
// };

// const DeleteFromCloudinary = (
//   folder: string,
//   public_id: string
// ): Promise<string> => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   const imagePublicId: string = public_id.toLowerCase().replace(/ /g, "_");
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.destroy(
//       `${folder}/${imagePublicId}`,
//       (error, result) => {
//         if (error) {
//           return reject(error);
//         }
//         return resolve(result);
//       }
//     );
//   });
// };

// export { uploadToCloudinary, DeleteFromCloudinary };
