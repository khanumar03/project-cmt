import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type AlertProps = React.ComponentProps<typeof Alert> & {
  title: string;
  description: string;
};

export function Warning({ className, title, description }: AlertProps) {
  return (
    <Alert className={cn(className)}>
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
