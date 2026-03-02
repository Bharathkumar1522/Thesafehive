// productsortinggame.tsx — brand-aligned drag-and-drop sorting game
import React, { useState } from "react";
import { RotateCcw, Leaf, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, sortingProducts } from "./data";

const SAGE = "#A2CB8B";
const TERRACOTTA = '#06B6D4';
const CHARCOAL = '#0F172A';

export default function ProductSortingGame() {
  const [products, setProducts] = useState<Product[]>(sortingProducts);
  const [safeZone, setSafeZone] = useState<Product[]>([]);
  const [harmfulZone, setHarmfulZone] = useState<Product[]>([]);
  const [sortingScore, setSortingScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState<Product | null>(null);

  const handleDragStart = (e: React.DragEvent, product: Product) => {
    setDraggedItem(product);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const commitDrop = (zone: "safe" | "harmful") => {
    if (!draggedItem) return;
    const correct =
      (zone === "safe" && draggedItem.category === "safe") ||
      (zone === "harmful" && draggedItem.category === "harmful");
    if (correct) setSortingScore((s) => s + 10);
    setProducts((p) => p.filter((x) => x.name !== draggedItem.name));
    if (zone === "safe") setSafeZone((z) => [...z, { ...draggedItem, correct }]);
    else setHarmfulZone((z) => [...z, { ...draggedItem, correct }]);
    setDraggedItem(null);
  };
  const handleDrop = (e: React.DragEvent, zone: "safe" | "harmful") => { e.preventDefault(); commitDrop(zone); };
  const handleTouchStart = (product: Product) => setDraggedItem(product);
  const handleZoneTouch = (zone: "safe" | "harmful") => commitDrop(zone);
  const reset = () => {
    setProducts(sortingProducts);
    setSafeZone([]);
    setHarmfulZone([]);
    setSortingScore(0);
    setDraggedItem(null);
  };

  const allSorted = products.length === 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2
            className="font-display leading-none mb-1"
            style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)", color: CHARCOAL }}
          >
            SORTING <span style={{ color: TERRACOTTA }}>CHALLENGE</span>
          </h2>
          <p className="font-light text-sm" style={{ color: "rgba(15, 23, 42,0.50)" }}>
            Drag products to the correct zone — or tap a card, then tap a zone on mobile.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-center">
            <div className="font-display text-2xl" style={{ color: TERRACOTTA }}>{sortingScore}</div>
            <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(15, 23, 42,0.55)' }}>Score</div>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80"
            style={{ background: "rgba(15, 23, 42,0.07)", color: "rgba(15, 23, 42,0.54)", border: "1px solid rgba(15, 23, 42,0.10)" }}
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* ── Game grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Products to sort */}
        <div
          className="rounded-2xl p-4 border"
          style={{ background: "rgba(255,255,255,0.55)", borderColor: "rgba(15, 23, 42,0.08)" }}
        >
          <h3 className="font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: 'rgba(15, 23, 42,0.55)' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: TERRACOTTA }} />
            Products to Sort
          </h3>
          <div className="space-y-2 min-h-[200px]">
            <AnimatePresence>
              {products.map((p) => (
                <motion.div
                  key={p.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, p)}
                  onClick={() => handleTouchStart(p)}
                  className="group px-4 py-3 rounded-xl cursor-grab active:cursor-grabbing border-2 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: draggedItem?.name === p.name ? "rgba(6, 182, 212,0.10)" : "rgba(255,255,255,0.90)",
                    borderColor: draggedItem?.name === p.name ? TERRACOTTA : "rgba(15, 23, 42,0.07)",
                    boxShadow: draggedItem?.name === p.name ? `0 0 0 3px rgba(6, 182, 212,0.20)` : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="font-mono text-[9px] tracking-widest uppercase mb-0.5" style={{ color: 'rgba(15, 23, 42,0.55)' }}>{p.type}</div>
                  <div className="font-light text-sm" style={{ color: CHARCOAL }}>{p.name}</div>
                </motion.div>
              ))}
            </AnimatePresence>
            {allSorted && (
              <div className="py-8 text-center">
                <p className="font-display text-xl" style={{ color: TERRACOTTA }}>ALL SORTED!</p>
                <p className="font-light text-sm mt-1" style={{ color: "rgba(15, 23, 42,0.44)" }}>Final score: {sortingScore}</p>
              </div>
            )}
          </div>
        </div>

        {/* Safe zone */}
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "safe")}
          onTouchEnd={() => handleZoneTouch("safe")}
          className="rounded-2xl p-4 border-2 border-dashed transition-all duration-300 min-h-[280px]"
          style={{
            background: "rgba(186, 230, 253,0.08)",
            borderColor: draggedItem ? SAGE : "rgba(186, 230, 253,0.38)",
          }}
        >
          <h3 className="font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center justify-center gap-2" style={{ color: "#3A7A28" }}>
            <Leaf className="h-3.5 w-3.5" strokeWidth={1.5} />
            Safe Products
          </h3>
          <div className="space-y-2">
            <AnimatePresence>
              {safeZone.map((p) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border"
                  style={{
                    background: p.correct ? "rgba(186, 230, 253,0.20)" : "rgba(6, 182, 212,0.10)",
                    borderColor: p.correct ? "rgba(186, 230, 253,0.50)" : "rgba(6, 182, 212,0.30)",
                  }}
                >
                  {p.correct
                    ? <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#5A8A3C" }} strokeWidth={1.5} />
                    : <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: TERRACOTTA }} strokeWidth={1.5} />
                  }
                  <div>
                    <div className="font-mono text-[8px] tracking-widest uppercase" style={{ color: 'rgba(15, 23, 42,0.55)' }}>{p.type}</div>
                    <div className="font-light text-xs" style={{ color: CHARCOAL }}>{p.name}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {safeZone.length === 0 && (
              <div className="py-8 text-center">
                <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "rgba(186, 230, 253,0.55)" }}>Drop safe items here</p>
              </div>
            )}
          </div>
        </div>

        {/* Harmful zone */}
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "harmful")}
          onTouchEnd={() => handleZoneTouch("harmful")}
          className="rounded-2xl p-4 border-2 border-dashed transition-all duration-300 min-h-[280px]"
          style={{
            background: "rgba(6, 182, 212,0.05)",
            borderColor: draggedItem ? TERRACOTTA : "rgba(6, 182, 212,0.28)",
          }}
        >
          <h3 className="font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center justify-center gap-2" style={{ color: TERRACOTTA }}>
            <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.5} />
            High-Concern Products
          </h3>
          <div className="space-y-2">
            <AnimatePresence>
              {harmfulZone.map((p) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border"
                  style={{
                    background: p.correct ? "rgba(6, 182, 212,0.10)" : "rgba(186, 230, 253,0.15)",
                    borderColor: p.correct ? "rgba(6, 182, 212,0.30)" : "rgba(186, 230, 253,0.45)",
                  }}
                >
                  {p.correct
                    ? <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: TERRACOTTA }} strokeWidth={1.5} />
                    : <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#5A8A3C" }} strokeWidth={1.5} />
                  }
                  <div>
                    <div className="font-mono text-[8px] tracking-widest uppercase" style={{ color: 'rgba(15, 23, 42,0.55)' }}>{p.type}</div>
                    <div className="font-light text-xs" style={{ color: CHARCOAL }}>{p.name}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {harmfulZone.length === 0 && (
              <div className="py-8 text-center">
                <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: '#0891B2' }}>Drop high-concern items here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
