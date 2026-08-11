import multer from "multer";
import path from "path";
import fs from "node:fs";

const folderName = "public/temps";
const fullPath = path.join(process.cwd(), folderName);

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
    // const ext = file.originalname.match(/\.\w+$/i)?.[0];
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 10485760 } });
export default upload;
