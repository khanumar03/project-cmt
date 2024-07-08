import { Status } from "@prisma/client";

export type FileMetaData = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};
export type FilterValue = {
  value: string | undefined;
  label: string;
};

export type FilterStatusValue = {
  value: Status;
  label: string;
};
