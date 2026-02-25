// quizgame.tsx — Chemical Quiz, brand-aligned design
import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categoryConfig, quizData } from "./data";

// ── Brand palette ─────────────────────────────────────────────────────────────
const VANILLA = "#FAF5E4";
const SAGE = "#A2CB8B";
const TERRACOTTA = "#B85C38";
const CHARCOAL = "#22211F";

export default function QuizGame() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof quizData>("Cleaning Products");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [categoryScores, setCategoryScores] = useState<Record<string, { correct: number; total: number }>>({});

  const currentQuizData = quizData[activeCategory];
  const totalQ = currentQuizData.length;
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / totalQ) * 100;
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuizData[currentQuestion].safe;

  const handleQuizAnswer = (answer: boolean) => {
    if (showResult) return; // debounce
    setSelectedAnswer(answer);
    const correct = answer === currentQuizData[currentQuestion].safe;
    if (correct) setScore((s) => s + 1);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < totalQ - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const prev = categoryScores[activeCategory] || { correct: 0, total: 0 };
        setCategoryScores({
          ...categoryScores,
          [activeCategory]: {
            correct: prev.correct + (answer === currentQuizData[currentQuestion].safe ? 1 : 0),
            total: totalQ,
          },
        });
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
      }
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* ── Category pills ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        {Object.entries(categoryConfig).map(([category, cfg]) => {
          const Icon = cfg.icon;
          const active = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category as keyof typeof quizData);
                setCurrentQuestion(0);
                setScore(0);
                setShowResult(false);
                setSelectedAnswer(null);
              }}
              className="group flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl transition-all duration-300 outline-none focus-visible:ring-2"
              style={
                active
                  ? { background: CHARCOAL, color: VANILLA, boxShadow: "0 4px 16px rgba(34,33,31,0.20)" }
                  : { background: "rgba(255,255,255,0.6)", color: "rgba(34,33,31,0.54)", border: "1px solid rgba(34,33,31,0.09)" }
              }
            >
              <Icon
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                style={{ color: active ? TERRACOTTA : "rgba(34,33,31,0.40)" }}
              />
              <span className="font-mono text-[10px] tracking-wide text-center leading-tight">{category}</span>
              {categoryScores[category] && (
                <span
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{ background: active ? "rgba(250,245,228,0.15)" : SAGE + "33", color: active ? VANILLA : "#3A6B2A" }}
                >
                  {categoryScores[category].correct}/{categoryScores[category].total}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Progress bar ────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(34,33,31,0.36)" }}>
            Progress
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest" style={{ color: "rgba(184,92,56,0.6)" }}>
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </span>
            <span className="font-display text-base tracking-widest" style={{ color: CHARCOAL }}>
              {currentQuestion + (showResult ? 1 : 0)}<span style={{ color: "rgba(34,33,31,0.24)" }}>/{totalQ}</span>
            </span>
          </div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(34,33,31,0.08)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: TERRACOTTA }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ── Question card ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${currentQuestion}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: "rgba(255,255,255,0.80)", borderColor: "rgba(34,33,31,0.08)", boxShadow: "0 4px 28px rgba(0,0,0,0.06)" }}
        >
          {/* Question */}
          <div className="px-6 py-8 text-center border-b" style={{ borderColor: "rgba(34,33,31,0.06)" }}>
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase mb-4" style={{ color: "rgba(184,92,56,0.50)" }}>
              Is this ingredient safe?
            </p>
            <h3
              className="font-heading leading-snug"
              style={{ fontSize: "clamp(1.15rem,2.5vw,1.5rem)", color: CHARCOAL }}
            >
              "<span style={{ color: TERRACOTTA }}>{currentQuizData[currentQuestion].chemical}</span>"
            </h3>
          </div>

          {/* Answer choices or feedback */}
          <div className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="choices"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <button
                    onClick={() => handleQuizAnswer(true)}
                    className="group flex flex-col items-center gap-2 py-6 px-4 rounded-xl border-2 transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: "rgba(162,203,139,0.10)", borderColor: "rgba(162,203,139,0.35)", color: "#2F6A20" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(162,203,139,0.22)"; e.currentTarget.style.borderColor = SAGE; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(162,203,139,0.10)"; e.currentTarget.style.borderColor = "rgba(162,203,139,0.35)"; }}
                  >
                    <CheckCircle2 className="h-7 w-7 group-hover:scale-110 transition-transform" style={{ color: "#5A8A3C" }} strokeWidth={1.5} />
                    <span className="font-display tracking-widest text-base" style={{ color: "#2F6A20" }}>SAFE TO USE</span>
                    <span className="font-light text-xs" style={{ color: "rgba(47,106,32,0.60)" }}>Non-toxic and family-friendly</span>
                  </button>
                  <button
                    onClick={() => handleQuizAnswer(false)}
                    className="group flex flex-col items-center gap-2 py-6 px-4 rounded-xl border-2 transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: "rgba(184,92,56,0.07)", borderColor: "rgba(184,92,56,0.22)", color: TERRACOTTA }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,92,56,0.14)"; e.currentTarget.style.borderColor = TERRACOTTA; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(184,92,56,0.07)"; e.currentTarget.style.borderColor = "rgba(184,92,56,0.22)"; }}
                  >
                    <XCircle className="h-7 w-7 group-hover:scale-110 transition-transform" style={{ color: TERRACOTTA }} strokeWidth={1.5} />
                    <span className="font-display tracking-widest text-base" style={{ color: TERRACOTTA }}>HARMFUL / AVOID</span>
                    <span className="font-light text-xs" style={{ color: "rgba(184,92,56,0.60)" }}>Contains toxic chemicals</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl p-5 md:p-6"
                  style={{
                    background: isCorrect ? "rgba(162,203,139,0.15)" : "rgba(184,92,56,0.08)",
                    border: `1px solid ${isCorrect ? "rgba(162,203,139,0.45)" : "rgba(184,92,56,0.28)"}`,
                  }}
                >
                  {/* Result header */}
                  <div className="flex items-center gap-3 mb-4">
                    {isCorrect
                      ? <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: "#5A8A3C" }} strokeWidth={1.5} />
                      : <XCircle className="h-5 w-5 flex-shrink-0" style={{ color: TERRACOTTA }} strokeWidth={1.5} />
                    }
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: isCorrect ? "#5A8A3C" : TERRACOTTA }}>
                      {isCorrect ? "Correct!" : "Not quite"}
                    </span>
                  </div>
                  {/* Explanation */}
                  <p className="font-light leading-relaxed text-sm mb-4" style={{ color: "rgba(34,33,31,0.70)" }}>
                    {currentQuizData[currentQuestion].explanation}
                  </p>
                  {/* Alternative */}
                  <div className="flex items-start gap-3 pt-3 border-t" style={{ borderColor: "rgba(34,33,31,0.08)" }}>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "rgba(184,92,56,0.50)" }} strokeWidth={1.5} />
                    <p className="font-light italic text-sm" style={{ color: "rgba(34,33,31,0.52)" }}>
                      {currentQuizData[currentQuestion].alternative}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
