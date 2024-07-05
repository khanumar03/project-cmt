import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Submission } from "@prisma/client";

type CardProps = React.ComponentProps<typeof Card> & {
  data: Submission;
};

export const SubmissionCard = ({ className, data, ...props }: CardProps) => {
  return (
    <Card className={cn("w-full shadow-md", className)} {...props}>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Submission Details</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Title</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {data.title}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Abstract</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {/* {submission.abstract} */}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Contact No</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {/* {submission.contactNo} */}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Country</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {/* {submission.country} */}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">State</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {/* {submission.state} */}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Authors</p>
          <div className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {/* {submission.authors.join(", ")} */}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Files</p>
          <div className="flex flex-col space-y-2">
            {/* {submission.files.map((file, index) => (
            <a href={file.url} key={index} className="text-blue-600 underline">
              {file.name}
            </a>
          ))} */}
          </div>
        </div>
      </CardContent>
      <div className="flex justify-end space-x-2 p-3">
        <Button>Edit</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </Card>
  );
};

export default SubmissionCard;
