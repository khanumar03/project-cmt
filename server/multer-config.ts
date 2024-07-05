import { Request } from "express";
import multer from "multer";
import fs from "fs";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    const { confID, userID } = req.query;
    const folderPath = `./uploads/${confID}/${userID}`;
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req: Request, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

export const upload: multer.Multer = multer({ storage });
