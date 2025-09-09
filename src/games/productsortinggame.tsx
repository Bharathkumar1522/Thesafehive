import React, { useState } from "react";
import { RotateCcw, Leaf, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Product, sortingProducts } from "./data";

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
  const handleDrop = (e: React.DragEvent, zone: "safe" | "harmful") => {
    e.preventDefault();
    commitDrop(zone);
  };
  const handleTouchStart = (product: Product) => setDraggedItem(product);
  const handleZoneTouch = (zone: "safe" | "harmful") => commitDrop(zone);

  const reset = () => {
    setProducts(sortingProducts);
    setSafeZone([]);
    setHarmfulZone([]);
    setSortingScore(0);
    setDraggedItem(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Product Sorting Challenge</h2>
        <p className="text-lg text-gray-700">Drag products to the correct zone (or tap → tap on mobile).</p>
        <div className="mt-4">
          <span className="text-xl font-bold text-green-600">Score: {sortingScore}</span>
          <button onClick={reset} className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <RotateCcw className="h-4 w-4 inline mr-2" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Products */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Products to Sort</h3>
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.name}
                draggable
                onDragStart={(e) => handleDragStart(e, p)}
                onClick={() => handleTouchStart(p)}
                className="p-4 rounded-lg cursor-move bg-white hover:bg-gray-100 border-2 border-gray-200 text-center font-medium"
              >
                <div className="text-sm text-gray-600 mb-1">{p.type}</div>
                <div>{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Safe Zone */}
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "safe")}
          onTouchEnd={() => handleZoneTouch("safe")}
          className="bg-green-50 border-2 border-dashed border-green-300 p-6 rounded-xl min-h-[300px]"
        >
          <h3 className="text-lg font-bold text-green-800 mb-4 text-center flex items-center justify-center">
            <Leaf className="h-5 w-5 mr-2" /> Safe Products
          </h3>
          <div className="space-y-2">
            {safeZone.map((p) => (
              <div
                key={p.name}
                className={`p-3 rounded-lg text-center font-medium ${
                  p.correct ? "bg-green-200 border-2 border-green-400" : "bg-red-200 border-2 border-red-400"
                }`}
              >
                <div className="text-xs mb-1">{p.type}</div>
                <div className="text-sm">{p.name}</div>
                {p.correct ? <CheckCircle2 className="h-4 w-4 mx-auto mt-1" /> : <XCircle className="h-4 w-4 mx-auto mt-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Harmful Zone */}
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "harmful")}
          onTouchEnd={() => handleZoneTouch("harmful")}
          className="bg-red-50 border-2 border-dashed border-red-300 p-6 rounded-xl min-h-[300px]"
        >
          <h3 className="text-lg font-bold text-red-800 mb-4 text-center flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 mr-2" /> Harmful Products
          </h3>
          <div className="space-y-2">
            {harmfulZone.map((p) => (
              <div
                key={p.name}
                className={`p-3 rounded-lg text-center font-medium ${
                  p.correct ? "bg-red-200 border-2 border-red-400" : "bg-green-200 border-2 border-green-400"
                }`}
              >
                <div className="text-xs mb-1">{p.type}</div>
                <div className="text-sm">{p.name}</div>
                {p.correct ? <CheckCircle2 className="h-4 w-4 mx-auto mt-1" /> : <XCircle className="h-4 w-4 mx-auto mt-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
