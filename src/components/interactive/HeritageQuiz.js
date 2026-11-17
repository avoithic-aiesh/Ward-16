'use client';

/**
 * HeritageQuiz.js
 *
 * Interactive educational heritage quiz component.
 *
 * Features:
 * - Step-by-step multiple choice questions.
 * - Real-time feedback with verified historical explanations.
 * - Animated progress bar.
 * - Score calculation with evaluation tiers.
 * - Retake quiz option.
 * - Accessible keyboard radio options.
 */

import { useState } from 'react';

export default function HeritageQuiz({ quizData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const { title, description, questions = [] } = quizData || {};
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (optionId) => {
    if (isAnswered) return; // Prevent changing after submission
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    if (optionId === currentQuestion.correctOptionId) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (!quizData || questions.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-display text-2xl font-bold text-charcoal">
          {title?.en}
        </h3>
        {title?.ne && (
          <p className="text-xs text-charcoal/50 font-serif mt-0.5">
            {title.ne}
          </p>
        )}
        <p className="text-sm text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
          {description?.en}
        </p>
      </div>

      {/* Main Quiz Box */}
      <div className="bg-white border border-beige p-6 sm:p-8 rounded-sm shadow-sm">
        {!isCompleted ? (
          <div className="space-y-6">
            {/* Progress Bar & Counter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-charcoal/60">
                <span>
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span>
                  Score: {score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}
                </span>
              </div>
              <div className="w-full h-1.5 bg-beige rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                  }}
                  className="h-full bg-burgundy transition-all duration-300 rounded-full"
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-2 pt-2">
              <h4 className="font-display text-lg sm:text-xl font-bold text-charcoal leading-snug">
                {currentQuestion.question?.en}
              </h4>
              {currentQuestion.question?.ne && (
                <p className="text-xs text-charcoal/60 font-serif">
                  {currentQuestion.question.ne}
                </p>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrect = option.id === currentQuestion.correctOptionId;

                let buttonStyles = "bg-ivory/60 border-beige text-charcoal hover:border-gold hover:bg-ivory";

                if (isAnswered) {
                  if (isCorrect) {
                    buttonStyles = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold";
                  } else if (isSelected && !isCorrect) {
                    buttonStyles = "bg-rose-50 border-rose-400 text-rose-950 line-through opacity-85";
                  } else {
                    buttonStyles = "bg-ivory/30 border-beige/60 text-charcoal/40";
                  }
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isAnswered}
                    className={[
                      "w-full text-left p-3.5 sm:p-4 rounded-sm border transition-all text-sm flex items-center justify-between gap-3",
                      buttonStyles,
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-mono text-xs uppercase font-bold shrink-0">
                        {option.id}
                      </span>
                      <span>{option.text?.en}</span>
                    </div>

                    {isAnswered && (
                      <span className="shrink-0 text-xs font-mono font-bold">
                        {isCorrect && <span className="text-emerald-700">✓ Correct</span>}
                        {isSelected && !isCorrect && <span className="text-rose-700">✗ Incorrect</span>}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box */}
            {isAnswered && (
              <div className="mt-4 p-4 rounded-sm bg-beige/30 border border-gold/40 text-xs leading-relaxed space-y-1 animate-fade-in">
                <span className="font-bold text-charcoal block uppercase tracking-wide font-mono text-[11px]">
                  Verified Historical Explanation:
                </span>
                <p className="text-charcoal/80">
                  {currentQuestion.explanation?.en}
                </p>
                {currentQuestion.explanation?.ne && (
                  <p className="text-charcoal/60 font-serif italic pt-1 border-t border-beige/60">
                    {currentQuestion.explanation.ne}
                  </p>
                )}
              </div>
            )}

            {/* Next / Finish Button */}
            {isAnswered && (
              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-sm bg-burgundy hover:bg-burgundy-dark text-ivory text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  {currentQuestionIndex + 1 === totalQuestions ? "View Final Results →" : "Next Question →"}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Final Results Screen */
          <div className="text-center py-8 space-y-6 animate-fade-in max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto border-2 border-gold shadow-md">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                Quiz Complete
              </span>
              <h4 className="font-display text-2xl font-bold text-charcoal mt-1">
                Your Heritage Score: {score} / {totalQuestions}
              </h4>
              <p className="text-xs text-charcoal/60 mt-1">
                ({Math.round((score / totalQuestions) * 100)}% accuracy across verified historical facts)
              </p>
            </div>

            <p className="text-sm text-charcoal/80 leading-relaxed font-serif italic">
              {score === totalQuestions
                ? "Outstanding! You have mastered the verified architecture, royal chronicles, and living traditions of this sacred site."
                : score >= 3
                ? "Well done! You have a strong grasp of the cultural significance and historical epochs of Ward 16."
                : "Thank you for exploring! You can retake the quiz or review the historical documentation above to learn more."}
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="px-6 py-2.5 rounded-sm bg-burgundy hover:bg-burgundy-dark text-ivory text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Retake Heritage Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
