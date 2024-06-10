import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full space-y-4 flex-col items-center justify-center bg-slate-300">
      <Image
        src="/somaiya.png"
        alt="img"
        width={120}
        height={80}
        className="dark:invert"
      />
      <div className="space-y-6 text-center">
        <p className="text-[#832921] text-lg">
          Somaiya Conference Management Tool
        </p>
        <div>
          <LoginButton asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
