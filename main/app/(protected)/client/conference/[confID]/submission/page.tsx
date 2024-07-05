"use client";

import { getAllSubmission } from "@/actions/get-All-Submission";
import SubmissionCard from "@/components/conference/submission/sub-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

import { Submission } from "@prisma/client";
import { startTransition, useEffect, useState } from "react";

const Page = () => {
  const user = useCurrentUser();
  const [submissions, setSubmissions] = useState<Array<Submission> | null>(
    null
  );

  // useEffect(() => {
  //   if (user)
  //     startTransition(() => {
  //       getAllSubmission().then((data) => {
  //         setSubmissions(data);
  //       });
  //     });
  // }, [user]);

  return (
    <>
      {submissions &&
        submissions.map((submission, idx) => (
          <SubmissionCard key={idx} data={submission} />
        ))}
    </>
  );
};

export default Page;
