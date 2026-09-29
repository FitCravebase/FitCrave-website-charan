"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./Clip.module.css";

type ClipProps = {
  name: string; // file stem in /public/media: <name>.mp4 and <name>.jpg
  className?: string;
  // Scrub clips never autoplay; the parent drives currentTime from scroll.
  scrub?: boolean;
  // Load immediately instead of waiting for the clip to near the viewport (hero).
  eager?: boolean;
  fit?: "cover" | "contain";
  position?: string;
};

export type ClipHandle = { video: HTMLVideoElement | null };

// Decorative video with a poster fallback. Loads when near the viewport, plays only while
// visible, and stays a still image for visitors who prefer reduced motion.
const Clip = forwardRef<ClipHandle, ClipProps>(function Clip(
  { name, className, scrub = false, eager = false, fit = "cover", position = "50% 50%" },
  ref,
) {
  const video = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [still, setStill] = useState(false);

  useImperativeHandle(ref, () => ({
    get video() {
      return video.current;
    },
  }));

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setStill(true));
      return () => cancelAnimationFrame(id);
    }

    const load = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSrc(`/media/${name}.mp4`);
          load.disconnect();
        }
      },
      { rootMargin: eager ? "100% 0px" : "60% 0px" },
    );
    load.observe(v);

    const play = new IntersectionObserver(
      (entries) => {
        if (scrub) return;
        for (const e of entries) {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.05 },
    );
    play.observe(v);

    return () => {
      load.disconnect();
      play.disconnect();
    };
  }, [name, scrub, eager]);

  return (
    <div className={`${styles.clip} ${className ?? ""}`} aria-hidden="true">
      {still ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/media/${name}.jpg`} alt="" className={styles.media} style={{ objectFit: fit, objectPosition: position }} />
      ) : (
        <video
          ref={video}
          className={styles.media}
          style={{ objectFit: fit, objectPosition: position }}
          poster={`/media/${name}.jpg`}
          src={src}
          muted
          playsInline
          loop={!scrub}
          // Starts as soon as the lazily-set src arrives; the observer pauses it off-screen.
          autoPlay={!scrub}
          preload={scrub ? "auto" : "metadata"}
          disablePictureInPicture
          tabIndex={-1}
        />
      )}
    </div>
  );
});

export default Clip;
