"use client";

import { useParams } from "next/navigation";

const Page = () => {
  const { confID, subID } = useParams();

  return <div>hello</div>;
};

export default Page;
