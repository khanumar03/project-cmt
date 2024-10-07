import { Navbar } from "./_components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex py-5 px-2 space-x-2 bg-black">
      <div className="w-2/12 h-full">
        <Navbar />
      </div>
      <div className="w-5/6 overflow-hidden h-full bg-gray-900/50 backdrop-blur-lg backdrop-filter rounded-lg ring-2 ring-zinc-900 ">
        {children}
      </div>
    </div>
  );
};



export default ProtectedLayout;
