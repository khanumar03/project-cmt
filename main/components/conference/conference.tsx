import React, { useState } from "react";
import Step1 from "./steps/step1";
import { Button } from "../ui/button";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";

const Conference = () => {
  const [step, setStep] = useState<number>(1);

  const next = () => {
    if (step < 2 || step < 3) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full flex flex-col space-y-2 justify-start ">
      <div className="flex w-full justify-between items-center">
        <div className="font-bold text-sm">Step {step} of 3</div>
        <div className="flex space-x-2">
          <span
            className={`w-6 rounded-sm h-1 ${
              step == 1 ? "bg-emerald-400" : "bg-gray-300"
            }`}
          ></span>
          <span
            className={`w-6 rounded-sm h-1 ${
              step == 2 ? "bg-emerald-400" : "bg-gray-300"
            }`}
          ></span>
          <span
            className={`w-6 rounded-sm h-1 ${
              step == 3 ? "bg-emerald-400" : "bg-gray-300"
            }`}
          ></span>
        </div>
      </div>
      <div className="w-full">
        {step == 1 && <Step1 />}
        {step == 2 && <Step2 />}
        {step == 3 && <Step3 />}
      </div>
      <div className="flex space-x-5 justify-end items-center">
        <Button variant={"outline"} disabled={step <= 1} onClick={back}>
          Prev
        </Button>
        <Button variant={"outline"} disabled={step >= 3} onClick={next}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Conference;
