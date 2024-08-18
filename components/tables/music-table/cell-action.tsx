"use client";
import { AlertModal } from "@/components/model/music-alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { IMusic } from "@/types/artist";
import MusicModal from "@/components/model/music-modal";

interface CellActionProps {
  data: IMusic;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [musicInfo, setMusicInfo] = useState<IMusic | null>(null);
  const [musicId, setMusicId] = useState<number | null>(null);

  const artistId = useMemo(() => parseInt(path.split("/")[3], 10), [path]);
  console.log(artistId);
  return (
    <>
      {!!musicId && (
        <AlertModal
          isOpen={!!musicId}
          onClose={() => setMusicId(null)}
          loading={loading}
          id={data.id}
          artistId={artistId}
        />
      )}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setMusicInfo(data)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMusicId(data.id)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {!!musicInfo && (
        <MusicModal
          isOpen={!!musicInfo}
          toggleModal={() => setMusicInfo(null)}
          data={musicInfo}
          clasName="max-w-[80vw]"
        />
      )}
    </>
  );
};
