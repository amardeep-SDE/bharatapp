import { useEffect, useRef } from "react";
import { Image, X } from "lucide-react";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateModal = ({ open, onClose }: CreateModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-post-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[420px] rounded-xl bg-[#121212] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <p id="create-post-title" className="text-sm font-semibold text-white">
            Create new post
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close create post dialog"
            className="rounded p-1 text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
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

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 rounded-md bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#121212]"
          >
            Select from computer
          </button>

          {/* hidden file input */}
          <input ref={fileInputRef} type="file" accept="image/*,video/*" hidden />
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
