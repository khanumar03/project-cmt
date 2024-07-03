import { File } from "lucide-react";
import { FaFile, FaFilePdf, FaFileWord } from "react-icons/fa";

export const Icons: { [key: string]: JSX.Element } = {
  ".pdf": <FaFilePdf color="red" size={30} />,
  ".doc": <FaFileWord size={30} />,
  ".docx": <FaFileWord color="skyblue" size={30} />,
  ".txt": <FaFile color="blue" size={30} />,
  default: <File size={30} />,
};
