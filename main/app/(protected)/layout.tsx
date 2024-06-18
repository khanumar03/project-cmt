import { CreateConference } from "@/components/conference/create-conference";
import { Navbar } from "./_components/navbar";
import Link from "next/link";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    // <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
    //   <Navbar />
    //   <div className="flex gap-x-4">
    //     <Link href="/conference/page" legacyBehavior>
    //       <a className="btn btn-primary">Create Conference</a>
    //     </Link>
    //     <Link href="#" legacyBehavior>
    //       <a className="btn btn-secondary">Join Conference</a>
    //     </Link>
    //   </div>
    //   {children}
    // </div>
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
      <Navbar />
      <CreateConference />
      {/* {children} */}
    </div>
  );
};

export default ProtectedLayout;
