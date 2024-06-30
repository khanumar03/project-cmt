"use client";

import { columns, Submissions } from "@/components/conference/table/columns";
import { DataTable } from "@/components/conference/table/data-table";
import { addDays } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const data = [
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },

  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  {
    id: "728ed52f",
    email: "m@example.com",
    status: "pending",
    date: new Date(),
  },
  // ...
];

const Page = () => {
  const { confID } = useParams();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [filterdata, setFilterData] = useState<Array<any>>(data);

  useEffect(() => {
    if (date && date.from != undefined && date.to != undefined) {
      const new_data = data.filter((x) => {
        if (!date.from || !date.to) return false;
        return new Date(x.date) >= date.from && new Date(x.date) <= date.to;
      });
      setFilterData(new_data);
    }
  }, [date]);
  return (
    <div className="container mx-auto py-10">
      <DataTable
        handledate={{ date, setDate }}
        columns={columns}
        data={filterdata}
      />
    </div>
  );
};

export default Page;
