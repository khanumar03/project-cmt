import { Navbar } from "./_components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex py-2 px-2 space-x-2 bg-black">
      <div className="w-2/12">
        <Navbar />
      </div>
      <div className="w-5/6 h-full bg-white shadow-sm bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-20 saturate-100 backdrop-contrast-100 rounded-sm">
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
