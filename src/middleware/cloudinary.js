import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";
import AppError from "../errors/App.error.js";
/**
 * Setup cloudinary function
 * Upon upload of file to public/temp, send to cloud and save address to DB
 * Error handling if file > 10mb
 * COnfirm acceptable files
 *
 */

export default async function cloudUpload({ path }) {
 
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      use_filename: true,
      unique_filename: true,
      
    });
    return uploadResult;
  } catch (err) {
    console.error(err);
    fs.unlinkSync(path);
    console.log(path, " deleted successfully")
    throw new AppError(err.message);
  }
}
