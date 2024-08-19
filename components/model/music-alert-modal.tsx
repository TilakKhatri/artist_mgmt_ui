"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import MusicApis from "@/services/music-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  id: number | null;
  artistId: number | null;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  loading,
  id,
  artistId,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const mutation = useMutation({
    mutationFn: async (musicId: number) => {
      return new MusicApis().deleteMusicByIdApi(musicId);
    },
    onSuccess: () => {
      toast.success("Music deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["music"],
      });

      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    },
  });

  if (!isMounted) {
    return null;
  }

  const handleDeleteMusic = () => {
    if (id !== null) {
      mutation.mutate(id);
    }
  };

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button
          disabled={loading || mutation?.isLoading}
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          disabled={loading || mutation?.isLoading}
          variant="destructive"
          onClick={handleDeleteMusic}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
