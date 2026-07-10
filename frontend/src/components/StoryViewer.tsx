import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
} from "react";
import { X } from "lucide-react";

const IMAGE_DURATION = 5_000;

interface Story {
  id?: string | number;
  user: string;
  avatar: string;
  type: string;
  url: string;
  seenBy?: number;
}

interface Props {
  stories: Story[];
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
}

const StoryViewer = ({ stories, activeIndex, setActiveIndex }: Props) => {
  const [progress, setProgress] = useState(0);
  const story = activeIndex === null ? null : stories[activeIndex];

  const closeViewer = useCallback(() => setActiveIndex(null), [setActiveIndex]);

  const showNextStory = useCallback(() => {
    if (activeIndex === null || activeIndex >= stories.length - 1) {
      closeViewer();
      return;
    }

    setActiveIndex(activeIndex + 1);
  }, [activeIndex, closeViewer, setActiveIndex, stories.length]);

  const showPreviousStory = useCallback(() => {
    if (activeIndex === null) return;

    if (activeIndex === 0) {
      setProgress(0);
      requestAnimationFrame(() => setProgress(100));
      return;
    }

    setActiveIndex(activeIndex - 1);
  }, [activeIndex, setActiveIndex]);

  // Image progress is CSS-animated, so it does not trigger a React render every 100ms.
  useEffect(() => {
    if (!story || story.type === "video") return;

    setProgress(0);
    const animationFrame = requestAnimationFrame(() => setProgress(100));
    const timeout = window.setTimeout(showNextStory, IMAGE_DURATION);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeout);
    };
  }, [showNextStory, story?.id, story?.type]);

  useEffect(() => {
    if (!story) return;

    setProgress(0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowRight") showNextStory();
      if (event.key === "ArrowLeft") showPreviousStory();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeViewer, showNextStory, showPreviousStory, story?.id]);

  if (!story) return null;

  const currentIndex = activeIndex ?? -1;
  const isVideo = story.type === "video";
  const handleVideoProgress = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { currentTime, duration } = event.currentTarget;
    setProgress(Number.isFinite(duration) && duration > 0 ? (currentTime / duration) * 100 : 0);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${story.user}'s story`}
    >
      <button
        type="button"
        className="absolute right-5 top-5 z-20 text-white transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-white sm:right-8 sm:top-6"
        onClick={closeViewer}
        aria-label="Close story"
      >
        <X size={32} />
      </button>

      <div className="relative h-[min(680px,calc(100vh-2rem))] w-[min(380px,100%)] overflow-hidden rounded-xl bg-black">
        <div className="absolute left-3 right-3 top-3 z-10 flex gap-1" aria-hidden="true">
          {stories.map((item, index) => (
            <div key={item.id ?? index} className="h-[3px] flex-1 overflow-hidden bg-white/30">
              <div
                className="h-full bg-white transition-[width] ease-linear"
                style={{
                  width: index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%",
                  transitionDuration: !isVideo && index === currentIndex ? `${IMAGE_DURATION}ms` : "100ms",
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute left-4 top-6 z-10 flex items-center gap-3 text-white">
          <img src={story.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
          <p className="text-sm font-semibold">{story.user}</p>
        </div>

        {isVideo ? (
          <video
            key={story.id ?? activeIndex}
            src={story.url}
            autoPlay
            muted
            playsInline
            className="h-full w-full object-cover"
            onTimeUpdate={handleVideoProgress}
            onEnded={showNextStory}
            onError={showNextStory}
          />
        ) : (
          <img src={story.url} alt={`${story.user}'s story`} className="h-full w-full object-cover" />
        )}

        <button
          type="button"
          className="absolute left-0 top-0 h-full w-1/2 cursor-pointer focus:outline-none"
          onClick={showPreviousStory}
          aria-label="Previous story"
        />
        <button
          type="button"
          className="absolute right-0 top-0 h-full w-1/2 cursor-pointer focus:outline-none"
          onClick={showNextStory}
          aria-label="Next story"
        />

        <div className="absolute bottom-4 left-4 text-sm text-white">👀 Seen by {story.seenBy ?? 0}</div>
      </div>
    </div>
  );
};

export default StoryViewer;
