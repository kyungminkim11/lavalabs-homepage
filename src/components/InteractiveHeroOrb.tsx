import { useEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function InteractiveHeroOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    const hero = orb?.closest<HTMLElement>(".hero");
    if (!orb || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let pulseTimer: number | undefined;
    let pointerX = 0;
    let pointerY = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerActive = false;
    const startedAt = performance.now();

    const setPointerTarget = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const normalizedX = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
      const normalizedY = clamp((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1);

      pointerTargetX = (normalizedX - 0.5) * 52;
      pointerTargetY = (normalizedY - 0.5) * 38;
      orb.style.setProperty("--orb-light-x", `${normalizedX * 100}%`);
      orb.style.setProperty("--orb-light-y", `${normalizedY * 100}%`);
    };

    const animate = (time: number) => {
      if (!reducedMotion.matches) {
        const seconds = (time - startedAt) / 1000;
        const driftX = Math.sin(seconds * 0.72) * 22 + Math.sin(seconds * 0.29) * 7;
        const driftY = Math.cos(seconds * 0.58) * 15 + Math.sin(seconds * 0.41) * 5;
        const driftRotate = Math.sin(seconds * 0.33) * 2.4;

        const easing = pointerActive ? 0.13 : 0.075;
        pointerX += (pointerTargetX - pointerX) * easing;
        pointerY += (pointerTargetY - pointerY) * easing;

        const finalX = driftX + pointerX;
        const finalY = driftY + pointerY;
        orb.style.setProperty("--orb-x", `${finalX.toFixed(2)}px`);
        orb.style.setProperty("--orb-y", `${finalY.toFixed(2)}px`);
        orb.style.setProperty("--orb-rotate", `${driftRotate.toFixed(2)}deg`);
        orb.dataset.motion = "active";
      } else {
        orb.style.setProperty("--orb-x", "0px");
        orb.style.setProperty("--orb-y", "0px");
        orb.style.setProperty("--orb-rotate", "0deg");
        orb.dataset.motion = "reduced";
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      if (event.pointerType === "touch" && !pointerActive) return;
      setPointerTarget(event);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      pointerActive = true;
      setPointerTarget(event);
      orb.classList.remove("is-reacting");
      void orb.offsetWidth;
      orb.classList.add("is-reacting");

      if (pulseTimer) window.clearTimeout(pulseTimer);
      pulseTimer = window.setTimeout(() => orb.classList.remove("is-reacting"), 900);
    };

    const releasePointer = () => {
      pointerActive = false;
      pointerTargetX = 0;
      pointerTargetY = 0;
      orb.style.setProperty("--orb-light-x", "62%");
      orb.style.setProperty("--orb-light-y", "32%");
    };

    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerdown", handlePointerDown, { passive: true });
    hero.addEventListener("pointerup", releasePointer, { passive: true });
    hero.addEventListener("pointercancel", releasePointer, { passive: true });
    hero.addEventListener("pointerleave", releasePointer);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerdown", handlePointerDown);
      hero.removeEventListener("pointerup", releasePointer);
      hero.removeEventListener("pointercancel", releasePointer);
      hero.removeEventListener("pointerleave", releasePointer);
      if (pulseTimer) window.clearTimeout(pulseTimer);
    };
  }, []);

  return (
    <div className="interactive-hero-orb" ref={orbRef} aria-hidden="true">
      <span className="interactive-hero-orb__halo" />
      <span className="interactive-hero-orb__core" />
      <span className="interactive-hero-orb__shine" />
      <span className="interactive-hero-orb__ring interactive-hero-orb__ring--one" />
      <span className="interactive-hero-orb__ring interactive-hero-orb__ring--two" />
      <span className="interactive-hero-orb__ripple" />
      <span className="interactive-hero-orb__spark interactive-hero-orb__spark--one" />
      <span className="interactive-hero-orb__spark interactive-hero-orb__spark--two" />
      <span className="interactive-hero-orb__spark interactive-hero-orb__spark--three" />
    </div>
  );
}
