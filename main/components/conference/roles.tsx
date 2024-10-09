import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@prisma/client";

interface props {
  defaultRole: string;
  disabled: boolean;
}

const Roles = ({ defaultRole, disabled }: props) => {
  const [value, setValue] = useState<string>(defaultRole);
  return (
    <Select disabled={disabled} defaultValue={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={Role.CHAIR}>Chair</SelectItem>
          <SelectItem value="Manager">Manager</SelectItem>
          <SelectItem value={Role.REVIEWER}>Reveiwer</SelectItem>
          <SelectItem value={Role.AUTHOR}>Author</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Roles;
