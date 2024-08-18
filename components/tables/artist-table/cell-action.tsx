"use client";
import ArtistModal from "@/components/model/artist-modal";
import { AlertModal } from "@/components/model/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash, ViewIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IArtist } from "@/types/artist";

interface CellActionProps {
  data: IArtist;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [artistData, setArtistData] = useState<IArtist | null>(null);
  const [artistId, setArtistId] = useState<number | null>(null);

  return (
    <>
      {!!artistId && (
        <AlertModal
          isOpen={!!artistId}
          onClose={() => setArtistId(null)}
          loading={loading}
          id={artistId}
        />
      )}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-2">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/artist/${data.id}`)}
          >
            <ViewIcon className="mr-2 h-4 w-4" /> My Creation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setArtistData(data)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setArtistId(data.id)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {!!artistData && (
        <ArtistModal
          isOpen={!!artistData}
          toggleModal={() => setArtistData(null)}
          data={artistData}
          clasName="max-w-[80vw]"
        />
      )}
    </>
  );
};
