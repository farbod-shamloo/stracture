import { useModal } from "../../../context/ModalContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import UserFilterForm from "../form/UserFilterForm";

const Filter = ({ onFilter }) => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal({
      title: "فیلتر کاربران",
      content: <UserFilterForm onFilter={onFilter} />,
    });
  };

  return (
    <button
      className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition bg-gray-100"
      onClick={handleClick}
    >
      <Icon icon="solar:filter-linear" width="24" height="24" />
    </button>
  );
};

export default Filter;
