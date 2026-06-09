import { useRef, useState } from "react";
import { resolveAudio } from "@/lib/audio";

interface AudioDocProps {
  name: string;
  className?: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// A custom, on-brand audio player built on a native <audio> element (no library):
// a bordered play/pause button, a hot-pink scrubber, a mono time readout, and a
// link to the original file. Styled to match the PDF embed (PdfDoc.tsx).
export default function AudioDoc({ name, className }: AudioDocProps) {
  const url = resolveAudio(name);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!url) {
    return (
      <Notice className={className}>
        Audio not found: <code>{name}</code>. Drop{" "}
        <code>{/\.[^.]+$/.test(name) ? name : `${name}.mp3`}</code> into{" "}
        <code>content/audio/</code>.
      </Notice>
    );
  }

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play();
    else a.pause();
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a) return;
    const t = Number(e.target.value);
    a.currentTime = t;
    setCurrentTime(t);
  };

  const max = duration || 0;
  const value = Math.min(currentTime, max);
  const progress = max > 0 ? (value / max) * 100 : 0;

  return (
    <figure className={className} data-testid="audio-doc">
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div
        className="flex items-center gap-[16px] border-[3px] border-[var(--ink)] bg-[var(--paper-2)] px-[16px] py-[14px] shadow-[5px_5px_0_var(--ink)]"
        data-testid="audio-controls"
      >
        {/* Play / pause */}
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          aria-pressed={isPlaying}
          className="shrink-0 min-w-[46px] border-[3px] border-[var(--ink)] bg-[var(--paper)] px-[14px] py-[8px] shadow-[3px_3px_0_var(--ink)] text-center font-mono text-[13px] font-bold leading-none text-[var(--ink)] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[5px_5px_0_var(--ink)] transition-all duration-150 focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
          data-testid="audio-toggle"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        {/* Scrubber — native range styled to the zine look (ink square thumb,
            hot-pink elapsed fill via the inline gradient background). */}
        <input
          type="range"
          min={0}
          max={max}
          step="any"
          value={value}
          onChange={onSeek}
          aria-label="Seek"
          className="audio-scrubber h-[10px] flex-1 cursor-pointer appearance-none rounded-none border-[2px] border-[var(--ink)] bg-[var(--rule-soft)] focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2 [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[12px] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:border-[2px] [&::-webkit-slider-thumb]:border-[var(--ink)] [&::-webkit-slider-thumb]:bg-[var(--paper)] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[12px] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-[2px] [&::-moz-range-thumb]:border-[var(--ink)] [&::-moz-range-thumb]:bg-[var(--paper)]"
          style={{
            background: `linear-gradient(to right, var(--hot-pink) ${progress}%, var(--rule-soft) ${progress}%)`,
          }}
          data-testid="audio-scrubber"
        />

        {/* Time */}
        <span
          className="shrink-0 font-mono text-[11px] font-bold tracking-[0.08em] tabular-nums uppercase text-[var(--ink-mute)]"
          data-testid="audio-time"
        >
          {formatTime(value)} / {formatTime(duration)}
        </span>
      </div>

      <figcaption className="mt-[12px] text-center font-mono text-[11px] tracking-[0.06em] text-[var(--ink-mute)] uppercase">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--hot-pink)] underline-offset-[3px] hover:underline"
        >
          Open original audio ↗
        </a>
      </figcaption>
    </figure>
  );
}

function Notice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center border-[3px] border-dashed border-[var(--rule-soft)] bg-[var(--paper-2)] px-[20px] py-[40px] text-center font-mono text-[12px] tracking-[0.04em] text-[var(--ink-mute)] ${className ?? ""}`}
    >
      <p>{children}</p>
    </div>
  );
}
