import React, { Suspense, useMemo, useRef, useState } from "react";
import { Brain, Gamepad2, Grid3X3 } from "lucide-react";

// Lazy-loaded game routes (code-splitting)
const QuizGame = React.lazy(() => import("./quizgame"));
const ProductSortingGame = React.lazy(() => import("./productsortinggame"));
const MemoryMatch = React.lazy(() => import("./memorymatch"));

type GameKey = "quiz" | "sorting" | "memory";

type TabDef = {
  key: GameKey;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const TABS: TabDef[] = [
  { key: "quiz", label: "Chemical Quiz", Icon: Brain },
  { key: "sorting", label: "Product Sorting", Icon: Gamepad2 },
  { key: "memory", label: "Memory Match", Icon: Grid3X3 },
];

export default function GameHub() {
  const [active, setActive] = useState<GameKey>("quiz");

  // Stable ids for ARIA relationships
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

  // Refs for keyboard focus management
  const tabRefs = useRef<Record<GameKey, HTMLButtonElement | null>>({
    quiz: null,
    sorting: null,
    memory: null,
  });

  const focusTab = (k: GameKey) => {
    tabRefs.current[k]?.focus();
  };

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
      case "ArrowLeft":
      case "Left":
        e.preventDefault();
        moveFocus("prev");
        break;
      case "ArrowRight":
      case "Right":
        e.preventDefault();
        moveFocus("next");
        break;
      case "Home":
        e.preventDefault();
        moveFocus("home");
        break;
      case "End":
        e.preventDefault();
        moveFocus("end");
        break;
      case "Enter":
      case " ":
        // Space/Enter already selects since we set active on click.
        // Prevent page scroll on Space.
        e.preventDefault();
        break;
    }
  };

  const renderPanel = () => {
    switch (active) {
      case "quiz":
        return (
          <div
            id={ids.panel.quiz}
            role="tabpanel"
            aria-labelledby={ids.tab.quiz}
            tabIndex={0}
          >
            <QuizGame />
          </div>
        );
      case "sorting":
        return (
          <div
            id={ids.panel.sorting}
            role="tabpanel"
            aria-labelledby={ids.tab.sorting}
            tabIndex={0}
          >
            <ProductSortingGame />
          </div>
        );
      case "memory":
        return (
          <div
            id={ids.panel.memory}
            role="tabpanel"
            aria-labelledby={ids.tab.memory}
            tabIndex={0}
          >
            <MemoryMatch />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Accessible tablist with keyboard support */}
      <div
        role="tablist"
        aria-label="Game selector"
        className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
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
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center outline-none
                ${
                  selected
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50"
                }`}
            >
              <Icon className="h-5 w-5 mr-2" aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Only mount the active panel -> lighter initial JS (lazy()) */}
      <Suspense fallback={<div className="p-8 text-center">Loading game…</div>}>
        {renderPanel()}
      </Suspense>
    </>
  );
}
