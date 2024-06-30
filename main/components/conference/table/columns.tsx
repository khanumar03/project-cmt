"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Submissions = {
  id: string;
  email: string;
  status: "pending" | "processing" | "success" | "failed";
  date: Date;
};

export const columns: ColumnDef<Submissions>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat("en-GB").format(
        row.getValue("date")
      );

      return <span className="text-right font-medium">{date}</span>;
    },
  },
];
