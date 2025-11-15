import React, { useEffect, useRef } from "react";
import { Heart, MessageCircle, Bookmark, MoreVertical, Volume2 } from "lucide-react";

const reelsData = [
  {
    id: 1,
    username: "travel_with_me",
    caption: "Golden sunset vibes 🌅✨",
    music: "Kygo – Firestone",
    collaborators: ["wander_lover"],
    videoUrl:
      "https://videos.pexels.com/video-files/856574/856574-hd_1920_1080_30fps.mp4",
    likes: 2031,
    comments: 32,
  },
  {
    id: 2,
    username: "nature_snap",
    caption: "Lost in the forest 🌲💚",
    music: "Chill Beats – Relaxing Nature",
    collaborators: [],
    videoUrl:
      "https://videos.pexels.com/video-files/855537/855537-hd_1920_1080_30fps.mp4",
    likes: 1254,
    comments: 12,
  },
  {
    id: 3,
    username: "beachvibes",
    caption: "Waves + peace = therapy 🌊💙",
    music: "Ocean Eyes – Billie Eilish",
    collaborators: [],
    videoUrl:
      "https://videos.pexels.com/video-files/3015494/3015494-hd_1920_1080_30fps.mp4",
    likes: 3420,
    comments: 80,
  },
  {
    id: 4,
    username: "urbanlens",
    caption: "City lights never sleep 🌃",
    music: "Alan Walker – Faded (Instrumental)",
    collaborators: ["night_snapper"],
    videoUrl:
      "https://videos.pexels.com/video-files/854425/854425-hd_1920_1080_30fps.mp4",
    likes: 2789,
    comments: 56,
  },
];

const Reels: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videos = containerRef.current?.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 } // play only when 70% visible
    );

    videos?.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar text-white"
    >
      {reelsData.map((reel) => (
        <div
          key={reel.id}
          className="relative h-screen w-full flex justify-center items-center snap-start"
        >
          {/* Video */}
          <video
            src={reel.videoUrl}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
          />

          {/* Mute Icon */}
          <button className="absolute top-6 right-6 bg-black/50 p-2 rounded-full">
            <Volume2 size={18} />
          </button>

          {/* Right Icons */}
          <div className="absolute right-6 bottom-24 flex flex-col items-center gap-6 text-gray-200">
            <button className="hover:text-red-500 transition">
              <Heart size={28} />
              <p className="text-xs mt-1">{reel.likes}</p>
            </button>
            <button>
              <MessageCircle size={28} />
              <p className="text-xs mt-1">{reel.comments}</p>
            </button>
            <button>
              <Bookmark size={26} />
            </button>
            <button>
              <MoreVertical size={26} />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="absolute bottom-6 left-5 w-[85%] text-sm">
            <p className="font-semibold">
              @{reel.username} <span className="text-gray-400">· Follow</span>
            </p>
            <p className="mt-1">{reel.caption}</p>
            <p className="text-gray-400 text-xs mt-1">
              🎵 {reel.music}
              {reel.collaborators.length > 0 && (
                <> · {reel.collaborators.join(", ")}</>
              )}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Reels;
