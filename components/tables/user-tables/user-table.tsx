"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";
import { User } from "@/constants/data";

interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-end mt-12">
        <Button
          variant="primary"
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
