"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DateRangePickerEnhanced } from "./date-picker-advance";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { FilterStatus } from "./filter-status";
import FilterEmail from "./email-filter";

export function DataTable({
  columns,
  data,
  handledate,
  filterby,
  filterEmail,
  isLoading,
  setIsLoading,
  totalrow,
  activeRowSet,
  prev,
  next,
  onPage,
}: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {filterby?.value === "email" && (
          <FilterEmail
            isLoading={isLoading}
            value={filterEmail.filterEmail}
            setValue={filterEmail.setFilterEmail}
          />
        )}
        {filterby?.value === "date" && (
          <DateRangePickerEnhanced
            handledata={handledate}
            showExternalPresets
            numberOfMonths={1}
          />
        )}

        {filterby?.value === "status" && <FilterStatus />}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
      <div
        className={`w-full flex justify-center space-x-2 ${
          isLoading ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                type="button"
                variant={"ghost"}
                disabled={activeRowSet === 1}
                onClick={() => prev()}
                className="flex items-center"
              >
                <ChevronLeft size={18} />
                Previous
              </Button>
            </PaginationItem>
            {totalrow.map((_: any, idx: number) => (
              <PaginationItem key={idx + 1}>
                <PaginationLink
                  isActive={activeRowSet == idx + 1}
                  className="cursor-pointer"
                  onClick={() => onPage(idx + 1)}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <Button
                type="button"
                variant={"ghost"}
                disabled={activeRowSet === totalrow.length}
                onClick={() => next()}
                className="flex items-center"
              >
                next
                <ChevronRight size={18} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
  // const [columnVisibility, setColumnVisibility] =
  //   React.useState<VisibilityState>({});

  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // );

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onColumnFiltersChange: setColumnFilters,
  //   getFilteredRowModel: getFilteredRowModel(),
  //   state: {
  //     columnVisibility,
  //     columnFilters,
  //   },
  // });

  // return (
  //   <div className="w-full h-full">
  //     <div className="flex items-center py-4">
  //       <DateRangePickerEnhanced
  //         handledata={handledate}
  //         showExternalPresets
  //         numberOfMonths={1}
  //       />
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="outline" className="ml-auto">
  //             Columns <ChevronDown className="ml-2 h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           {table
  //             .getAllColumns()
  //             .filter((column) => column.getCanHide())
  //             .map((column) => {
  //               return (
  //                 <DropdownMenuCheckboxItem
  //                   key={column.id}
  //                   className="capitalize"
  //                   checked={column.getIsVisible()}
  //                   onCheckedChange={(value) =>
  //                     column.toggleVisibility(!!value)
  //                   }
  //                 >
  //                   {column.id}
  //                 </DropdownMenuCheckboxItem>
  //               );
  //             })}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     </div>
  //     <div className="rounded-md border">
  //       <Table>
  //         <TableHeader>
  //           {table.getHeaderGroups().map((headerGroup) => (
  //             <TableRow key={headerGroup.id}>
  //               {headerGroup.headers.map((header) => {
  //                 return (
  //                   <TableHead key={header.id}>
  //                     {header.isPlaceholder
  //                       ? null
  //                       : flexRender(
  //                           header.column.columnDef.header,
  //                           header.getContext()
  //                         )}
  //                   </TableHead>
  //                 );
  //               })}
  //             </TableRow>
  //           ))}
  //         </TableHeader>
  //         <TableBody>
  //           {table.getRowModel().rows?.length ? (
  //             table.getRowModel().rows.map((row) => (
  //               <TableRow
  //                 key={row.id}
  //                 data-state={row.getIsSelected() && "selected"}
  //               >
  //                 {row.getVisibleCells().map((cell) => (
  //                   <TableCell className="p-3" key={cell.id}>
  //                     {flexRender(
  //                       cell.column.columnDef.cell,
  //                       cell.getContext()
  //                     )}
  //                   </TableCell>
  //                 ))}
  //               </TableRow>
  //             ))
  //           ) : (
  //             <TableRow>
  //               <TableCell
  //                 colSpan={columns.length}
  //                 className="h-24 text-center"
  //               >
  //                 No data
  //               </TableCell>
  //             </TableRow>
  //           )}
  //         </TableBody>
  //       </Table>
  //     </div>
  //     <div className="flex items-center justify-end space-x-2 py-4">
  //       <Button
  //         variant="outline"
  //         size="sm"
  //         onClick={() => table.previousPage()}
  //         disabled={!table.getCanPreviousPage()}
  //       >
  //         Previous
  //       </Button>
  //       <Button
  //         variant="outline"
  //         size="sm"
  //         onClick={() => table.nextPage()}
  //         disabled={!table.getCanNextPage()}
  //       >
  //         Next
  //       </Button>
  //     </div>
  //   </div>
  // );
}
