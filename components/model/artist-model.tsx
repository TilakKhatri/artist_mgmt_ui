import { User } from "@/types/user";

import { Modal } from "../ui/modal";
import ArtistForm from "../artist-form";

type Iprops = {
  isOpen: boolean;
  toggleModal: () => void;
  clasName?: string;
  data: User | null;
};

export default function ArtistModal({
  isOpen,
  toggleModal,
  clasName,
  data,
}: Iprops) {
  return (
    <Modal
      title={!data ? "Add New Artist" : "Update Artist Details "}
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
      {/* <AddUserForm className="mt-4" toggleModal={toggleModal} data={data} /> */}
      <ArtistForm className="mt-4" toggleModal={toggleModal} data={data} />
    </Modal>
  );
}
