import { User } from "@/types/user";

import { Modal } from "../ui/modal";
import MusicForm from "../music-form";

type Iprops = {
  artistId?: number;
  isOpen: boolean;
  toggleModal: () => void;
  clasName?: string;
  data: User | null;
};

export default function MusicModal({
  artistId,
  isOpen,
  toggleModal,
  clasName,
  data,
}: Iprops) {
  return (
    <Modal
      title={!data ? "Add New Music" : "Update Music Details "}
      description=""
      isOpen={isOpen}
      onClose={toggleModal}
    >
      <div className="flex justify-end">
        <div
          onClick={toggleModal}
          className="p-1 rounded-full h-fit cursor-pointer bg-neutral-50"
        ></div>
      </div>

      <MusicForm
        className="mt-4"
        toggleModal={toggleModal}
        id={artistId}
        data={data}
      />
    </Modal>
  );
}
