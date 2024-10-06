import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { FileType } from "c:/D/project-cmt/main/node_modules/@prisma/client/default";

export const deleteFile = async (req: Request, res: Response) => {
  const { path: _path, destination } = req.body.file as FileType;
  await fs.unlink(_path);

  let check = await fs.readdir(destination, { recursive: true });

  if (check.length == 0) {
    await fs.rm(destination, { recursive: true, force: true });
    const rel = _path.split("\\");
    rel.pop();
    rel.pop();
    const afterJoin = rel.join("\\");
    check = await fs.readdir(afterJoin, { recursive: true });
    if (check.length == 0)
      await fs.rm(afterJoin, { recursive: true, force: true });
  }

  return res.status(201).json({ msg: "ok" });
};
