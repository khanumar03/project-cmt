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
  const handlePresetSelect = (value: string) => {
    switch (value) {
      case "last7Days":
        handledata.setDate({
          from: addDays(new Date(), -7),
          to: new Date(),
        });
        break;
      case "last30Days":
        handledata.setDate({
          from: addDays(new Date(), -30),
          to: new Date(),
        });
        break;
      case "monthToDate":
        handledata.setDate({
          from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          to: new Date(),
        });
        break;
      case "yearToDate":
        handledata.setDate({
          from: new Date(new Date().getFullYear(), 0, 1),
          to: new Date(),
        });
        break;
      case "thisYear":
        handledata.setDate({
          from: new Date(new Date().getFullYear(), 0, 1),
          to: new Date(new Date().getFullYear(), 11, 31),
        });
        break;
      case "lastYear":
        handledata.setDate({
          from: new Date(new Date().getFullYear() - 1, 0, 1),
          to: new Date(new Date().getFullYear() - 1, 11, 31),
        });
        break;
      case "reset":
        handledata.setDate({
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
              "w-[260px] justify-start text-left font-normal",
              !handledata.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {handledata.date?.from ? (
              handledata.date.to ? (
                <>
                  {format(handledata.date.from, "LLL dd, y")} -{" "}
                  {format(handledata.date.to, "LLL dd, y")}
                </>
              ) : (
                format(handledata.date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          {showInternalPresets ? (
            <>
              <div className="flex">
                <div className="justify-evenly p-2">
                  <div
                    className="text-muted-foreground"
                    onClick={() => handlePresetSelect("last7Days")}
                  >
                    <span className="font-bold underline">Presets</span>
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
                  defaultMonth={handledata.date?.from}
                  selected={handledata.date}
                  onSelect={handledata.setDate}
                  numberOfMonths={numberOfMonths}
                />
              </div>
            </>
          ) : (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={handledata.date?.from}
              selected={handledata.date}
              onSelect={handledata.setDate}
              numberOfMonths={numberOfMonths}
            />
          )}
        </PopoverContent>
      </Popover>
      {showExternalPresets && (
        <Select
          onValueChange={(value) => {
            handledata.setDate(undefined); // Reset range when a preset is selected
            handlePresetSelect(value);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem
              disabled={
                handledata.date?.from && handledata.date?.to ? false : true
              }
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
