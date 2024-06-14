"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { toast } from "react-hot-toast";

export function DatePicker({ handledata }: { handledata: () => void }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [timeout, settimeout] = React.useState<NodeJS.Timeout | null>(null);

  const handleinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (timeout) clearTimeout(timeout);
    settimeout(
      setTimeout(() => {
        const regex = new RegExp(/^(19|20)[\d]{2,2}$/);
        if (!regex.test(e.target.value) && e.target.value.length > 0) {
          toast.error(<p>Input Error</p>, {
            style: {
              width: 400,
              height: 50,
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            },
            duration: 1000,
            position: "top-center",
            icon: <TriangleAlert color="red" />,
          });
        }
      }, 1000)
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Input
          id="name"
          placeholder={date && date.getFullYear().toString()}
          className="col-span-3"
          onChange={handleinput}
        />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
