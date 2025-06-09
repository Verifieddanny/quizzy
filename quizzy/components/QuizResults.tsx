"use client"

import { useState } from "react"
import WalletConnection from "./WalletConnection"

interface QuizResult {
  score: number
  totalQuestions: number
  category: string
  answers: boolean[]
}

interface QuizResultsProps {
  result: QuizResult
  isWalletConnected: boolean
  showWalletPrompt: boolean
  onWalletConnect: (address: string) => void
  onRetake: () => void
  onEnd: () => void
}

export default function QuizResults({
  result,
  isWalletConnected,
  showWalletPrompt,
  onWalletConnect,
  onRetake,
  onEnd,
}: QuizResultsProps) {
  const [showConnectModal, setShowConnectModal] = useState(false)
  const percentage = Math.round((result.score / result.totalQuestions) * 100)
  const grade =
    percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : percentage >= 40 ? "Not Bad!" : "Keep Learning!"
  const gradeColor =
    percentage >= 80
      ? "text-green-600"
      : percentage >= 60
        ? "text-blue-600"
        : percentage >= 40
          ? "text-yellow-600"
          : "text-red-600"

  const handleConnectClick = () => {
    setShowConnectModal(true)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Results Card */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
        {/* Confetti Animation */}
        <div className="relative h-20 mb-4 overflow-hidden">
          <div className="absolute inset-0 flex justify-center">
            <div className="animate-fall-slow delay-100 w-4 h-4 bg-blue-500 rounded-sm"></div>
            <div className="animate-fall-slow delay-300 w-4 h-4 bg-purple-500 rounded-sm"></div>
            <div className="animate-fall-slow delay-500 w-4 h-4 bg-pink-500 rounded-sm"></div>
            <div className="animate-fall-slow delay-700 w-4 h-4 bg-yellow-500 rounded-sm"></div>
            <div className="animate-fall-slow delay-900 w-4 h-4 bg-green-500 rounded-sm"></div>
          </div>
        </div>

        {/* Score Circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 3.14} 314`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{percentage}%</div>
              <div className="text-sm text-gray-500">Score</div>
            </div>
          </div>
        </div>

        {/* Grade */}
        <h2 className={`text-3xl font-bold mb-2 ${gradeColor}`}>{grade}</h2>
        <p className="text-gray-600 text-lg mb-6">
          You got {result.score} out of {result.totalQuestions} questions correct
        </p>

        {/* Category Badge */}
        <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8 capitalize">
          {result.category.replace(/([A-Z])/g, " $1").trim()} Quiz
        </div>

        {/* Wallet Status */}
        {isWalletConnected ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center text-green-800">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Wallet Connected - Score Updated on Leaderboard!
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
            <div className="text-yellow-800 text-center">
              <p className="font-medium mb-3">Connect your wallet to save progress and compete on the leaderboard!</p>
              <button
                onClick={handleConnectClick}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-md transition-all duration-200"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetake}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Retake Quiz
          </button>
          <button
            onClick={onEnd}
            className="bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            Choose New Category
          </button>
        </div>
      </div>

      {/* Answer Review */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Answer Review</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {result.answers.map((isCorrect, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                isCorrect ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Connection Modal - Only show when user clicks connect button */}
      {showConnectModal && (
        <WalletConnection onConnect={onWalletConnect} onDecline={() => setShowConnectModal(false)} />
      )}
    </div>
  )
}
