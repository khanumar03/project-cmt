"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Authors = {
  email: string;
  firstname: string;
  lastname: string;
  org: string;
};

export const columns: ColumnDef<Authors>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "firstname",
    header: "First Name",
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "org",
    header: "Organization",
  },
];
