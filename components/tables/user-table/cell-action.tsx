"use client";
import UserModal from "@/components/model/user-modal";
import { AlertModal } from "@/components/model/alert-model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/constants/data";
import { setUser } from "@/redux/slices/user.slice";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <>
      {!!userId && (
        <AlertModal
          isOpen={!!userId}
          onClose={() => setUserId(null)}
          loading={loading}
          id={userId}
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

          <DropdownMenuItem onClick={() => setUserData(data)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setUserId(data.id)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {!!userData && (
        <UserModal
          isOpen={!!userData}
          toggleModal={() => setUserData(null)}
          data={userData}
          clasName="max-w-[80vw]"
        />
      )}
    </>
  );
};
