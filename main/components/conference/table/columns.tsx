"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Status } from "@prisma/client";
import { CheckboxIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export type Submission = {
  email: string;
  country: string;
  status: Status;
  createdAt: Date;
};

const StatusT: { [key: string]: string } = {
  Accepted: "bg-green-500",
  Pending: "bg-yellow-600",
  Reject: "bg-destructive",
};

export const columns: ColumnDef<Submission>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <Button type="button" variant={"link"}>
          {row.getValue("email")}
        </Button>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={"outline"}
          className={`${
            StatusT[row.getValue("status") as string]
          } text-white font-bold`}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
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
