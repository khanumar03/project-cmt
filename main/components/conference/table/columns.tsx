"use client";
import { Button } from "@/components/ui/button";
import { Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Submission = {
  country: string;
  status: Status | null;
  currActiveMail: string;
  createdAt: Date;
  // detail: null;
};

export const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: "currActiveMail",
    header: "Email",
  },
  {
    accessorKey: "country",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat("en-GB").format(
        row.getValue("createdAt")
      );

      return <span className="text-right font-medium">{date}</span>;
    },
  },
  // {
  //   accessorKey: "Details",
  //   header: "Show Submission",
  //   cell: () => {
  //     return (
  //       <Link href={"/client/conference/submisson"}>
  //         <Button>Show</Button>
  //       </Link>
  //     );
  //   },
  // },
];
