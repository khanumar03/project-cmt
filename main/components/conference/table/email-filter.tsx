"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Spinner } from "@nextui-org/spinner";
import { Loader, LoaderCircle } from "lucide-react";

const FilterEmail = ({
  value,
  setValue,
  isLoading,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}) => {
  const params = useSearchParams();

  return (
    <div className="w-full flex items-center space-x-2">
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="@gmail.com"
        className="max-w-sm"
      />
      {isLoading && (
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
