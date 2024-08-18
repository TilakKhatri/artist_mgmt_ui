"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { DataTable } from "../../ui/data-table";

import { CellAction } from "./cell-action";
import { IArtist } from "@/types/artist";
import ArtistModel from "@/components/model/artist-model";

interface IProps {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalArtists: number;
  artists: [IArtist];
}

export const ArtistClient = ({ data }: { data: IProps }) => {
  const page = data.currentPage;
  const totalArtist = data.totalArtists;
  const pageCount = Math.ceil(totalArtist / data.limit);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggle = () => setIsModalOpen((prev) => !prev);

  const columns: ColumnDef<IArtist>[] = [
    {
      accessorKey: "name",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}> NAME</div>
      ),
    },
    {
      accessorKey: "first_release_year",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>
          FIRST RELEASE YEAR
        </div>
      ),
    },
    {
      accessorKey: "no_of_album_release",
      header: () => (
        <div style={{ fontWeight: "400", color: "black" }}>ALBUM RELEASE</div>
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
        totalArtists={totalArtist}
        pageCount={pageCount}
        data={data.artists}
      />
      {isModalOpen && (
        <ArtistModel
          isOpen={isModalOpen}
          toggleModal={toggle}
          clasName="max-w-[80vw]"
        />
      )}
    </>
  );
};
