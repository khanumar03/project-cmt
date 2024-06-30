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
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { toast } from "react-hot-toast";

export function DatePicker({
  handledata,
  from,
  to,
  isDisabled,
}: {
  handledata: React.Dispatch<React.SetStateAction<Date | undefined>>;
  from?: undefined | Date;
  to?: undefined | Date;
  isDisabled: boolean;
}) {
  const [date, setDate] = React.useState<Date | undefined>();
  const [timeout, settimeout] = React.useState<NodeJS.Timeout | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout) clearTimeout(timeout);
    settimeout(
      setTimeout(() => {
        const regex = new RegExp(/^(19|20)[\d]{2,2}$/);
        if (e.target.value.length <= 0) return;
        if (!regex.test(e.target.value)) {
          toast.error(<p>Input Error</p>, {
            style: {
              width: 400,
              height: 50,
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            },
            duration: 2000,
            position: "top-center",
            icon: <TriangleAlert color="red" size={50} />,
          });
          return;
        }
        if (parseInt(e.target.value) < new Date().getFullYear()) {
          toast.error(<p>invalid year</p>, {
            style: {
              width: 400,
              height: 50,
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            },
            duration: 2000,
            position: "top-center",
            icon: <TriangleAlert color="red" size={50} />,
          });
          return;
        }
        if (from && to) {
          const selectedyear = new Date(
            `${e.target.value}-${(from?.getMonth() + 1).toString()}-${new Date()
              .getDate()
              .toString()}`
          );
          if (
            selectedyear.getTime() < from.getTime() ||
            selectedyear.getTime() > to.getTime()
          ) {
            toast.error(
              <p className="">
                Due Date should be in the range, start and end of conference
                Date
              </p>,
              {
                style: {
                  width: 400,
                  height: 70,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
                duration: 2000,
                position: "top-center",
                icon: <TriangleAlert color="red" size={50} />,
              }
            );
            return;
          }
          setIsOpen(false);
          setDate(
            new Date(
              `${e.target.value}-${(
                from?.getMonth() + 1
              ).toString()}-${new Date().getDate().toString()}`
            )
          );
        } else {
          setIsOpen(false);
          setDate(new Date(`${e.target.value}`));
        }
      }, 1000)
    );
  };

  React.useEffect(() => {
    if (date) handledata(date);
    else handledata(undefined);
  }, [date]);

  React.useEffect(() => {
    const handleDocumentClick = (e: any) => {
      if (!e.target.closest(".content")) {
        if (isOpen) setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]);

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild>
        <Button
          disabled={isDisabled}
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverAnchor>
      <PopoverContent className="content w-full p-0">
        <Input
          id="name"
          placeholder={date && date.getFullYear().toString()}
          className="col-span-3"
          onChange={handleinput}
        />
        <Calendar
          mode="single"
          onSelect={(value) => {
            setDate(value);
            setIsOpen(false);
          }}
          fromDate={from}
          toDate={to}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}
