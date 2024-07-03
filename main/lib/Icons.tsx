import { File, ImageIcon } from "lucide-react";
import { FaFile, FaFileExcel, FaFilePdf, FaFileWord } from "react-icons/fa";

export const Icons: { [key: string]: JSX.Element } = {
  ".pdf": <FaFilePdf color="red" size={30} />,
  ".doc": <FaFileWord size={30} />,
  ".docx": <FaFileWord color="skyblue" size={30} />,
  ".xlsx": <FaFileExcel color="green" size={30} />,
  ".txt": <FaFile color="blue" size={30} />,
  ".png": <ImageIcon size={30} />,
  default: <File size={30} />,
};
