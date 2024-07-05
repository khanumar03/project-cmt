import { Request, Response } from "express";

export const uploadFiles = (req: Request, res: Response) => {
  if (!req.files) return res.status(500).json({ msg: "something went wrong" });
  return res.status(201).json({ files: req.files });
};
