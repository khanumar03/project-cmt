"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountryList } from "./country-list";
import { useEffect, useState } from "react";
import { Country, ICountry } from "country-state-city";
import { Plus } from "lucide-react";
import { Separator } from "../ui/separator";

export function Invite() {
  const [countryValue, setCountryValue] = useState<string | undefined>();
  const [country, setCountry] = useState<Array<ICountry>>([]);

  console.log(country);
  

  useEffect(() => {
    setCountry(Country.getAllCountries());
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex w-full items-center justify-start text-white">
        <Plus className="mr-2" size={18} strokeWidth={3} color="grey" /> Join conference
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] space-y-1">
        <DialogHeader>
          <DialogTitle>Join Conferences</DialogTitle>
          <DialogDescription>
            Provide the conference or country name
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-1">
            <Label htmlFor="email" className="text-left">
              Conference name
            </Label>
            <Input id="email" type="email" className="w-full" />
            </div>
            <div className="flex flex-col space-y-1">

            <Label htmlFor="cocuntry" className="text-left">
              Country
            </Label>
            <Input id="country" type="text" className="w-full" />
            </div>
        </div>
        <Separator />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Invite;
