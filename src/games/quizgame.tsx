import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { categoryConfig, quizData } from "./data";

export default function QuizGame() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof quizData>("Cleaning Products");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [categoryScores, setCategoryScores] = useState<Record<string, { correct: number; total: number }>>({});

  const currentQuizData = quizData[activeCategory];
  const currentConfig = categoryConfig[activeCategory];

  const handleQuizAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuizData[currentQuestion].safe;
    if (correct) setScore((s) => s + 1);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < currentQuizData.length - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const prev = categoryScores[activeCategory] || { correct: 0, total: 0 };
        setCategoryScores({
          ...categoryScores,
          [activeCategory]: { correct: prev.correct + (selectedAnswer === currentQuizData[currentQuestion].safe ? 1 : 0), total: currentQuizData.length },
        });
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8">
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
              className={`p-3 md:p-4 rounded-xl text-center transition-all duration-300 ${
                active ? `${cfg.buttonActiveColor} text-white shadow-lg transform scale-105` : `bg-gradient-to-br ${cfg.bgGradient} ${cfg.textColor} hover:shadow-md border-2 ${cfg.borderColor}`
              }`}
            >
              <Icon className={`h-6 w-6 mx-auto mb-2 ${active ? "text-white" : cfg.textColor}`} />
              <div className="text-xs md:text-sm font-medium">{category}</div>
              {categoryScores[category] && (
                <div className="text-xs mt-1 opacity-75">
                  {categoryScores[category].correct}/{categoryScores[category].total}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className={`text-sm font-medium ${currentConfig.textColor}`}>Progress</span>
          <span className="text-sm font-medium text-gray-600">
            {currentQuestion + 1}/{currentQuizData.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className={`h-full ${currentConfig.progressColor} transition-all duration-500 ease-out rounded-full shadow-sm`}
            style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / currentQuizData.length) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-600">
            Category Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className={`bg-gradient-to-br ${currentConfig.bgGradient} p-6 md:p-8 rounded-2xl shadow-lg mb-8 border-2 ${currentConfig.borderColor}`}>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
          Is "<span className={currentConfig.textColor}>{currentQuizData[currentQuestion].chemical}</span>" safe to use?
        </h3>

        {!showResult ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleQuizAnswer(true)}
              className="group p-6 bg-green-100 hover:bg-green-200 text-green-800 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium border-2 border-green-300 hover:border-green-400 hover:shadow-lg"
            >
              <CheckCircle2 className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold">Safe to Use</div>
              <div className="text-sm mt-1 opacity-75">Non‑toxic and family‑friendly</div>
            </button>
            <button
              onClick={() => handleQuizAnswer(false)}
              className="group p-6 bg-red-100 hover:bg-red-200 text-red-800 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium border-2 border-red-300 hover:border-red-400 hover:shadow-lg"
            >
              <XCircle className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold">Harmful/Avoid</div>
              <div className="text-sm mt-1 opacity-75">Contains toxic chemicals</div>
            </button>
          </div>
        ) : (
          <div
            className={`p-6 rounded-xl transition-all duration-500 ${
              selectedAnswer === currentQuizData[currentQuestion].safe
                ? "bg-green-100 border-2 border-green-300 shadow-green-100"
                : "bg-red-100 border-2 border-red-300 shadow-red-100"
            } shadow-lg`}
          >
            <p className="text-gray-700 mb-3 font-medium">{currentQuizData[currentQuestion].explanation}</p>
            <div className="border-l-4 border-green-500 pl-3">
              <p className="text-sm text-gray-600 italic font-medium">💡 {currentQuizData[currentQuestion].alternative}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
