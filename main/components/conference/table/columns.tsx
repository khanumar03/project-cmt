"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Status } from "@prisma/client";
import { CheckboxIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
export type Submission = {
  id: string;
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
        <Link
          href={`/client/submission?email=${row.getValue("email")}&subid=${
            row.original.id
          }`}
        >
          <Button type="button" variant={"link"}>
            {row.getValue("email")}
          </Button>
        </Link>
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
        <div className="flex space-x-1 justify-left items-center">
          <Badge
            variant={"outline"}
            className={`${
              StatusT[row.getValue("status") as string]
            } text-white font-bold`}
          >
            {row.getValue("status")}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                disabled={(row.getValue("status") as string) === "Accepted"}
              >
                Accept
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={(row.getValue("status") as string) === "Reject"}
              >
                Reject
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={(row.getValue("status") as string) === "Pending"}
              >
                Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
