import React from "react";
import { X, Image, Video } from "lucide-react";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative bg-[#121212] w-[420px] rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <p className="font-semibold text-sm text-white">Create new post</p>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <Image size={36} />
          </div>

          <p className="text-white font-medium mb-2">
            Drag photos and videos here
          </p>

          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold">
            Select from computer
          </button>

          {/* hidden file input */}
          <input type="file" hidden />
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
