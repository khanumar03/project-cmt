"use client";
import { Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type Submission = {
  country: string;
  status: Status | null;
  currActiveMail: string;
  createdAt: Date;
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
];
