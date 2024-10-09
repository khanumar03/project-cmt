import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


const Domains = () => {
  const [value, setValue] = useState<string>("");
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="select domain" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={"sdsds"}>Chair</SelectItem>
          <SelectItem value="Manager">Manager</SelectItem>
          <SelectItem value={"sdsds"}>Reveiwer</SelectItem>
          <SelectItem value={"sdsdsd"}>Author</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default Domains