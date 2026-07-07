import { Edit3 } from "lucide-react";
import {
  memo,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
} from "react";

export interface Chat {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  unread: boolean;
}

interface ChatListProps {
  onSelect: (chat: Chat) => void;
  selectedChatId: number | null;
}

const CHATS: Chat[] = [
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
    message: "Reacted to your message",
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

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: (chat: Chat) => void;
}

const ChatListItem = memo(({ chat, isSelected, onSelect }: ChatListItemProps) => {
  const handleSelect = useCallback(() => {
    onSelect(chat);
  }, [chat, onSelect]);

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={`
        flex w-full items-center gap-3 p-3 text-left
        transition-colors duration-200
        ${
          isSelected
            ? "bg-gray-100 dark:bg-gray-800"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `}
    >
      <img
        src={chat.avatar}
        alt={chat.name}
        loading="lazy"
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
          {chat.name}
        </p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
          {chat.message}
          {chat.time ? ` - ${chat.time}` : ""}
        </p>
      </div>
      {chat.unread && (
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-blue-500"
          aria-label="Unread"
        />
      )}
    </button>
  );
});

ChatListItem.displayName = "ChatListItem";

const ChatList = memo(({ onSelect, selectedChatId }: ChatListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const visibleChats = useMemo(() => {
    const query = deferredSearchTerm.trim().toLowerCase();

    if (!query) {
      return CHATS;
    }

    return CHATS.filter(
      (chat) =>
        chat.name.toLowerCase().includes(query) ||
        chat.message.toLowerCase().includes(query),
    );
  }, [deferredSearchTerm]);

  return (
    <div
      className="
        w-full md:w-[400px] border-r h-screen
        bg-white dark:bg-[#121212]
        border-gray-200 dark:border-gray-800
        flex flex-col transition-colors duration-300
      "
    >
      <div
        className="
          flex items-center justify-between p-4
          border-b border-gray-200 dark:border-gray-800
        "
      >
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          10_amardeep_16
        </h2>
        <button
          type="button"
          className="text-gray-800 transition hover:text-blue-500 dark:text-gray-300"
          aria-label="New chat"
        >
          <Edit3 size={20} />
        </button>
      </div>

      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
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

      <div className="overflow-y-auto flex-1">
        {visibleChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isSelected={selectedChatId === chat.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
});

ChatList.displayName = "ChatList";

export default ChatList;
