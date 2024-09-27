import React from "react"
interface Modaltype { isOpen: boolean, onClose: () => void, onConfirm: () => void }

const DeleteModal: React.FC<Modaltype> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        <p className="text-lg mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-green-500 text-white px-4 py-2 rounded">
            No
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal