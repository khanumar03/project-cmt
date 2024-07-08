import { Navbar } from "./_components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-6">
      <Navbar />
      <div className="px-5">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
