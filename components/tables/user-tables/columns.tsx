"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/constants/data";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "first_name",
    header: "firstname",
  },
  {
    accessorKey: "last_name",
    header: "lastname",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "address",
    header: "address",
  },
  {
    accessorKey: "dob",
    header: "dob",
  },
  {
    accessorKey: "gender",
    header: "gender",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
