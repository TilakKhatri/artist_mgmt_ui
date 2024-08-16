import AddUserForm from "../add-user-form";
import { Modal } from "../ui/modal";

type Iprops = {
  isOpen: boolean;
  toggleModal: () => void;
  clasName?: string;
};

export default function AddNewUserModal({
  isOpen,
  toggleModal,
  clasName,
}: Iprops) {
  return (
    <Modal
      title="Add New User"
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
      <AddUserForm className="mt-4" toggleModal={toggleModal} />
    </Modal>
  );
}
