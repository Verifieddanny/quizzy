"use client"

import { useState } from "react"

interface WalletConnectionProps {
  onConnect: (address: string) => void
  onDecline?: () => void
}

export default function WalletConnection({ onConnect, onDecline }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)

    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock wallet address
    const mockAddress = "0x" + Math.random().toString(16).substr(2, 8) + "..." + Math.random().toString(16).substr(2, 4)
    onConnect(mockAddress)
    setIsConnecting(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Connect your wallet to save your progress, compete on the leaderboard, and earn NFT rewards!
          </p>

          <div className="space-y-4">
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              {isConnecting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Connecting...
                </div>
              ) : (
                "Connect Wallet"
              )}
            </button>

            {onDecline && (
              <button
                onClick={onDecline}
                className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Continue Without Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
