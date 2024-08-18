"use client";

import { Plus, Slash } from "lucide-react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { DataTable } from "../../ui/data-table";
import { User } from "@/constants/data";
import { useState } from "react";
import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { IArtist, IMusic } from "@/types/artist";
import MusicModal from "@/components/model/music-modal";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface IProps {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalCreations: number;
  musics: [IMusic];
  artist?: IArtist;
}

export const MusicClient = ({ data }: { data: IProps }) => {
  const page = data?.currentPage;
  const totalCreations = data.totalCreations;
  const pageCount = Math.ceil(totalCreations / data.limit);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggle = () => setIsModalOpen((prev) => !prev);

  const columns: ColumnDef<IMusic>[] = [
    {
      accessorKey: "title",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}> TITLE</div>
      ),
    },

    {
      accessorKey: "album_name",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>ALBUM NAME</div>
      ),
    },
    {
      accessorKey: "genre",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>GENRE</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mt-12 mb-6">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/artist">Artist</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Artist Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
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
        totalCreations={totalCreations}
        pageCount={pageCount}
        data={data.musics}
      />
      {isModalOpen && (
        <MusicModal
          isOpen={isModalOpen}
          toggleModal={toggle}
          clasName="max-w-[80vw]"
        />
      )}
    </>
  );
};
