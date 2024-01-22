import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  
  //CLOUDINARY
  export const Image_Save = async (image, path) => {
    try {
      const { createReadStream } = await image;
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: path },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        createReadStream().pipe(uploadStream);
      });
    } catch (error) {
      return Promise.reject(error)
    }
  };