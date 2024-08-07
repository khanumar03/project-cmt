"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  HTMLAttributes,
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Spinner } from "@nextui-org/spinner";
import { Loader, LoaderCircle, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Status } from "@prisma/client";

const FilterEmail = ({
  state,
  className,
}: {
  state: {
    emailValue: string | undefined;
    setEmailValue: Dispatch<SetStateAction<string | undefined>>;
    isLoading: boolean;
  };
  className?: string;
}) => {
  const [value, setValue] = useState<string>("");
  const [debouncing, setDebouncing] = useState<NodeJS.Timeout | null>();

  useEffect(() => {
    if (debouncing) clearTimeout(debouncing);
    setDebouncing(
      setTimeout(() => {
        state.setEmailValue(value.length ? value : undefined);
      }, 1000)
    );
  }, [value]);

  return (
    <div className="w-full flex items-center space-x-2">
      <Input
        value={value}
        Icon={SearchIcon}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="@gmail.com"
        className={cn(className, "pl-8 w-72")}
      />
      {state.isLoading && (
        <LoaderCircle
          strokeWidth={"3px"}
          size={25}
          className="animate-spin-slow text-green-500 "
        />
      )}
    </div>
  );
};

export default FilterEmail;
