import { memo, useCallback, useState } from "react";
import { X } from "lucide-react";

const USERS = [
  { id: 1, img: "https://i.pravatar.cc/40?u=1" },
  { id: 2, img: "https://i.pravatar.cc/40?u=2" },
  { id: 3, img: "https://i.pravatar.cc/40?u=3" },
] as const;

const FloatingMessages = memo(function FloatingMessages() {
  const [open, setOpen] = useState(false);
  const openMessages = useCallback(() => setOpen(true), []);
  const closeMessages = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* 🔘 Floating Avatar Button */}
      {!open && (
        <button
          type="button"
          onClick={openMessages}
          aria-label="Open messages"
          className="
            fixed bottom-6 right-6 z-[60]
            flex items-center gap-2
            bg-[#262626] text-white
            px-5 py-3 rounded-full
            shadow-lg hover:bg-[#333]
          "
        >
          {/* avatars stack */}
          <div className="flex -space-x-2">
            {USERS.map((user) => (
              <img
                key={user.id}
                src={user.img}
                alt=""
                width={28}
                height={28}
                decoding="async"
                className="w-7 h-7 rounded-full border-2 border-black"
              />
            ))}
          </div>

          <span className="text-sm font-medium">Messages</span>

          {/* unread count */}
          <span className="bg-red-500 text-xs px-2 py-[2px] rounded-full">
            6
          </span>
        </button>
      )}

      {/* 📩 Message Panel */}
      {open && (
        <div
          className="
            fixed bottom-6 right-6 z-[60]
            w-[360px] h-[440px]
            bg-black border border-gray-800
            rounded-xl shadow-2xl
            flex flex-col
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <p className="font-semibold text-sm">Messages</p>
            <button
              type="button"
              onClick={closeMessages}
              aria-label="Close messages"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-400">
            No messages yet
          </div>
        </div>
      )}
    </>
  );
});

export default FloatingMessages;
