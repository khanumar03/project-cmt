"use client";

import { isAuthorized } from "@/actions/conference-authorize";
import ConferencePage from "@/app/(protected)/_components/conference-page";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Role } from "@prisma/client";
import { ShieldBan } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { confID } = useParams();
  const user = useCurrentUser();
  const role = useCurrentRole();
  const { replace, back } = useRouter();
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    if (!confID || !user?.id) {
      back();
      return () => {};
    }
    let mounted = true;

    async function isAuthorizedRole() {
      if (user && confID && mounted) {
        const ok = await isAuthorized(user.id, confID as string, user?.role);
        setIsTrue(ok);
        if (!ok && mounted) {
          toast.error("You are unauthorized to access this conference", {
            duration: 2000,
            position: "top-center",
            icon: <ShieldBan color="red" size={30} />,
          });
          back();
        }
      }
    }

    isAuthorizedRole();

    return () => {
      mounted = false;
    };
  }, [role]);

  return isTrue && <ConferencePage />;
};

export default Page;
