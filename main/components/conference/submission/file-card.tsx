import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/lib/Icons";
import { cn } from "@/lib/utils";
import { File, Trash2 } from "lucide-react";
import path from "path";

const FileCard = ({
  filename,
  size,
  extname,
  path,
  deletFile,
}: {
  filename: string;
  size: number;
  extname: string;
  path: string;
  deletFile: (e: any, path: string) => void;
}) => {
  return (
    <div className="max-w-[400px] flex items-center rounded-xl px-2 py-3 border bg-card text-card-foreground shadow">
      <div className="w-80 flex items-center space-x-1 ">
        {Icons[extname] || Icons["default"]}
        <div className="flex flex-col justify-start -space-y-1">
          <div className="flex items-center">
            <p className="max-w-48 text-sm truncate ">{filename}</p>
            <span className="text-left">{extname}</span>
          </div>
          <span className="text-[10px] font-semibold">{size}MB</span>
        </div>
      </div>
      <div className="w-14">
        <Button
          variant={"destructive"}
          onClick={(e) => deletFile(e, path)}
          type="button"
          size={"sm"}
        >
          <Trash2 size={20} />
        </Button>
      </div>
    </div>
  );
};

export default FileCard;
