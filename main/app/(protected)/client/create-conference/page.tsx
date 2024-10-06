"use client";

import Conference from "@/components/conference/conference";
import { CreateConference } from "@/components/conference/create-conference";

const page = () => {
  return (
    <div className="h-full w-full py-5 px-4">
      <h1 className="text-4xl font-bold mb-5">Conference</h1>
      <Conference />
    </div>
  );
};

export default page;
