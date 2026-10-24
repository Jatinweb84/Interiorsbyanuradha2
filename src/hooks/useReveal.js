/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";

/**
 * Reusable scroll-reveal hook using IntersectionObserver.
 * Adds 'is-visible' class when elements enter the viewport, then unobserves them.
 * Cleans up will-change on transitionend to ensure optimal performance.
 *
 * @param {Object} [options]
 * @param {string} [options.selector] - Optional child selector if observing multiple elements in a container
 * @param {number} [options.threshold=0.1] - Intersection threshold
 * @param {string} [options.rootMargin="0px 0px -30px 0px"] - Intersection rootMargin
 * @returns {React.RefObject}
 */
export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    // If SSR or IntersectionObserver is not supported, reveal immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      if (ref.current) {
        if (options.selector) {
          ref.current.querySelectorAll(options.selector).forEach((el) => {
            el.classList.add("is-visible");
          });
        } else {
          ref.current.classList.add("is-visible");
        }
      }
      return;
    }

    // If user prefers reduced motion, reveal immediately without animation
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      if (ref.current) {
        if (options.selector) {
          ref.current.querySelectorAll(options.selector).forEach((el) => {
            el.classList.add("is-visible");
          });
        } else {
          ref.current.classList.add("is-visible");
        }
      }
      return;
    }

    let observer = null;

    const startObserving = () => {
      const container = ref.current;
      if (!container) return;

      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target;
              target.classList.add("is-visible");

              // Clean up will-change after transition finishes
              const handleTransitionEnd = (e) => {
                if (e.target === target) {
                  target.style.willChange = "auto";
                  target.removeEventListener("transitionend", handleTransitionEnd);
                }
              };
              target.addEventListener("transitionend", handleTransitionEnd);

              // Safety fallback to reset will-change
              setTimeout(() => {
                target.style.willChange = "auto";
                target.removeEventListener("transitionend", handleTransitionEnd);
              }, 750);

              // Stop observing this element once visible
              obs.unobserve(target);
            }
          });
        },
        {
          threshold: options.threshold !== undefined ? options.threshold : 0.1,
          rootMargin: options.rootMargin || "0px 0px -30px 0px",
        }
      );

      if (options.selector) {
        const elements = container.querySelectorAll(options.selector);
        elements.forEach((el) => observer.observe(el));
      } else {
        observer.observe(container);
      }
    };

    // Do not play scroll-reveal animations until the loader has finished
    if (window.__STUDIO_LOADER_DONE__) {
      startObserving();
    } else {
      const onLoaderDone = () => {
        startObserving();
        window.removeEventListener("studio-loader-complete", onLoaderDone);
      };
      window.addEventListener("studio-loader-complete", onLoaderDone);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [options.selector, options.threshold, options.rootMargin]);

  return ref;
}

export default useReveal;
