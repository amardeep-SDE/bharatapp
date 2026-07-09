import React, { useCallback, useState } from "react";
import ChatList, { type Chat } from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const handleSelectChat = useCallback((chat: Chat) => {
    setSelectedChat(chat);
  }, []);

  return (
    <section
      className="
        flex h-[calc(100vh-20px)]
        bg-white dark:bg-[#121212]
        border border-gray-200 dark:border-gray-800
        rounded-lg shadow-sm
        transition-all duration-300
      "
    >
      <div className="flex flex-1 max-w-6xl mx-auto w-full">
        <ChatList
          onSelect={handleSelectChat}
          selectedChatId={selectedChat?.id || null}
        />
        <ChatWindow chat={selectedChat} />
      </div>
    </section>
  );
};

export default Messages;
