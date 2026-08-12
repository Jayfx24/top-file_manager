import multer from "multer";
import path from "path";
import fs from "node:fs";
import "dotenv/config";

const folderName = "public/upload";
const fullPath =
  process.env.NODE_ENV == "production"
    ? "/tmp/upload"
    : path.join(process.cwd(), folderName);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    } catch (err) {
      console.error(err);
    }

    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 10485760 } });
export default upload;
