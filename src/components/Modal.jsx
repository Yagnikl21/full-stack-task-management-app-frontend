import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#f1f1f1] p-6 rounded-lg w-1/3 relative border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
