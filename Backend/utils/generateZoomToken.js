import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const generateZoomToken = async () => {
  const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token valid for 1 hour
  };

  return jwt.sign(payload, process.env.ZOOM_API_SECRET);
};

export default generateZoomToken