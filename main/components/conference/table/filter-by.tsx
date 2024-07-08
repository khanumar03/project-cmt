"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FilterValue } from "@/lib/types";
import { Filter } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const statuses: FilterValue[] = [
  {
    value: undefined,
    label: "-",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "status",
    label: "Status",
  },
  {
    value: "date",
    label: "Date",
  },
];

const FilterDataTable = ({
  currFilter,
  setCurrFilter,
}: {
  currFilter: FilterValue | null;
  setCurrFilter: Dispatch<SetStateAction<FilterValue | null>>;
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[150px] space-x-1 justify-start"
          >
            <Filter color="white" size={22} />
            {currFilter ? (
              <span>{currFilter.label}</span>
            ) : (
              <span>Filter By</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setCurrFilter} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] space-x-1 justify-start">
          <Filter color="white" size={22} />
          {currFilter ? (
            <span>{currFilter.label}</span>
          ) : (
            <span>Filter By</span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setCurrFilter} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: FilterValue | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status, idx) => (
            <CommandItem
              key={idx}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default FilterDataTable;
