import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface Props {
  stories: any[];
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
}

const StoryViewer: React.FC<Props> = ({
  stories,
  activeIndex,
  setActiveIndex,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  // ❗ safety check
  if (
    activeIndex === null ||
    activeIndex === undefined ||
    !stories ||
    !stories[activeIndex]
  ) {
    return null;
  }

  const story = stories[activeIndex];

  // AUTO PROGRESS
  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => prev + 2);
    }, 100);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // NEXT STORY
  useEffect(() => {
    if (progress >= 100) {
      if (activeIndex < stories.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(null);
      }
    }
  }, [progress]);

  const nextStory = () => {
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevStory = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center">
      {/* CLOSE */}
      <button
        className="absolute top-6 right-8 text-white"
        onClick={() => setActiveIndex(null)}
      >
        <X size={32} />
      </button>

      {/* STORY CARD */}
      <div className="relative w-[380px] h-[680px] rounded-xl overflow-hidden bg-black">

        {/* PROGRESS BARS */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-[3px] bg-white/30">
              <div
                className="h-full bg-white transition-all"
                style={{
                  width:
                    i < activeIndex
                      ? "100%"
                      : i === activeIndex
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* USER INFO */}
        <div className="absolute top-6 left-4 flex items-center gap-3 text-white z-10">
          <img src={story.avatar} className="w-9 h-9 rounded-full" />
          <p className="text-sm font-semibold">{story.user}</p>
        </div>

        {/* MEDIA */}
        {story.type === "video" ? (
          <video
            ref={videoRef}
            src={story.url}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={story.url}
            className="w-full h-full object-cover"
          />
        )}

        {/* TAP AREAS */}
        <div
          onClick={prevStory}
          className="absolute left-0 top-0 w-1/2 h-full"
        />

        <div
          onClick={nextStory}
          className="absolute right-0 top-0 w-1/2 h-full"
        />

        {/* SEEN */}
        <div className="absolute bottom-4 left-4 text-white text-sm">
          👀 Seen by {story.seenBy}
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;