import React from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  sidebarWidth: number;
}

const NotificationsPanel: React.FC<Props> = ({ open, onClose, sidebarWidth }) => {
  if (!open) return null;

  const notifications = {
    requests: [
      {
        id: 1,
        name: "just_feelinn__00",
        others: 4,
        img: "https://i.pravatar.cc/100?u=req",
      },
    ],
    yesterday: [
      {
        id: 1,
        users: ["rajukashyap55222", "karanthakurvlogs148"],
        message:
          "liked your comment: Aise hawan har ghar mein hone chahiye , 😆😅😂 magar pyar se 😅😂",
        time: "1d",
        postThumb:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=80&h=80&fit=crop",
        userImg: "https://i.pravatar.cc/100?u=raju",
      },
    ],
    thisWeek: [
      {
        id: 2,
        name: "karanthakurvlogs148",
        message:
          "mentioned you in a comment: @10_amardeep_16 tujhe bhi koi nhi mil rhi h na 😂",
        time: "6d",
        postThumb:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=80&fit=crop",
        userImg: "https://i.pravatar.cc/100?u=karan",
      },
      {
        id: 3,
        name: "karanthakurvlogs148",
        message:
          "liked your comment: Are ni sir ..wo sharmayi hi thi..🤣🤣 main samjh sakta hu sir 😂😅",
        time: "6d",
        postThumb:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&h=80&fit=crop",
        userImg: "https://i.pravatar.cc/100?u=karan2",
      },
    ],
    thisMonth: [
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
  };

  return (
    <>
      {/* Main Panel */}
      <div
        className="
          fixed top-0 h-full shadow-lg animate-slideIn z-40 overflow-y-auto
          bg-white dark:bg-[#121212]
          text-gray-800 dark:text-gray-200
          border-l border-gray-200 dark:border-gray-800
          transition-colors duration-300
        "
        style={{ left: sidebarWidth, width: 400 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex justify-between items-center p-4 border-b
            border-gray-200 dark:border-gray-800
            sticky top-0 bg-white dark:bg-[#121212] z-10
            transition-colors
          "
        >
          <h2 className="text-2xl font-bold">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Follow Requests */}
        <div
          className="
            p-4 border-b border-gray-200 dark:border-gray-800
            hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors
          "
        >
          <div className="flex items-center gap-3">
            <img
              src={notifications.requests[0].img}
              alt="req"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">Follow requests</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {notifications.requests[0].name} + {notifications.requests[0].others} others
              </p>
            </div>
            <span className="text-blue-500">›</span>
          </div>
        </div>

        {/* Yesterday */}
        <div
          className="
            p-4 border-b border-gray-200 dark:border-gray-800
            transition-colors
          "
        >
          <h3 className="text-md font-semibold mb-3">Yesterday</h3>
          {notifications.yesterday.map((n) => (
            <div
              key={n.id}
              className="
                flex justify-between items-center mb-3
                hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md p-2
                transition-colors
              "
            >
              <div className="flex items-center gap-3">
                <img
                  src={n.userImg}
                  alt={n.users[0]}
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-sm">
                  <p>
                    <strong>{n.users.join(" and ")}</strong> {n.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {n.time}
                  </p>
                </div>
              </div>
              <img
                src={n.postThumb}
                alt="post"
                className="w-12 h-12 rounded-md object-cover"
              />
            </div>
          ))}
        </div>

        {/* This Week */}
        <div
          className="
            p-4 border-b border-gray-200 dark:border-gray-800
            transition-colors
          "
        >
          <h3 className="text-md font-semibold mb-3">This week</h3>
          {notifications.thisWeek.map((n) => (
            <div
              key={n.id}
              className="
                flex justify-between items-center mb-3
                hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md p-2
                transition-colors
              "
            >
              <div className="flex items-center gap-3">
                <img
                  src={n.userImg}
                  alt={n.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-sm">
                  <p>
                    <strong>{n.name}</strong> {n.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {n.time}
                  </p>
                </div>
              </div>
              <img
                src={n.postThumb}
                alt="post"
                className="w-12 h-12 rounded-md object-cover"
              />
            </div>
          ))}
        </div>

        {/* This Month */}
        <div className="p-4 transition-colors">
          <h3 className="text-md font-semibold mb-3">This month</h3>
          {notifications.thisMonth.map((n) => (
            <div
              key={n.id}
              className="
                flex justify-between items-center mb-3
                hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md p-2
                transition-colors
              "
            >
              <div className="flex items-center gap-3">
                <img
                  src={n.userImg}
                  alt={n.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-sm">
                  <p>
                    <strong>{n.name}</strong> {n.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {n.time}
                  </p>
                </div>
              </div>
              <img
                src={n.postThumb}
                alt="post"
                className="w-12 h-12 rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Click outside to close */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30"
        onClick={onClose}
      ></div>
    </>
  );
};

export default NotificationsPanel;
