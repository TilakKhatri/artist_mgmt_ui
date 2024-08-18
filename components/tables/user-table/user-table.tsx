"use client";

import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { DataTable } from "../../ui/data-table";
import { User } from "@/constants/data";
import { useState } from "react";
import UserModal from "@/components/model/user-modal";
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
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>FIRST NAME</div>
      ),
    },
    {
      accessorKey: "last_name",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>LAST NAME</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>EMAIL</div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>PHONE</div>
      ),
    },
    {
      accessorKey: "address",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>ADDRESS</div>
      ),
    },
    {
      accessorKey: "dob",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>DOB</div>
      ),
    },
    {
      accessorKey: "gender",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>GENDER</div>
      ),
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
        <UserModal
          isOpen={isModalOpen}
          toggleModal={toggle}
          clasName="max-w-[80vw]"
        />
      )}
    </>
  );
};
