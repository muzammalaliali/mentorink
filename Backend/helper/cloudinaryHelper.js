import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "ddq8vwokx",
  api_key: "216149813367774",
  api_secret: "xluERWgxF9SK_EJumjkZsbmCzSQ",
});

// Function to upload image to Cloudinary
const uploadImageOnCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Failed to delete local file:", err);
    }
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const deleteImageOnCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    throw new Error(error)
  }
}
export  { uploadImageOnCloudinary, deleteImageOnCloudinary }



