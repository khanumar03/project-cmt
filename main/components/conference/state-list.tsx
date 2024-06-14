"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IState } from "country-state-city";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NextPage } from "next";

type Props = {
  data: Array<IState> | null;
};

export const StateList: NextPage<Props> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue("");
  }, [data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={data ? false : true}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[275px] justify-between"
        >
          {value ? value : "Select State"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[275px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <ScrollArea className="h-72 w-100 rounded-md border z-50">
              <CommandGroup>
                {data &&
                  data.map((c, i) => (
                    <CommandItem
                      key={i}
                      value={c.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === c.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {c.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
