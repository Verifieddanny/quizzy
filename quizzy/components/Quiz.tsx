"use client"

import { useState, useEffect } from "react"

interface QuizProps {
  category: string
  onComplete: (result: { score: number; totalQuestions: number; category: string; answers: boolean[] }) => void
}

const quizData: Record<string, any[]> = {
  blockchain: [
    {
      question: "What is a blockchain?",
      options: [
        "A type of cryptocurrency",
        "A distributed ledger technology",
        "A mining algorithm",
        "A wallet application",
      ],
      correct: 1,
    },
    {
      question: "What does 'decentralized' mean in blockchain context?",
      options: ["Controlled by one entity", "No central authority", "Faster transactions", "Lower fees"],
      correct: 1,
    },
    {
      question: "What is a hash function?",
      options: [
        "A type of cryptocurrency",
        "A mathematical function that converts input to fixed output",
        "A mining reward",
        "A wallet address",
      ],
      correct: 1,
    },
  ],
  defi: [
    {
      question: "What does DeFi stand for?",
      options: ["Digital Finance", "Decentralized Finance", "Distributed Finance", "Direct Finance"],
      correct: 1,
    },
    {
      question: "What is a liquidity pool?",
      options: [
        "A type of wallet",
        "A collection of funds locked in a smart contract",
        "A mining pool",
        "A trading strategy",
      ],
      correct: 1,
    },
  ],
  nft: [
    {
      question: "What does NFT stand for?",
      options: ["New Financial Token", "Non-Fungible Token", "Network File Transfer", "Next Future Technology"],
      correct: 1,
    },
    {
      question: "What makes an NFT unique?",
      options: ["Its price", "Its blockchain record", "Its image", "Its creator"],
      correct: 1,
    },
  ],
}

export default function Quiz({ category, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [isAnswered, setIsAnswered] = useState(false)

  const questions = quizData[category] || quizData.blockchain
  const totalQuestions = questions.length

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion()
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion])

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    const isCorrect = answerIndex === questions[currentQuestion].correct
    setAnswers([...answers, isCorrect])

    setTimeout(() => {
      handleNextQuestion()
    }, 1500)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setTimeLeft(30)
    } else {
      // Quiz completed
      const finalAnswers =
        selectedAnswer !== null ? [...answers, selectedAnswer === questions[currentQuestion].correct] : answers
      const score = finalAnswers.filter(Boolean).length
      onComplete({
        score,
        totalQuestions,
        category,
        answers: finalAnswers,
      })
    }
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
          <div className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-500" : "text-blue-600"}`}>{timeLeft}s</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">{currentQ.question}</h2>

        <div className="space-y-4">
          {currentQ.options.map((option: string, index: number) => {
            let buttonClass = "w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 font-medium "

            if (isAnswered) {
              if (index === currentQ.correct) {
                buttonClass += "bg-green-100 border-green-500 text-green-800"
              } else if (index === selectedAnswer) {
                buttonClass += "bg-red-100 border-red-500 text-red-800"
              } else {
                buttonClass += "bg-gray-50 border-gray-200 text-gray-500"
              }
            } else {
              buttonClass +=
                "bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800"
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center mr-4 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  {option}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
