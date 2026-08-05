import { useCallback, useState } from "react";
import ChatList, { type Chat } from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleSelectChat = useCallback((chat: Chat) => {
    // Avoid a parent re-render when the active conversation is selected again.
    setSelectedChat((currentChat) =>
      currentChat?.id === chat.id ? currentChat : chat,
    );
  }, []);

  return (
    <section
      className="
        flex h-[calc(100dvh-20px)] min-h-0 overflow-hidden
        bg-white dark:bg-[#121212]
        border border-gray-200 dark:border-gray-800
        rounded-lg shadow-sm
        transition-all duration-300
      "
    >
      <div className="mx-auto flex w-full max-w-6xl min-h-0 flex-1">
        <ChatList
          onSelect={handleSelectChat}
          selectedChatId={selectedChat?.id ?? null}
        />
        <ChatWindow chat={selectedChat} />
      </div>
    </section>
  );
};

export default Messages;
