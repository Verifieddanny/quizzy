"use client"

interface User {
  address: string
  rank: number
  score: number
}

interface LeaderboardProps {
  user: User | null
  onStartQuiz: () => void
}

const mockLeaderboard = [
  { rank: 1, address: "0xABC...123", score: 5420 },
  { rank: 2, address: "0xDEF...456", score: 4890 },
  { rank: 3, address: "0xGHI...789", score: 4650 },
  { rank: 4, address: "0xJKL...012", score: 4200 },
  { rank: 5, address: "0xMNO...345", score: 3980 },
]

export default function Leaderboard({ user, onStartQuiz }: LeaderboardProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Champions</h1>
        <p className="text-gray-600 text-lg">Compete with the best minds in crypto!</p>
      </div>

      {/* User Rank Card */}
      {user && (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Your Rank</h3>
              <p className="text-gray-600">{user.address}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">#{user.rank}</div>
              <div className="text-sm text-gray-500">{user.score.toLocaleString()} pts</div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Top Players</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {mockLeaderboard.map((player, index) => (
            <div
              key={player.address}
              className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                        ? "bg-gray-400"
                        : index === 2
                          ? "bg-amber-600"
                          : "bg-blue-500"
                  }`}
                >
                  {player.rank}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{player.address}</div>
                  <div className="text-sm text-gray-500">{player.score.toLocaleString()} points</div>
                </div>
              </div>

              {index < 3 && <div className="text-2xl">{index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉"}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Start Quiz Button */}
      <div className="text-center">
        <button
          onClick={onStartQuiz}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Start New Quiz
        </button>
      </div>
    </div>
  )
}
