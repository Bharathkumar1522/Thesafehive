import React, { useEffect, useState } from "react";
import { Timer, Trophy, RotateCcw, Grid3X3, Leaf, AlertTriangle } from "lucide-react";
import { memoryCards } from "./data";

type Card = { id: number; name: string; category: "healthy" | "harmful"; flipped: boolean; matched: boolean };

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [started, setStarted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [matches, setMatches] = useState(0);

  const init = () => {
    const shuffled = [...memoryCards].sort(() => Math.random() - 0.5).map((c, i) => ({ ...c, id: i, flipped: false, matched: false })) as Card[];
    setCards(shuffled);
    setFlipped([]);
    setScore(0);
    setTimeLeft(90);
    setStarted(true);
    setAttempts(0);
    setCompleted(false);
    setStartTime(Date.now());
    setEndTime(0);
    setMatches(0);
  };

  useEffect(() => {
    if (started && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0) {
      setStarted(false);
      setCompleted(true);
      setEndTime(Date.now());
    }
  }, [started, timeLeft]);

  const onCard = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || cards[id].matched) return;

    const nf = [...flipped, id];
    setFlipped(nf);
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));

    if (nf.length === 2) {
      setAttempts((a) => a + 1);
      const [aId, bId] = nf;
      const A = cards[aId];
      const B = cards[bId];

      if (A.category === B.category) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === aId || c.id === bId ? { ...c, matched: true } : c)));
          setScore((s) => s + 20);
          setMatches((m) => m + 1);
          setFlipped([]);
          if (matches + 1 === memoryCards.length / 2) {
            setCompleted(true);
            setStarted(false);
            setEndTime(Date.now());
          }
        }, 800);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === aId || c.id === bId ? { ...c, flipped: false } : c)));
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Memory Match Challenge</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center"><Timer className="h-5 w-5 text-blue-600 mr-2" /><span className="font-bold text-blue-600">{timeLeft}s</span></div>
            <div className="flex items-center"><Trophy className="h-5 w-5 text-green-600 mr-2" /><span className="font-bold text-green-600">{score} pts</span></div>
            <div className="flex items-center"><span className="text-gray-600">Matches: {matches}/{memoryCards.length / 2}</span></div>
          </div>
          <button onClick={init} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">{started ? "Restart" : "Start Game"}</button>
        </div>

        {!started && !completed && (
          <div className="bg-gray-100 p-8 rounded-2xl max-w-md mx-auto mt-6">
            <Grid3X3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Click “Start Game” to begin.</p>
          </div>
        )}
      </div>

      {started && !completed && (
        <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-2xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => onCard(card.id)}
              className={`aspect-square p-2 md:p-3 rounded-lg cursor-pointer transition-all ${
                card.flipped || card.matched
                  ? card.category === "healthy"
                    ? "bg-green-200 text-green-800 border-2 border-green-400"
                    : "bg-red-200 text-red-800 border-2 border-red-400"
                  : "bg-gray-200 hover:bg-gray-300 border-2 border-gray-300"
              } ${card.matched ? "opacity-75" : ""}`}
            >
              <div className="h-full flex flex-col items-center justify-center text-center">
                {card.flipped || card.matched ? (
                  <>
                    <div className="text-xs md:text-sm font-bold mb-1">{card.name}</div>
                    {card.category === "healthy" ? <Leaf className="h-4 w-4 md:h-6 md:w-6" /> : <AlertTriangle className="h-4 w-4 md:h-6 md:w-6" />}
                  </>
                ) : (
                  <div className="text-2xl md:text-4xl">?</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
