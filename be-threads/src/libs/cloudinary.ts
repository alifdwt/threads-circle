import { v2 as cloudinary } from "cloudinary";

export default new (class CloudinaryConfig {
  upload() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async destination(image: any, folder: string, public_id: string) {
    try {
      const imagePublicId: string = public_id.toLowerCase().replace(/ /g, "_");
      const cloudinaryResponse = await cloudinary.uploader.upload(
        process.env.DESTINATION + image,
        {
          folder: folder,
          public_id: imagePublicId,
        }
      );

      return cloudinaryResponse.secure_url;
    } catch (error) {
      throw error;
    }
  }
})();
