import { v2 as cloudinary } from "cloudinary";
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async ( {stream} ) => {
  try {
    return new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream({folder: 'basic_sample'}, function (
        error,
        result
      ) {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      });
      stream.pipe(streamLoad);
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};
