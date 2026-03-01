// GameHub.tsx — branded tab shell for all three games
import React, { Suspense, useMemo, useRef, useState } from "react";
import { Brain, Gamepad2, Grid3X3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QuizGame = React.lazy(() => import("./quizgame"));
const ProductSortingGame = React.lazy(() => import("./productsortinggame"));
const MemoryMatch = React.lazy(() => import("./memorymatch"));

// ── Brand palette ────────────────────────────────────────────────────────────
const VANILLA = '#F8FAFC';
const TERRACOTTA = '#06B6D4';
const CHARCOAL = '#0F172A';

type GameKey = "quiz" | "sorting" | "memory";
type TabDef = { key: GameKey; label: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> };

const TABS: TabDef[] = [
  { key: "quiz", label: "Chemical Quiz", Icon: Brain },
  { key: "sorting", label: "Product Sorting", Icon: Gamepad2 },
  { key: "memory", label: "Memory Match", Icon: Grid3X3 },
];

export default function GameHub() {
  const [active, setActive] = useState<GameKey>("quiz");

  const ids = useMemo(
    () =>
      TABS.reduce(
        (acc, t) => {
          acc.tab[t.key] = `learn-tab-${t.key}`;
          acc.panel[t.key] = `learn-panel-${t.key}`;
          return acc;
        },
        { tab: {} as Record<GameKey, string>, panel: {} as Record<GameKey, string> }
      ),
    []
  );

  const tabRefs = useRef<Record<GameKey, HTMLButtonElement | null>>({ quiz: null, sorting: null, memory: null });
  const focusTab = (k: GameKey) => tabRefs.current[k]?.focus();
  const moveFocus = (dir: "prev" | "next" | "home" | "end") => {
    const order: GameKey[] = TABS.map((t) => t.key);
    const idx = order.indexOf(active);
    let nextIdx = idx;
    if (dir === "prev") nextIdx = (idx - 1 + order.length) % order.length;
    if (dir === "next") nextIdx = (idx + 1) % order.length;
    if (dir === "home") nextIdx = 0;
    if (dir === "end") nextIdx = order.length - 1;
    const nextKey = order[nextIdx];
    setActive(nextKey);
    focusTab(nextKey);
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowLeft": case "Left": e.preventDefault(); moveFocus("prev"); break;
      case "ArrowRight": case "Right": e.preventDefault(); moveFocus("next"); break;
      case "Home": e.preventDefault(); moveFocus("home"); break;
      case "End": e.preventDefault(); moveFocus("end"); break;
      case "Enter": case " ": e.preventDefault(); break;
    }
  };

  const renderPanel = () => {
    const panelProps = (key: GameKey) => ({
      id: ids.panel[key], role: "tabpanel" as const,
      "aria-labelledby": ids.tab[key], tabIndex: 0,
    });
    switch (active) {
      case "quiz": return <div {...panelProps("quiz")}><QuizGame /></div>;
      case "sorting": return <div {...panelProps("sorting")}><ProductSortingGame /></div>;
      case "memory": return <div {...panelProps("memory")}><MemoryMatch /></div>;
      default: return null;
    }
  };

  return (
    <div>
      {/* ── Game selector tabs ──────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Game selector"
        className="flex flex-col sm:flex-row justify-center gap-3 mb-8"
      >
        {TABS.map(({ key, label, Icon }) => {
          const selected = active === key;
          return (
            <button
              key={key}
              ref={(el) => (tabRefs.current[key] = el)}
              id={ids.tab[key]}
              role="tab"
              aria-selected={selected}
              aria-controls={ids.panel[key]}
              tabIndex={selected ? 0 : -1}
              onKeyDown={onTabKeyDown}
              onClick={() => setActive(key)}
              className="relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-mono text-sm tracking-widest uppercase transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={
                selected
                  ? {
                    background: TERRACOTTA,
                    color: VANILLA,
                    boxShadow: "0 4px 20px rgba(6, 182, 212,0.28)",
                    border: "2px solid transparent",
                  }
                  : {
                    background: "rgba(255,255,255,0.7)",
                    color: `rgba(${parseInt(CHARCOAL.slice(1, 3), 16)},${parseInt(CHARCOAL.slice(3, 5), 16)},${parseInt(CHARCOAL.slice(5, 7), 16)},0.58)`,
                    border: `2px solid rgba(15, 23, 42,0.12)`,
                  }
              }
            >
              {selected && (
                <motion.div
                  layoutId="game-tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: TERRACOTTA }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="h-4 w-4 relative z-10" aria-hidden="true" />
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Game panel ──────────────────────────────────────────────── */}
      <Suspense
        fallback={
          <div className="h-48 flex items-center justify-center">
            <span
              className="font-mono text-sm tracking-widest"
              style={{ color: 'rgba(15, 23, 42,0.45)' }}
            >
              Loading game…
            </span>
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderPanel()}
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}
