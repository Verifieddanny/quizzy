"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleConnectWallet = () => {
    localStorage.setItem("walletConnected", "true")
    localStorage.setItem(
      "walletAddress",
      "0x" + Math.random().toString(16).substr(2, 8) + "..." + Math.random().toString(16).substr(2, 4),
    )
    router.push("/app")
  }

  const handleContinueToApp = () => {
    localStorage.setItem("walletConnected", "false")
    router.push("/app")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo Animation */}
        <div
          className={`transition-all duration-1000 ease-out transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="relative w-40 h-40 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-2xl flex items-center justify-center">
              <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Q
              </span>
            </div>
          </div>
        </div>

        {/* App Name */}
        <div
          className={`text-center transition-all duration-1000 delay-300 ease-out transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Quizzy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Test your crypto knowledge. Earn NFT rewards.</p>
        </div>

        {/* Animated Quiz Cards */}
        <div
          className={`relative w-full max-w-md h-48 mb-12 transition-all duration-1000 delay-600 ease-out transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="absolute top-0 left-0 w-64 h-32 bg-white rounded-2xl shadow-xl p-4 transform -rotate-6 animate-float animation-delay-100">
            <div className="h-3 w-3/4 bg-blue-200 rounded-full mb-2"></div>
            <div className="h-2 w-1/2 bg-gray-200 rounded-full mb-4"></div>
            <div className="flex space-x-2">
              <div className="h-6 w-6 bg-green-100 rounded-full"></div>
              <div className="h-6 w-20 bg-green-100 rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-4 right-0 w-64 h-32 bg-white rounded-2xl shadow-xl p-4 transform rotate-3 animate-float animation-delay-300">
            <div className="h-3 w-3/4 bg-purple-200 rounded-full mb-2"></div>
            <div className="h-2 w-1/2 bg-gray-200 rounded-full mb-4"></div>
            <div className="flex space-x-2">
              <div className="h-6 w-6 bg-red-100 rounded-full"></div>
              <div className="h-6 w-20 bg-red-100 rounded-full"></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-white rounded-2xl shadow-xl p-4 transform rotate-6 animate-float animation-delay-500">
            <div className="h-3 w-3/4 bg-yellow-200 rounded-full mb-2"></div>
            <div className="h-2 w-1/2 bg-gray-200 rounded-full mb-4"></div>
            <div className="flex space-x-2">
              <div className="h-6 w-6 bg-blue-100 rounded-full"></div>
              <div className="h-6 w-20 bg-blue-100 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-900 ease-out transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <button
            onClick={handleConnectWallet}
            className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 min-w-[200px]"
          >
            Connect Wallet
          </button>
          <button
            onClick={handleContinueToApp}
            className="bg-white text-gray-700 cursor-pointer px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-200 min-w-[200px]"
          >
            Continue to App
          </button>
        </div>

        {/* Features */}
        <div
          className={`mt-16 grid grid-cols-3 gap-4 max-w-lg transition-all duration-1000 delay-1200 ease-out transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">🏆</span>
            </div>
            <p className="text-sm text-gray-600">Compete</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">🧠</span>
            </div>
            <p className="text-sm text-gray-600">Learn</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">🎨</span>
            </div>
            <p className="text-sm text-gray-600">Earn NFTs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
