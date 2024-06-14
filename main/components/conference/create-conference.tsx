"use client";

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
import { CountryList } from "@/components/conference/country-list";

import { Country, City, ICountry, IState, State } from "country-state-city";
import { useEffect, useState } from "react";
import { StateList } from "@/components/conference/state-list";
import { DatePicker } from "./date-picker";
// import { useMutation } from "convex/react";
// import { api } from "../../../convex/_generated/api";

export function CreateConference() {
  const [country, setCountry] = useState<Array<ICountry>>([]);
  const [state, setState] = useState<Array<IState> | null>(null);

  useEffect(() => {
    setCountry(Country.getAllCountries());
  }, []);

  const handlestate = (st: string | null) => {
    setState(st ? State.getStatesOfCountry(st) : null);
  };

  const handlestartdate = () => {};
  const handleenddate = () => {};
  const handleduedate = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Conference</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="min-w-20"
      >
        <DialogHeader>
          <DialogTitle>Create Conference</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" onChange={(event) => {}} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Country
            </Label>
            <CountryList handlestate={handlestate} data={country} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              State
            </Label>
            <StateList data={state} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Start Date
            </Label>
            <DatePicker handledata={handlestartdate} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              End Date
            </Label>
            <DatePicker handledata={handleenddate} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Paper Submission Due Date
            </Label>
            <DatePicker handledata={handleduedate} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              External URL
            </Label>
            <Input id="url" type="url" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Add Domain
            </Label>
            <Input id="subject" type="text" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={async (event) => {}}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
