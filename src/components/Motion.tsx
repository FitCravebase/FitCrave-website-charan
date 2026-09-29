"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const EASE = {
  settle: "expo.out",
  wipe: "power4.inOut",
  crave: "back.out(1.7)",
};

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function formatCount(value: number, decimals: number) {
  return value.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Site-wide motion: smooth scroll plus the three declarative moves any section can opt into
// with data attributes: data-reveal (stagger rise), data-count (counter), data-ring (ring close).
export default function Motion() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
      const rings = gsap.utils.toArray<SVGCircleElement>("[data-ring]");

      if (reduce) {
        counters.forEach((el) => {
          el.textContent = formatCount(Number(el.dataset.count), Number(el.dataset.decimals || 0));
        });
        rings.forEach((el) => {
          const len = Number(el.dataset.len);
          el.style.strokeDashoffset = String(len * (1 - Number(el.dataset.ring)));
        });
        return;
      }

      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.42, ease: EASE.settle, stagger: 0.06, overwrite: true }),
      });

      counters.forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals || 0);
        const obj = { v: 0 };
        el.textContent = formatCount(0, decimals);
        gsap.to(obj, {
          v: target,
          duration: 0.9,
          ease: EASE.settle,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = formatCount(obj.v, decimals);
          },
        });
      });

      rings.forEach((el) => {
        const len = Number(el.dataset.len);
        gsap.fromTo(
          el,
          { strokeDashoffset: len },
          {
            strokeDashoffset: len * (1 - Number(el.dataset.ring)),
            duration: 0.9,
            ease: EASE.settle,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.2 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
