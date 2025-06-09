"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Leaderboard from "@/components/Leaderboard"
import QuizCategories from "@/components/QuizCategories"
import Quiz from "@/components/Quiz"
import QuizResults from "@/components/QuizResults"
import WalletConnection from "@/components/WalletConnection"

type AppState = "loading" | "welcome" | "categories" | "leaderboard" | "quiz" | "results"

interface User {
  address: string
  rank: number
  score: number
}

interface QuizResult {
  score: number
  totalQuestions: number
  category: string
  answers: boolean[]
}

export default function QuizApp() {
  const router = useRouter()
  const [appState, setAppState] = useState<AppState>("loading")
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [showWalletPrompt, setShowWalletPrompt] = useState(false)
  const [showWelcomeButtons, setShowWelcomeButtons] = useState(true)

  useEffect(() => {
    // Check if coming from landing page
    const checkWalletConnection = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check wallet connection from localStorage
      const connected = localStorage.getItem("walletConnected") === "true"
      setIsWalletConnected(connected)

      if (connected) {
        // Get wallet address from localStorage
        const address = localStorage.getItem("walletAddress") || "0x1234...5678"

        // Mock user data
        setUser({
          address,
          rank: 15,
          score: 2450,
        })
        setAppState("welcome")
      } else {
        setAppState("welcome")
      }
    }

    checkWalletConnection()
  }, [])

  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true)
    localStorage.setItem("walletConnected", "true")
    localStorage.setItem("walletAddress", address)

    const newUser = {
      address,
      rank: 25,
      score: 1200,
    }
    setUser(newUser)
    setShowWalletPrompt(false)

    if (quizResult) {
      // Update leaderboard with quiz result
      updateLeaderboard(quizResult)
    }
  }

  const handleStartQuiz = () => {
    setAppState("categories")
    setShowWelcomeButtons(false)
  }

  const handleViewLeaderboard = () => {
    setAppState("leaderboard")
    setShowWelcomeButtons(false)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setAppState("quiz")
  }

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result)
    setAppState("results")

    if (isWalletConnected) {
      updateLeaderboard(result)
    }
  }

  const updateLeaderboard = (result: QuizResult) => {
    // Mock leaderboard update
    if (user) {
      const newScore = user.score + result.score * 10
      setUser({ ...user, score: newScore, rank: Math.max(1, user.rank - 2) })
    }
  }

  const handleRetakeQuiz = () => {
    setQuizResult(null)
    setAppState("categories")
  }

  const handleEndSession = () => {
    setQuizResult(null)
    setAppState("categories")
  }

  const handleGoToLanding = () => {
    router.push("/")
  }

  if (appState === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Quizzy...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* App Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Quizzy</span>
          </div>

          {isWalletConnected && user && (
            <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">{user.address}</span>
            </div>
          )}
        </div>

        {/* Welcome Screen with Two Buttons */}
        {appState === "welcome" && showWelcomeButtons && (
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Quizzy!</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto">
              Test your crypto knowledge, compete with others, and earn NFT rewards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleStartQuiz}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Start Quiz
              </button>

              {isWalletConnected ? (
                <button
                  onClick={handleViewLeaderboard}
                  className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-200"
                >
                  View Leaderboard
                </button>
              ) : (
                <button
                  onClick={() => setShowWalletPrompt(true)}
                  className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-200"
                >
                  Connect Wallet
                </button>
              )}
            </div>

            <button onClick={handleGoToLanding} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
              Back to Landing Page
            </button>
          </div>
        )}

        {appState === "leaderboard" && <Leaderboard user={user} onStartQuiz={handleStartQuiz} />}

        {appState === "categories" && <QuizCategories onCategorySelect={handleCategorySelect} />}

        {appState === "quiz" && <Quiz category={selectedCategory} onComplete={handleQuizComplete} />}

        {appState === "results" && quizResult && (
          <QuizResults
            result={quizResult}
            isWalletConnected={isWalletConnected}
            showWalletPrompt={false} // Don't show wallet prompt automatically
            onWalletConnect={handleWalletConnect}
            onRetake={handleRetakeQuiz}
            onEnd={handleEndSession}
          />
        )}
      </div>

      {/* Wallet Connection Modal - Only show when explicitly triggered */}
      {showWalletPrompt && (
        <WalletConnection onConnect={handleWalletConnect} onDecline={() => setShowWalletPrompt(false)} />
      )}
    </div>
  )
}
