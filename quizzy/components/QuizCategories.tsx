"use client"

interface QuizCategoriesProps {
  onCategorySelect: (category: string) => void
}

const categories = [
  {
    id: "blockchain",
    name: "Blockchain Basics",
    description: "Test your knowledge of blockchain fundamentals",
    icon: "⛓️",
    color: "from-blue-500 to-cyan-500",
    questions: 10,
  },
  {
    id: "defi",
    name: "DeFi Protocols",
    description: "Decentralized Finance concepts and protocols",
    icon: "🏦",
    color: "from-green-500 to-emerald-500",
    questions: 12,
  },
  {
    id: "nft",
    name: "NFTs & Digital Assets",
    description: "Non-fungible tokens and digital ownership",
    icon: "🎨",
    color: "from-purple-500 to-pink-500",
    questions: 8,
  },
  {
    id: "trading",
    name: "Crypto Trading",
    description: "Trading strategies and market analysis",
    icon: "📈",
    color: "from-orange-500 to-red-500",
    questions: 15,
  },
  {
    id: "security",
    name: "Crypto Security",
    description: "Wallet security and best practices",
    icon: "🔒",
    color: "from-gray-600 to-gray-800",
    questions: 10,
  },
  {
    id: "web3",
    name: "Web3 Development",
    description: "Smart contracts and dApp development",
    icon: "⚡",
    color: "from-indigo-500 to-blue-600",
    questions: 14,
  },
]

export default function QuizCategories({ onCategorySelect }: QuizCategoriesProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Challenge</h1>
        <p className="text-gray-600 text-lg">Select a category to test your crypto knowledge</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-left"
          >
            <div
              className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}
            >
              {category.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{category.questions} questions</span>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
