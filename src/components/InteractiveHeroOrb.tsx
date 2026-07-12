import { useEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function InteractiveHeroOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    const hero = orb?.closest<HTMLElement>(".hero");
    if (!orb || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pulseTimer: number | undefined;

    const updateFromPointer = (event: PointerEvent) => {
      if (reducedMotion.matches) return;

      const rect = hero.getBoundingClientRect();
      const normalizedX = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
      const normalizedY = clamp((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1);

      orb.style.setProperty("--orb-shift-x", `${(normalizedX - 0.5) * 42}px`);
      orb.style.setProperty("--orb-shift-y", `${(normalizedY - 0.5) * 28}px`);
      orb.style.setProperty("--orb-light-x", `${normalizedX * 100}%`);
      orb.style.setProperty("--orb-light-y", `${normalizedY * 100}%`);
    };

    const resetPosition = () => {
      orb.style.setProperty("--orb-shift-x", "0px");
      orb.style.setProperty("--orb-shift-y", "0px");
      orb.style.setProperty("--orb-light-x", "62%");
      orb.style.setProperty("--orb-light-y", "32%");
    };

    const pulse = (event: PointerEvent) => {
      updateFromPointer(event);
      orb.classList.remove("is-reacting");
      void orb.offsetWidth;
      orb.classList.add("is-reacting");

      if (pulseTimer) window.clearTimeout(pulseTimer);
      pulseTimer = window.setTimeout(() => orb.classList.remove("is-reacting"), 760);
    };

    hero.addEventListener("pointermove", updateFromPointer, { passive: true });
    hero.addEventListener("pointerleave", resetPosition);
    hero.addEventListener("pointerdown", pulse, { passive: true });

    return () => {
      hero.removeEventListener("pointermove", updateFromPointer);
      hero.removeEventListener("pointerleave", resetPosition);
      hero.removeEventListener("pointerdown", pulse);
      if (pulseTimer) window.clearTimeout(pulseTimer);
    };
  }, []);

  return (
    <div className="interactive-hero-orb" ref={orbRef} aria-hidden="true">
      <span className="interactive-hero-orb__halo" />
      <span className="interactive-hero-orb__core" />
      <span className="interactive-hero-orb__ring interactive-hero-orb__ring--one" />
      <span className="interactive-hero-orb__ring interactive-hero-orb__ring--two" />
      <span className="interactive-hero-orb__ripple" />
      <span className="interactive-hero-orb__spark interactive-hero-orb__spark--one" />
      <span className="interactive-hero-orb__spark interactive-hero-orb__spark--two" />
      <span className="interactive-hero-orb__spark interactive-hero-orb__spark--three" />
    </div>
  );
}
