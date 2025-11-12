import React from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  sidebarWidth: number;
}

const SearchPanel: React.FC<Props> = ({ open, onClose, sidebarWidth }) => {
  if (!open) return null;

  return (
    <>
      {/* Main Search Panel */}
      <div
        className="
          fixed top-0 h-full shadow-lg animate-slideIn z-40
          bg-white dark:bg-[#121212]
          text-gray-800 dark:text-gray-200
          border-l border-gray-200 dark:border-gray-800
          transition-colors duration-300 overflow-y-auto
        "
        style={{ left: sidebarWidth, width: 400 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex justify-between items-center p-4 border-b
            border-gray-200 dark:border-gray-800
            sticky top-0 bg-white dark:bg-[#121212] z-10
            transition-colors
          "
        >
          <h2 className="text-xl font-semibold">Search</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search"
            className="
              w-full px-4 py-2 
              bg-gray-100 dark:bg-gray-800 
              text-sm text-gray-900 dark:text-gray-200
              placeholder-gray-500 dark:placeholder-gray-400
              rounded-md outline-none
              transition-colors duration-300
            "
          />
        </div>

        {/* Recent Section */}
        <p className="px-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
          Recent
        </p>

        <div className="px-4 space-y-2 pb-4">
          {/* Example User Item */}
          <div
            className="
              flex items-center justify-between 
              hover:bg-gray-50 dark:hover:bg-gray-900 
              rounded-md p-2 transition-colors
            "
          >
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100?u=deepa"
                className="w-10 h-10 rounded-full object-cover"
                alt="Deepa Gautam"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  deepa.gautam2510
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Deepa Gautam
                </p>
              </div>
            </div>
            <span className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
              ✕
            </span>
          </div>

          {/* Example 2 (optional extra recent user) */}
          <div
            className="
              flex items-center justify-between 
              hover:bg-gray-50 dark:hover:bg-gray-900 
              rounded-md p-2 transition-colors
            "
          >
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100?u=karan"
                className="w-10 h-10 rounded-full object-cover"
                alt="Karan"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  karan.vlogs_14
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Karan Thakur
                </p>
              </div>
            </div>
            <span className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
              ✕
            </span>
          </div>
        </div>
      </div>

      {/* Overlay Background */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30 transition"
        onClick={onClose}
      ></div>
    </>
  );
};

export default SearchPanel;
