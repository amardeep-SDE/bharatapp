import { memo, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface SearchPanelProps {
  open: boolean;
  onClose: () => void;
  sidebarWidth: number;
}

interface RecentUser {
  username: string;
  name: string;
  avatarUrl: string;
}

const PANEL_WIDTH = 400;

const RECENT_USERS: readonly RecentUser[] = [
  {
    username: "deepa.gautam2510",
    name: "Deepa Gautam",
    avatarUrl: "https://i.pravatar.cc/100?u=deepa",
  },
  {
    username: "karan.vlogs_14",
    name: "Karan Thakur",
    avatarUrl: "https://i.pravatar.cc/100?u=karan",
  },
];

const SearchPanel = memo(function SearchPanel({
  open,
  onClose,
  sidebarWidth,
}: SearchPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <aside
        aria-label="Search panel"
        className="fixed top-0 z-40 h-full overflow-y-auto border-l border-gray-200 bg-white text-gray-800 shadow-lg animate-slideIn transition-colors duration-300 dark:border-gray-800 dark:bg-[#121212] dark:text-gray-200"
        style={{ left: sidebarWidth, width: PANEL_WIDTH }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4 transition-colors dark:border-gray-800 dark:bg-[#121212]">
          <h2 className="text-xl font-semibold">Search</h2>
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="text-gray-600 transition hover:text-red-500 dark:text-gray-400"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="p-4">
          <input
            ref={inputRef}
            type="search"
            placeholder="Search"
            aria-label="Search users"
            className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-900 outline-none transition-colors duration-300 placeholder:text-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-400"
          />
        </div>

        <p className="mb-2 px-4 text-sm text-gray-500 dark:text-gray-400">Recent</p>

        <ul className="space-y-2 px-4 pb-4">
          {RECENT_USERS.map((user) => (
            <li
              key={user.username}
              className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={user.avatarUrl}
                  className="h-10 w-10 rounded-full object-cover"
                  alt=""
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {user.username}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {user.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Remove ${user.username} from recent searches`}
                className="ml-3 shrink-0 text-gray-400 transition hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <button
        type="button"
        aria-label="Close search"
        className="fixed inset-0 z-30 cursor-default bg-black/20 transition dark:bg-black/40"
        onClick={onClose}
      />
    </>
  );
});

export default SearchPanel;
