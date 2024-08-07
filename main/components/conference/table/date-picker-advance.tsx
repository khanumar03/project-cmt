"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  showExternalPresets?: boolean;
  showInternalPresets?: boolean;
  numberOfMonths?: 1 | 2;
  handledata: {
    date: DateRange | undefined;
    setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  };
}

export function DateRangePickerEnhanced({
  showExternalPresets,
  showInternalPresets,
  numberOfMonths = 2,
  handledata,
  className,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  React.useEffect(() => {
    function Update() {
      if (date && date.from && date.to) {
        handledata.setDate(date);
      } else handledata.setDate(undefined);
    }
    Update();
  }, [date, handledata]);

  const handlePresetSelect = (value: string) => {
    switch (value) {
      case "last7Days":
        setDate({
          from: addDays(new Date(), -7),
          to: new Date(),
        });
        break;
      case "last30Days":
        setDate({
          from: addDays(new Date(), -30),
          to: new Date(),
        });
        break;
      case "monthToDate":
        setDate({
          from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          to: new Date(),
        });
        break;
      case "yearToDate":
        setDate({
          from: new Date(new Date().getFullYear(), 0, 1),
          to: new Date(),
        });
        break;
      case "thisYear":
        setDate({
          from: new Date(new Date().getFullYear(), 0, 1),
          to: new Date(new Date().getFullYear(), 11, 31),
        });
        break;
      case "lastYear":
        setDate({
          from: new Date(new Date().getFullYear() - 1, 0, 1),
          to: new Date(new Date().getFullYear() - 1, 11, 31),
        });
        break;
      case "reset":
        setDate({
          from: undefined,
          to: undefined,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn("inline-flex space-x-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "min-w-[150px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto ml-10 p-0" align="end">
          {showInternalPresets ? (
            <>
              <div className="flex">
                <div className="justify-evenly p-2 mt-1">
                  <div
                    className="text-muted-foreground"
                    onClick={() => handlePresetSelect("last7Days")}
                  >
                    <span className="font-bold">Presets</span>
                  </div>
                  <div
                    role="button"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => handlePresetSelect("reset")}
                  >
                    reset
                  </div>
                  <div
                    role="button"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => handlePresetSelect("last7Days")}
                  >
                    Last 7 Days
                  </div>
                  <div
                    role="button"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => handlePresetSelect("last30Days")}
                  >
                    Last 30 Days
                  </div>
                  <div
                    role="button"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => handlePresetSelect("monthToDate")}
                  >
                    Month to Date
                  </div>
                  <div
                    role="button"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => handlePresetSelect("yearToDate")}
                  >
                    Year to Date
                  </div>
                  <div
                    role="button"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => handlePresetSelect("thisYear")}
                  >
                    This Year
                  </div>
                  <div
                    role="button"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => handlePresetSelect("lastYear")}
                  >
                    Last Year
                  </div>
                </div>
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(prev) => {
                    if (prev && prev.from && prev.to) {
                      const offsetFrom =
                        prev.from.getTimezoneOffset() * 60 * 1000;
                      const offsetTo = prev.to.getTimezoneOffset() * 60 * 1000;

                      setDate({
                        from: new Date(prev.from.getTime() - offsetFrom),
                        to: new Date(prev.to.getTime() - offsetTo),
                      });
                    } else setDate(prev);
                  }}
                  numberOfMonths={numberOfMonths}
                />
              </div>
            </>
          ) : (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(prev) => {
                if (prev && prev.from && prev.to) {
                  const offsetFrom = prev.from.getTimezoneOffset() * 60 * 1000;
                  const offsetTo = prev.to.getTimezoneOffset() * 60 * 1000;
                  console.log(new Date(prev.from.toISOString()));

                  setDate({
                    from: new Date(prev.from.getTime() - offsetFrom),
                    to: new Date(prev.to.getTime() - offsetTo),
                  });
                } else setDate(prev);
              }}
              numberOfMonths={numberOfMonths}
            />
          )}
        </PopoverContent>
      </Popover>
      {showExternalPresets && (
        <Select
          onValueChange={(value) => {
            setDate(undefined); // Reset range when a preset is selected
            handlePresetSelect(value);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem
              disabled={date?.from && date?.to ? false : true}
              value="reset"
            >
              Reset
            </SelectItem>
            <SelectItem value="last7Days">Last 7 Days</SelectItem>
            <SelectItem value="last30Days">Last 30 Days</SelectItem>
            <SelectItem value="monthToDate">Month to Date</SelectItem>
            <SelectItem value="yearToDate">Year to Date</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
