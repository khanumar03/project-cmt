import { Navbar } from "./_components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-6">
      <Navbar />
      {/* <CreateConference /> */}
      <div className="px-5">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
