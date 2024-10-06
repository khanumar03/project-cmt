"use client";

import Conference from "@/components/conference/conference";
import { CreateConference } from "@/components/conference/create-conference";

const page = () => {
  return (
    <div className="h-screen w-full py-5 px-4 bg-stone-900">
      <h1 className="text-4xl font-bold mb-5 text-white">Conference</h1>
      <Conference />
    </div>
  );
};

export default page;
