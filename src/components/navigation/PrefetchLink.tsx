// src/components/navigation/PrefetchLink.tsx
import { Link, LinkProps } from "react-router-dom";
import React, { useCallback, useEffect, useRef } from "react";
import { routePrefetchers } from "../../routes/prefetch";

type PrefetchMode = "hover" | "visible" | "idle";

type Props = Omit<LinkProps, "to"> & {
  to: LinkProps["to"];
  /** When to start prefetching the route chunk */
  prefetch?: PrefetchMode;
};

/* ---- Idle callback types (keeps TS happy without any) ---- */
interface IdleDeadline {
  readonly didTimeout: boolean;
  timeRemaining(): number;
}

declare global {
  interface Window {
    requestIdleCallback?(
      callback: (deadline: IdleDeadline) => void,
      options?: { timeout: number }
    ): number;
    cancelIdleCallback?(handle: number): void;
  }
}

export default function PrefetchLink({
  to,
  prefetch = "hover",
  onMouseEnter,
  onFocus,
  ...rest
}: Props) {
  const armed = useRef(false);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const path =
    typeof to === "string"
      ? to
      : (to as { pathname?: string }).pathname ?? "/";

  const doPrefetch = useCallback(() => {
    if (armed.current) return;
    armed.current = true;
    const fn = routePrefetchers[path];
    if (fn) {
      // Ignore network errors; this is a speculative fetch
      void fn().catch(() => {});
    }
  }, [path]);

  /* --- hover/focus prefetch --- */
  const handleMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    onMouseEnter?.(e);
    if (prefetch === "hover") doPrefetch();
  };

  const handleFocus: React.FocusEventHandler<HTMLAnchorElement> = (e) => {
    onFocus?.(e);
    if (prefetch === "hover") doPrefetch();
  };

  /* --- visible-in-viewport prefetch --- */
  useIntersectionPrefetch(linkRef, prefetch === "visible" ? doPrefetch : undefined);

  /* --- idle prefetch --- */
  useIdlePrefetch(prefetch === "idle" ? doPrefetch : undefined);

  return (
    <Link
      ref={linkRef}
      to={to}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      {...rest}
    />
  );
}

/* ---------------- Hooks ---------------- */

function useIntersectionPrefetch(
  ref: React.RefObject<Element>,
  callback?: () => void
) {
  useEffect(() => {
    if (!callback || !ref.current || !("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          callback();
          obs.disconnect();
          break;
        }
      }
    });

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, callback]);
}

function useIdlePrefetch(callback?: () => void) {
  useEffect(() => {
    if (!callback) return;

    const request =
      window.requestIdleCallback ||
      ((cb: (deadline: IdleDeadline) => void) =>
        window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 300));

    const cancel = window.cancelIdleCallback || window.clearTimeout;

    const handle = request(() => callback());
    return () => cancel(handle as number);
  }, [callback]);
}
