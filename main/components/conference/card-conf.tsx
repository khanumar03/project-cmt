import { BellRing, Check, FilePenLine } from "lucide-react";

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
import { Conference } from "@prisma/client";
import { useSession } from "next-auth/react";

type CardProps = React.ComponentProps<typeof Card> & {
  data: Conference;
};

export const ConferenceCard = ({ className, data, ...props }: CardProps) => {
  return (
    <Card className={cn("w-[380px] mr-10", className)} {...props}>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{`${data.country}, ${data.state}`}</CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <span>Start date: {new Date(data.startDate).toDateString()}</span>
        <span>End date: {new Date(data.endDate).toDateString()}</span>
      </CardContent>
      <CardFooter>
        <Link href={`/client/conference/${data.id}`} className="w-full">
          <Button className="w-full">
            <FilePenLine className="mr-2 h-4 w-4" /> Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ConferenceCard;
