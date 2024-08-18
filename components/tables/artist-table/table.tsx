"use client";

import { useState } from "react";
import { Plus, ImportIcon, FileSpreadsheet } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button, buttonVariants } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { DataTable } from "../../ui/data-table";

import { CellAction } from "./cell-action";
import { IArtist } from "@/types/artist";
import ArtistModel from "@/components/model/artist-modal";
import useCsvOperation from "@/hooks/useCsv";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
  const queryClient = useQueryClient();

  const { importCsv } = new useCsvOperation();

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

  async function handleExportCsv() {
    new useCsvOperation().exportCsv();
  }

  const addArtistMutation = useMutation({
    mutationFn: async (input: any) => {
      return importCsv(input);
    },
    onSuccess: () => {
      toast.success("Artist added successfully");
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add artist");
    },
  });

  async function handleImportCsv(event: any) {
    event.preventDefault();
    // console.log("import function call");
    const file = event.target.files[0];

    if (!file) {
      toast.error("Please upload file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    addArtistMutation.mutate(formData);
  }

  return (
    <>
      <div className="flex items-start justify-end mt-12 space-x-2">
        <Button
          variant="outline"
          className="text-xs md:text-sm"
          onClick={() => toggle()}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>

        <label className="flex items-center cursor-pointer bg-gray-100 hover:bg-gray-200 text-black rounded-lg py-2 px-4">
          <ImportIcon className="mr-2 h-4 w-4" />
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImportCsv}
          />
          Import
        </label>

        <Button
          variant="primary"
          className="text-xs md:text-sm"
          onClick={handleExportCsv}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Export
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
