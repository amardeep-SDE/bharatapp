import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const FloatingMessages: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔘 Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-6 right-6 z-50
            flex items-center gap-2
            bg-[#262626] text-white
            px-4 py-3 rounded-full
            shadow-lg hover:bg-[#333]
          "
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium">Messages</span>

          {/* unread badge */}
          <span className="ml-1 bg-red-500 text-xs px-2 py-[2px] rounded-full">
            6
          </span>
        </button>
      )}

      {/* 📩 Message Panel */}
      {open && (
        <div
          className="
            fixed bottom-6 right-6 z-50
            w-[340px] h-[420px]
            bg-black border border-gray-800
            rounded-xl shadow-2xl
            flex flex-col
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <p className="font-semibold text-sm">Messages</p>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-400">
            <p>No messages yet</p>
            {/* yahan chat list / users ayenge */}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 p-3 text-xs text-gray-500">
            Instagram-style floating inbox
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingMessages;
