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

// import { getNames } from "country-list";
import { Country, City, ICountry, ICity, State } from "country-state-city";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useCon } from "@/Context/DataProvider";
import { NextPage } from "next";

type Props = {
  data: Array<ICountry>;
  handlestate?: (st: string | null) => void;
  setCountryValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const CountryList: NextPage<Props> = ({
  data,
  handlestate,
  setCountryValue,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<ICountry | null>(null);

  React.useEffect(() => {
    if (value) {
      if (handlestate) handlestate(value?.isoCode);
      setCountryValue(value.name);
    } else {
      if (handlestate) handlestate(value);
      setCountryValue(undefined);
    }
  }, [value]);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[275px] justify-between"
        >
          {value ? value.name : "Select Country"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[275px] p-0">
        <Command>
          <CommandInput placeholder="Search country" />
          <CommandList>
            <CommandEmpty>No country found</CommandEmpty>
            <ScrollArea className="h-72 w-100 rounded-md border z-50">
              <CommandGroup>
                {data.map((c, i) => (
                  <CommandItem
                    key={i}
                    value={c.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value?.name ? null : c);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.name === c.name ? "opacity-100" : "opacity-0"
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
