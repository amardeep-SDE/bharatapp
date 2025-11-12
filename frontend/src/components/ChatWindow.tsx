import React from "react";
import { Phone, Video, Info, Send } from "lucide-react";

interface ChatWindowProps {
  chat: any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  if (!chat)
    return (
      <div
        className="
          flex flex-1 flex-col items-center justify-center text-center
          bg-white dark:bg-[#121212]
          text-gray-800 dark:text-gray-200
          transition-colors duration-300
        "
      >
        <div
          className="
            w-16 h-16 border rounded-full flex items-center justify-center mb-4
            border-gray-300 dark:border-gray-700
          "
        >
          <Send size={28} className="text-gray-600 dark:text-gray-300" />
        </div>
        <h2 className="text-lg font-semibold">Your messages</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          Send a message to start a chat.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition">
          Send message
        </button>
      </div>
    );

  return (
    <div
      className="
        flex-1 flex flex-col
        bg-white dark:bg-[#121212]
        text-gray-800 dark:text-gray-200
        transition-colors duration-300
      "
    >
      {/* Header */}
      <div
        className="
          flex justify-between items-center border-b p-3
          border-gray-200 dark:border-gray-800
        "
      >
        <div className="flex items-center gap-3">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              {chat.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Active now
            </p>
          </div>
        </div>
        <div className="flex gap-4 text-gray-600 dark:text-gray-400">
          <Video
            size={20}
            className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition"
          />
          <Phone
            size={20}
            className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition"
          />
          <Info
            size={20}
            className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition"
          />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col justify-center items-center text-gray-500 dark:text-gray-400 transition-colors">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-20 h-20 rounded-full mb-3"
        />
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          {chat.name}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          @{chat.name.toLowerCase()}
        </p>
        <button
          className="
            mt-3 px-3 py-1 
            bg-gray-100 dark:bg-gray-800
            text-sm font-semibold text-gray-800 dark:text-gray-200
            rounded-md hover:bg-gray-200 dark:hover:bg-gray-700
            transition
          "
        >
          View profile
        </button>
      </div>

      {/* Message Input */}
      <div
        className="
          border-t p-3 flex items-center gap-3
          border-gray-200 dark:border-gray-800
          bg-gray-50 dark:bg-[#1a1a1a]
          transition-colors
        "
      >
        <input
          type="text"
          placeholder="Message..."
          className="
            flex-1 rounded-full px-4 py-2 outline-none text-sm
            bg-gray-100 dark:bg-gray-800
            text-gray-800 dark:text-gray-200
            placeholder-gray-500 dark:placeholder-gray-400
            transition-colors
          "
        />
        <button>
          <Send
            size={18}
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
