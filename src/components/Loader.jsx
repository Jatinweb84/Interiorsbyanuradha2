/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";

/**
 * Full-screen intro loader for Interiors by Anuradha.
 * - Cream background (#F7F2EB), Cormorant Garamond wordmark & tabular counter (0 to 100)
 * - 1px warm grey progress bar with gold fill (#C7A05A)
 * - Wait for fonts & hero image or 3s max timeout before counting
 * - 2 to 2.5s ease-in-out counter
 * - Swipe-up cue with animated chevron
 * - 60px swipe threshold (touch, mouse drag, mouse wheel, key press)
 * - Plum cover (#4A294B) slide transition (700ms in -> 150ms pause -> 700ms out)
 * - Respects prefers-reduced-motion and locks body scroll while active
 *
 * @param {Object} props
 * @param {() => void} props.onComplete - Callback when loader and cover transition finish
 */
export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [ariaProgress, setAriaProgress] = useState("");
  const [isCountFinished, setIsCountFinished] = useState(false);
  const [cueVisible, setCueVisible] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [curtainStage, setCurtainStage] = useState("idle"); // 'idle' | 'plum-in' | 'plum-pause' | 'white-in' | 'white-pause' | 'white-fade-out' | 'done'

  const cueButtonRef = useRef(null);
  const touchStartYRef = useRef(null);
  const mouseStartYRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const hasTriggeredRef = useRef(false);
  const handleTriggerRevealRef = useRef(null);

  // Lock page scrolling and enforce top position while loader is active
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const finishLoader = () => {
    document.body.style.overflow = "";
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    window.__STUDIO_LOADER_DONE__ = true;
    window.dispatchEvent(new CustomEvent("studio-loader-complete"));

    if (onComplete) {
      onComplete();
    }
  };

  // Trigger luxury staged curtain transition: Plum wipe -> Slow White wipe -> Website opens with smooth fade
  const handleTriggerReveal = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsRevealing(true);
    setCurtainStage("plum-in");

    // Stage 1: Plum panel smoothly glides up covering viewport (1100ms)
    setTimeout(() => {
      // Stage 2: Brief elegant pause with plum full screen (250ms)
      setCurtainStage("plum-pause");

      setTimeout(() => {
        // Stage 3: White / Cream panel glides up covering plum screen smoothly and slowly (1500ms)
        setCurtainStage("white-in");

        setTimeout(() => {
          // Stage 4: Brief poise with cream full screen (250ms)
          setCurtainStage("white-pause");

          setTimeout(() => {
            // Stage 5: Website opens with a luxurious, smooth fade animation (1200ms)
            // Ensure topmost position so visitors see navbar and hero section
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }
            setCurtainStage("white-fade-out");

            // Signal website content (hero section fade-up, nav, etc.) to begin graceful reveal in tandem
            window.__STUDIO_LOADER_DONE__ = true;
            window.dispatchEvent(new CustomEvent("studio-loader-complete"));

            setTimeout(() => {
              setCurtainStage("done");
              finishLoader();
            }, 1200);
          }, 250);
        }, 1500);
      }, 250);
    }, 1100);
  };

  // Keep ref up to date for animation loop
  handleTriggerRevealRef.current = handleTriggerReveal;

  // Main loader initialization & counter
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      // Under prefers-reduced-motion, skip counter animation and swipe cover,
      // and remove loader as soon as page is ready.
      Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        new Promise((resolve) => {
          const img = new Image();
          img.src = "/images/hero.webp";
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        }),
      ]).then(() => {
        finishLoader();
      });
      return;
    }

    let isReady = false;
    let animationFrameId = null;

    const startCounter = () => {
      const duration = 3400; // 3.4 seconds for a calm, luxurious, and smooth pace
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);

        // Sinusoidal ease-in-out for buttery-smooth acceleration and gentle deceleration into 100
        const ease = 0.5 * (1 - Math.cos(Math.PI * rawProgress));

        const currentVal = Math.min(Math.round(ease * 100), 100);
        setProgress(currentVal);

        // Announce to screen reader only at 25, 50, 75, 100
        if (currentVal >= 100) {
          setAriaProgress("Loading 100%");
        } else if (currentVal >= 75 && currentVal < 78) {
          setAriaProgress("Loading 75%");
        } else if (currentVal >= 50 && currentVal < 53) {
          setAriaProgress("Loading 50%");
        } else if (currentVal >= 25 && currentVal < 28) {
          setAriaProgress("Loading 25%");
        }

        if (rawProgress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setProgress(100);
          setIsCountFinished(true);

          // On desktop, automatically glide upwards after a graceful brief pause (450ms) to appreciate 100%
          const isDesktop =
            window.innerWidth >= 768 &&
            !window.matchMedia("(hover: none) and (pointer: coarse)").matches;

          if (isDesktop) {
            setTimeout(() => {
              handleTriggerRevealRef.current?.();
            }, 450);
          } else {
            // On mobile / handheld touch devices: show the swipe button in the bottom of the screen where thumbs lie
            setTimeout(() => {
              setCueVisible(true);
            }, 350);
          }
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    // Wait for fonts & hero image or 3s max timeout
    const timeoutId = setTimeout(() => {
      if (!isReady) {
        isReady = true;
        startCounter();
      }
    }, 3000);

    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((resolve) => {
        const img = new Image();
        img.src = "/images/hero.webp";
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      }),
    ]).then(() => {
      if (!isReady) {
        isReady = true;
        clearTimeout(timeoutId);
        startCounter();
      }
    });

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Touch handlers (upward swipe >= 50px anywhere or on button)
  const handleTouchStart = (e) => {
    if (!isCountFinished || isRevealing) return;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!isCountFinished || isRevealing || touchStartYRef.current === null) return;
    const endY = e.changedTouches[0].clientY;
    const deltaY = touchStartYRef.current - endY; // Upward delta
    if (deltaY >= 50) {
      handleTriggerReveal();
    }
    touchStartYRef.current = null;
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!isCountFinished || isRevealing) return;
    mouseStartYRef.current = e.clientY;
    isMouseDownRef.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isCountFinished || isRevealing || !isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    if (mouseStartYRef.current !== null) {
      const deltaY = mouseStartYRef.current - e.clientY; // Upward delta
      if (deltaY >= 50) {
        handleTriggerReveal();
      }
    }
    mouseStartYRef.current = null;
  };

  // Mouse wheel handler (scroll down triggers reveal)
  const handleWheel = (e) => {
    if (!isCountFinished || isRevealing) return;
    if (e.deltaY > 20) {
      handleTriggerReveal();
    }
  };

  // Keyboard handler
  const handleKeyDown = (e) => {
    if (!isCountFinished || isRevealing) return;
    if (
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
      handleTriggerReveal();
    }
  };

  return (
    <>
      {/* 
        1. LOADER SCREEN OVERLAY (Cream #F7F2EB)
        Full viewport coverage, accessible dialog.
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Loading Interiors by Anuradha"
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        className={`fixed inset-0 z-[9999] bg-[#F7F2EB] flex flex-col items-center justify-center p-6 select-none cursor-default transition-opacity duration-300 ${
          curtainStage === "white-pause" || curtainStage === "white-fade-out" || curtainStage === "done"
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        {/* Polite Screen Reader Live Announcement */}
        <div className="sr-only" aria-live="polite">
          {ariaProgress}
        </div>

        {/* 
          Loader Content Container
          Fades out and drifts up slightly during plum slide
        */}
        <div
          className={`flex flex-col items-center justify-center text-center max-w-lg w-full transition-all duration-500 ease-out ${
            isRevealing ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          {/* Centred wordmark "Interiors by Anuradha" in Cormorant Garamond 600 in plum */}
          <h1
            className="font-serif text-[#4A294B] text-[40px] sm:text-[56px] font-semibold tracking-tight leading-tight mb-8"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          >
            Interiors by Anuradha
          </h1>

          {/* 
            Percentage counter in Cormorant Garamond, plum, tabular numbers.
            Fades out gracefully over 500ms when counting completes.
          */}
          <div
            className={`transition-opacity duration-500 ease-out flex flex-col items-center justify-center ${
              isCountFinished && cueVisible ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div
              className="font-serif text-[#4A294B] text-[72px] sm:text-[96px] font-semibold tabular-nums leading-none tracking-tight"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              {progress}
              <span className="text-[36px] sm:text-[48px] font-normal ml-1">%</span>
            </div>

            {/* Thin progress line: 1px high, warm grey #9D9792 with gold fill #C7A05A */}
            <div className="w-52 sm:w-72 h-[1px] bg-[#9D9792]/40 overflow-hidden relative mt-6">
              <div
                className="absolute top-0 bottom-0 left-0 bg-[#C7A05A] transition-[width] ease-out duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 
          SWIPE-UP CUE FOR MOBILE / TOUCH:
          Positioned in the bottom of the screen below the middle part where thumbs lie.
          Safe area inset handling for edge-to-edge iOS/Android screens.
        */}
        <div
          className={`fixed bottom-8 sm:bottom-12 left-0 right-0 flex flex-col items-center justify-center px-4 pointer-events-auto transition-all duration-500 ease-out z-10 ${
            cueVisible && !isRevealing
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          style={{
            paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))",
          }}
        >
          <button
            ref={cueButtonRef}
            type="button"
            onClick={handleTriggerReveal}
            aria-label="Swipe up to enter the website"
            className="cue-button flex flex-col items-center justify-center group cursor-pointer border-0 border-none outline-none bg-transparent px-6 py-2 select-none active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            style={{
              outline: "none",
              border: "none",
              boxShadow: "none",
            }}
          >
            {/* Small gold upward chevron moving gently up and down by 6px on loop (2.2s ease-in-out) */}
            <div className="animate-cue-bob mb-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C7A05A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>

            {/* Text beneath: plum, Manrope 500, 12px, uppercase, letter-spacing 0.2em */}
            <span className="font-sans text-[#4A294B] font-medium text-[12px] uppercase tracking-[0.2em]">
              Swipe up to enter
            </span>
          </button>
        </div>
      </div>

      {/* 
        STAGE 1: PLUM COVER TRANSITION PANEL (#4A294B)
        Slides up from bottom to top over 1100ms, pauses for 250ms.
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[10000] bg-[#4A294B] pointer-events-none will-change-transform"
        style={{
          transform:
            curtainStage === "idle"
              ? "translateY(100%)"
              : curtainStage === "plum-in" || curtainStage === "plum-pause"
                ? "translateY(0%)"
                : "translateY(-100%)",
          transition:
            curtainStage === "plum-in"
              ? "transform 1100ms cubic-bezier(0.76, 0, 0.24, 1)"
              : "none",
          display:
            curtainStage === "white-pause" ||
            curtainStage === "white-fade-out" ||
            curtainStage === "done"
              ? "none"
              : "block",
        }}
      />

      {/* 
        STAGE 2: WHITE / CREAM COVER PANEL (#F7F2EB)
        After plum colour, slides up smoothly and slowly (1500ms) covering the screen,
        pauses for 250ms, then fades out smoothly over 1200ms so the website opens with a fade animation.
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[10001] bg-[#F7F2EB] pointer-events-none will-change-transform will-change-opacity"
        style={{
          transform:
            curtainStage === "idle" ||
            curtainStage === "plum-in" ||
            curtainStage === "plum-pause"
              ? "translateY(100%)"
              : "translateY(0%)",
          opacity:
            curtainStage === "white-fade-out" || curtainStage === "done"
              ? 0
              : 1,
          transition:
            curtainStage === "white-in"
              ? "transform 1500ms cubic-bezier(0.76, 0, 0.24, 1)"
              : curtainStage === "white-fade-out"
                ? "opacity 1200ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
        }}
      />
    </>
  );
}
