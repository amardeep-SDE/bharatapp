import React from "react";
import { Edit3 } from "lucide-react";

interface ChatListProps {
  onSelect: (chat: any) => void;
  selectedChatId: number | null;
}

const ChatList: React.FC<ChatListProps> = ({ onSelect, selectedChatId }) => {
  const chats = [
    {
      id: 1,
      name: "Janak",
      message: "Sent an attachment",
      time: "11h",
      avatar: "https://i.pravatar.cc/150?u=janak",
      unread: true,
    },
    {
      id: 2,
      name: "Sachin Shukla",
      message: "Reacted 😍 to your message",
      time: "2d",
      avatar: "https://i.pravatar.cc/150?u=sachin",
      unread: true,
    },
    {
      id: 3,
      name: "Anurag Srivastava",
      message: "Active now",
      time: "",
      avatar: "https://i.pravatar.cc/150?u=anurag",
      unread: false,
    },
  ];

  return (
    <div
      className="
        w-full md:w-[400px] border-r h-screen 
        bg-white dark:bg-[#121212]
        border-gray-200 dark:border-gray-800 
        flex flex-col transition-colors duration-300
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center justify-between p-4 
          border-b border-gray-200 dark:border-gray-800
        "
      >
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          10_amardeep_16
        </h2>
        <Edit3
          size={20}
          className="text-gray-800 dark:text-gray-300 cursor-pointer hover:text-blue-500 transition"
        />
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <input
          type="text"
          placeholder="Search"
          className="
            w-full rounded-md 
            bg-gray-100 dark:bg-gray-800 
            text-sm text-gray-800 dark:text-gray-200 
            px-3 py-2 outline-none 
            placeholder-gray-500 dark:placeholder-gray-400
            transition-colors
          "
        />
      </div>

      {/* Tabs */}
      <div
        className="
          flex justify-around border-b text-sm font-semibold
          border-gray-200 dark:border-gray-800
          text-gray-600 dark:text-gray-400
        "
      >
        <button className="w-1/2 py-2 border-b-2 border-black dark:border-white text-black dark:text-white">
          Messages
        </button>
        <button className="w-1/2 py-2 hover:text-black dark:hover:text-white">
          Requests
        </button>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto flex-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat)}
            className={`
              flex items-center gap-3 p-3 cursor-pointer
              transition-colors duration-200
              ${
                selectedChatId === chat.id
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }
            `}
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {chat.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {chat.message} {chat.time && `· ${chat.time}`}
              </p>
            </div>
            {chat.unread && (
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
