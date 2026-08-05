import { memo, useCallback, useState } from "react";
import {
  Bookmark,
  Film,
  Grid,
  PlusCircle,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type TabId = "posts" | "reels" | "saved" | "tagged";

const TABS: readonly { id: TabId; icon: LucideIcon; label: string }[] = [
  { id: "posts", icon: Grid, label: "Posts" },
  { id: "reels", icon: Film, label: "Reels" },
  { id: "saved", icon: Bookmark, label: "Saved" },
  { id: "tagged", icon: User, label: "Tagged" },
];

const HIGHLIGHTS = [
  "Wedding",
  "#MTMY",
  "❤️",
  "#राधा",
  "चाचा/मामा",
  "माँ",
  "Trips",
  "Friends",
  "Office",
  "Memories",
] as const;

const POSTS = Array.from({ length: 12 }, (_, id) => ({
  id,
  img: `https://picsum.photos/seed/profile_${id}/600/600`,
}));

const SETTINGS_ITEMS = [
  "Apps and websites",
  "QR code",
  "Notifications",
  "Settings and privacy",
  "Meta Verified",
  "Supervision",
  "Login activity",
  "Log Out",
] as const;

const Highlights = memo(() => (
  <div className="mt-10 overflow-x-auto">
    <div className="flex min-w-max gap-6">
      <button type="button" className="flex flex-col items-center text-xs">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-400">
          <PlusCircle size={26} />
        </span>
        <span className="mt-1">New</span>
      </button>

      {HIGHLIGHTS.map((title, index) => (
        <button
          key={title}
          type="button"
          className="flex flex-col items-center text-xs"
        >
          <span className="h-20 w-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
            <img
              src={`https://i.pravatar.cc/100?u=highlight_${index}`}
              alt={`${title} highlight`}
              loading="lazy"
              decoding="async"
              width={80}
              height={80}
              className="h-full w-full rounded-full border-2 border-white object-cover dark:border-black"
            />
          </span>
          <span className="mt-1 w-20 truncate text-center">{title}</span>
        </button>
      ))}
    </div>
  </div>
));

interface TabsProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

const Tabs = memo(({ activeTab, onChange }: TabsProps) => (
  <div className="mt-10 flex justify-center border-t border-gray-200 dark:border-gray-800">
    {TABS.map(({ id, icon: Icon, label }) => (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        className={`flex items-center gap-2 border-t-2 px-6 py-3 text-sm font-semibold ${
          activeTab === id
            ? "border-black dark:border-white"
            : "border-transparent text-gray-500"
        }`}
      >
        <Icon size={18} />
        {label}
      </button>
    ))}
  </div>
));

const PostGrid = memo(() => (
  <div className="mt-4 grid grid-cols-3 gap-1">
    {POSTS.map(({ id, img }) => (
      <img
        key={id}
        src={img}
        alt={`Post ${id + 1}`}
        loading="lazy"
        decoding="async"
        width={600}
        height={600}
        className="aspect-square w-full cursor-pointer object-cover hover:opacity-80"
      />
    ))}
  </div>
));

const SettingsModal = memo(({ onClose }: { onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    onClick={onClose}
    role="presentation"
  >
    <div
      className="w-[420px] overflow-hidden rounded-xl bg-gray-900 text-white"
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="Profile settings"
    >
      {SETTINGS_ITEMS.map((item) => (
        <button
          key={item}
          type="button"
          className="w-full border-b border-gray-700 py-4 transition hover:bg-gray-800"
        >
          {item}
        </button>
      ))}
      <button type="button" onClick={onClose} className="w-full py-4 hover:bg-gray-800">
        Cancel
      </button>
    </div>
  </div>
));

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("posts");
  const [openSettings, setOpenSettings] = useState(false);

  const showSettings = useCallback(() => setOpenSettings(true), []);
  const hideSettings = useCallback(() => setOpenSettings(false), []);
  const goToSettings = useCallback(() => navigate("/settings"), [navigate]);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-10 pt-6 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/200?u=amardeep"
            alt="Amardeep's profile"
            width={144}
            height={144}
            className="h-36 w-36 rounded-full border border-gray-300 object-cover dark:border-gray-700"
          />
          <span className="absolute -top-3 left-24 rounded-full bg-gray-800 px-3 py-1 text-xs text-white">
            Note...
          </span>
        </div>

        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-2xl font-semibold">10_amardeep_16</h2>
            <button type="button" onClick={showSettings} aria-label="Open settings">
              <Settings size={20} />
            </button>
            <button
              type="button"
              onClick={goToSettings}
              className="rounded-md bg-gray-100 px-4 py-1 text-sm font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Edit Profile
            </button>
            <button type="button" className="rounded-md bg-gray-100 px-4 py-1 text-sm font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
              View Archive
            </button>
          </div>

          <ul className="mb-3 flex gap-6 text-sm">
            <li><span className="font-semibold">265</span> posts</li>
            <li><span className="font-semibold">234</span> followers</li>
            <li><span className="font-semibold">180</span> following</li>
          </ul>

          <div className="text-sm">
            <p className="font-semibold">अमरदीप द्विवेदी</p>
            <p>@engineer 💡</p>
            <p>#16_june 🎂 · 🇮🇳 भारत · ❤️ healthHelpline</p>
          </div>
        </div>
      </div>

      <Highlights />
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      <PostGrid />
      {openSettings && <SettingsModal onClose={hideSettings} />}
    </section>
  );
};

export default Profile;
