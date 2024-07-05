import express, { Request, Response } from "express";
import { upload } from "./multer-config";
import { uploadFiles } from "./Controllers/uploadFiles";
import { deleteFile } from "./Controllers/deleteFile";

export const router: express.IRouter = express.Router();

router.get("/testing", (req: Request, res: Response) => {
  return res.status(200).json({ ok: "ok" });
});

router.post("/upload", upload.array("files"), uploadFiles);
router.patch("/delete", deleteFile);
