"use client";

import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { DataTable } from "../../ui/data-table";
import { User } from "@/constants/data";
import { useState } from "react";
import AddNewUserModal from "@/components/model/add-user-modal";
import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";

interface IProps {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalUsers: number;
  users: [User];
}

export const UserClient = ({ data }: { data: IProps }) => {
  const page = data.currentPage;
  const totalUsers = data.totalUsers;
  const pageCount = Math.ceil(totalUsers / data.limit);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggle = () => setIsModalOpen((prev) => !prev);

  const columns: ColumnDef<User>[] = [
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

  return (
    <>
      <div className="flex items-start justify-end mt-12">
        <Button
          variant="primary"
          className="text-xs md:text-sm"
          onClick={() => toggle()}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        pageNo={page}
        columns={columns}
        totalUsers={totalUsers}
        pageCount={pageCount}
        data={data.users}
      />
      {isModalOpen && (
        <AddNewUserModal
          isOpen={isModalOpen}
          toggleModal={toggle}
          clasName="max-w-[80vw]"
        />
      )}
    </>
  );
};
