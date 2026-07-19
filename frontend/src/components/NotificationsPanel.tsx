import { memo, useEffect } from "react";
import { ChevronRight, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  sidebarWidth: number;
}

interface Notification {
  id: number;
  name: string;
  message: string;
  postThumb: string;
  time: string;
  userImg: string;
}

const followRequest = {
  name: "just_feelinn__00",
  others: 4,
  img: "https://i.pravatar.cc/100?u=req",
};

const notificationGroups: Array<{ title: string; notifications: Notification[] }> = [
  {
    title: "Yesterday",
    notifications: [
      {
        id: 1,
        name: "rajukashyap55222 and karanthakurvlogs148",
        message:
          "liked your comment: Aise hawan har ghar mein hone chahiye, 😆😅😂 magar pyar se 😅😂",
        time: "1d",
        postThumb:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=80&h=80&fit=crop",
        userImg: "https://i.pravatar.cc/100?u=raju",
      },
    ],
  },
  {
    title: "This week",
    notifications: [
      {
        id: 2,
        name: "karanthakurvlogs148",
        message: "mentioned you in a comment: @10_amardeep_16 tujhe bhi koi nhi mil rhi h na 😂",
        time: "6d",
        postThumb:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=80&fit=crop",
        userImg: "https://i.pravatar.cc/100?u=karan",
      },
      {
        id: 3,
        name: "karanthakurvlogs148",
        message: "liked your comment: Are ni sir ..wo sharmayi hi thi..🤣🤣 main samjh sakta hu sir 😅",
        time: "6d",
        postThumb:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&h=80&fit=crop",
        userImg: "https://i.pravatar.cc/100?u=karan2",
      },
    ],
  },
  {
    title: "This month",
    notifications: [
      {
        id: 4,
        name: "__mahimagarg",
        message: "liked your story.",
        time: "6d",
        postThumb:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=80&h=80&fit=crop",
        userImg: "https://i.pravatar.cc/100?u=mahi",
      },
    ],
  },
];

const NotificationRow = memo(function NotificationRow({ notification }: { notification: Notification }) {
  const { name, message, postThumb, time, userImg } = notification;

  return (
    <article className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
      <img
        src={userImg}
        alt={`${name}'s profile`}
        loading="lazy"
        decoding="async"
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1 text-sm">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          <strong className="font-semibold text-gray-900 dark:text-white">{name}</strong>{" "}
          {message}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{time}</p>
      </div>
      <img
        src={postThumb}
        alt="Related post"
        loading="lazy"
        decoding="async"
        className="h-12 w-12 shrink-0 rounded-lg object-cover"
      />
    </article>
  );
});

const NotificationsPanel = memo(function NotificationsPanel({ open, onClose, sidebarWidth }: Props) {
  useEffect(() => {
    if (!open) return undefined;

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
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-title"
        className="fixed top-0 z-40 h-dvh w-[min(400px,calc(100vw-1rem))] overflow-y-auto border-l border-gray-200 bg-white shadow-lg animate-slideIn transition-colors duration-300 dark:border-gray-800 dark:bg-[#121212]"
        style={{ left: sidebarWidth }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4 transition-colors dark:border-gray-800 dark:bg-[#121212]">
          <h2 id="notifications-title" className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h2>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={onClose}
            className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-red-500 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <X size={22} />
          </button>
        </header>

        <button
          type="button"
          className="flex w-full items-center gap-3 border-b border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
        >
          <img src={followRequest.img} alt="Follow request avatars" loading="lazy" decoding="async" className="h-10 w-10 rounded-full object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-gray-900 dark:text-white">Follow requests</span>
            <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
              {followRequest.name} + {followRequest.others} others
            </span>
          </span>
          <ChevronRight aria-hidden="true" size={20} className="shrink-0 text-blue-500" />
        </button>

        {notificationGroups.map(({ title, notifications }, index) => (
          <section
            key={title}
            className={`p-4 ${index < notificationGroups.length - 1 ? "border-b border-gray-200 dark:border-gray-800" : ""}`}
          >
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">{title}</h3>
            <div className="space-y-1">
              {notifications.map((notification) => (
                <NotificationRow key={notification.id} notification={notification} />
              ))}
            </div>
          </section>
        ))}
      </aside>

      <button
        type="button"
        aria-label="Close notifications"
        className="fixed inset-0 z-30 cursor-default bg-black/20 dark:bg-black/40"
        onClick={onClose}
      />
    </>
  );
});

export default NotificationsPanel;
