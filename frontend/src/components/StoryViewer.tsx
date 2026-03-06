import React from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  story: any;
}

const StoryViewer: React.FC<Props> = ({ open, onClose, story }) => {
  if (!open || !story) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white"
      >
        <X size={30} />
      </button>

      {/* Story container */}
      <div className="relative w-[380px] h-[680px] rounded-xl overflow-hidden bg-black">

        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-1 h-[3px] bg-white/40 rounded" />
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 left-4 flex items-center gap-3 text-white z-10">
          <img
            src={story.avatar}
            className="w-9 h-9 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{story.user}</p>
            <p className="text-xs opacity-70">7h</p>
          </div>
        </div>

        {/* Story image */}
        <img
          src={story.image}
          className="w-full h-full object-cover"
        />

      </div>
    </div>
  );
};

export default StoryViewer;