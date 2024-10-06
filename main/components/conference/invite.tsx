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

export function Invite() {
  const [countryValue, setCountryValue] = useState<string | undefined>();
  const [country, setCountry] = useState<Array<ICountry>>([]);

  useEffect(() => {
    setCountry(Country.getAllCountries());
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          Invite More People
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite People to your Conference</DialogTitle>
          <DialogDescription>
            Provide the email for invitation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-left">
              Conference name
            </Label>
            <Input id="email" type="email" className="w-full" />
            <CountryList setCountryValue={setCountryValue} data={country} />
          </div>
          <Button className="self-start mt-2">Join</Button>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Invite;
