import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreVertical,
  Volume2,
  VolumeX,
} from "lucide-react";

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
] as const;

const Reels: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  // Observe the panels, rather than every video. This keeps autoplay tied to the
  // scroll container and avoids playback churn when a video's bounds change.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveIndex(Number(mostVisible.target.getAttribute("data-reel-index")));
        }
      },
      { root: container, threshold: [0.5, 0.7] },
    );

    container
      .querySelectorAll<HTMLElement>("[data-reel-index]")
      .forEach((panel) => observer.observe(panel));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const videos = containerRef.current?.querySelectorAll<HTMLVideoElement>("video");
    videos?.forEach((video, index) => {
      if (index !== activeIndex || document.hidden) {
        video.pause();
        return;
      }

      // Autoplay can be rejected by a browser; it should not surface as an
      // unhandled promise rejection or prevent later reels from playing.
      void video.play().catch(() => undefined);
    });
  }, [activeIndex, muted]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) {
        containerRef.current?.querySelector<HTMLVideoElement>("video")?.pause();
      }
    };

    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, []);

  const toggleMuted = useCallback(() => setMuted((value) => !value), []);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white no-scrollbar"
    >
      {reelsData.map((reel, index) => {
        // Keep only the current and adjacent videos attached to a source. It
        // substantially reduces bandwidth and decode work for long reel lists.
        const isNearActiveReel = Math.abs(index - activeIndex) <= 1;

        return (
          <div
            key={reel.id}
            data-reel-index={index}
            className="relative flex h-screen w-full snap-start items-center justify-center"
          >
            <video
              src={isNearActiveReel ? reel.videoUrl : undefined}
              className="h-full w-full object-cover"
              loop
              muted={muted}
              playsInline
              preload={index === activeIndex ? "auto" : "metadata"}
            />

            <button
              type="button"
              onClick={toggleMuted}
              aria-label={muted ? "Unmute reel" : "Mute reel"}
              className="absolute right-6 top-6 rounded-full bg-black/50 p-2"
            >
              {muted ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            <div className="absolute bottom-24 right-6 flex flex-col items-center gap-6 text-gray-200">
              <button type="button" aria-label={`Like ${reel.username}`} className="transition hover:text-red-500">
                <Heart size={28} />
                <p className="mt-1 text-xs">{reel.likes}</p>
              </button>
              <button type="button" aria-label={`View comments for ${reel.username}`}>
                <MessageCircle size={28} />
                <p className="mt-1 text-xs">{reel.comments}</p>
              </button>
              <button type="button" aria-label="Save reel"><Bookmark size={26} /></button>
              <button type="button" aria-label="More reel options"><MoreVertical size={26} /></button>
            </div>

            <div className="absolute bottom-6 left-5 w-[85%] text-sm">
              <p className="font-semibold">
                @{reel.username} <span className="text-gray-400">· Follow</span>
              </p>
              <p className="mt-1">{reel.caption}</p>
              <p className="mt-1 text-xs text-gray-400">
                🎵 {reel.music}
                {reel.collaborators.length > 0 && <> · {reel.collaborators.join(", ")}</>}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Reels;
