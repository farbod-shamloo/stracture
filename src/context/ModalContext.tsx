// context/ModalContext.tsx
import  { createContext, useContext, useState, ReactNode } from "react";

type ModalData = {
  title?: string;
  content: ReactNode;
};

type ModalContextType = {
  openModal: (data: ModalData) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal باید داخل ModalProvider استفاده شود");
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (data: ModalData) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return (
<ModalContext.Provider value={{ openModal, closeModal }}>
  {children}
  {isOpen && modalData && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
          onClick={closeModal}
        >
          &times;
        </button>
        {modalData.title && (
          <h2 className="text-[13px] mb-3 p-2">{modalData.title}</h2>
        )}
        <div>{modalData.content}</div>
      </div>
    </div>
  )}
</ModalContext.Provider>

  );
};
