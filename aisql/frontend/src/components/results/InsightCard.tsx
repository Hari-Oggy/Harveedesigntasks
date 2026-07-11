import { TrendingUp, TrendingDown, Info, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface InsightCardProps {
  insightText: string
}

export function InsightCard({ insightText }: InsightCardProps) {
  // Simple heuristic to split insights by newlines or bullet points
  const items = insightText
    .split(/\n|- /)
    .map((s) => s.trim())
    .filter((s) => s.length > 5)

  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => {
        // Determine icon based on simple keyword matching for demo purposes
        const lowerItem = item.toLowerCase()
        const isPositive = lowerItem.includes('highest') || lowerItem.includes('increase') || lowerItem.includes('grew') || lowerItem.includes('top')
        const isNegative = lowerItem.includes('lowest') || lowerItem.includes('decrease') || lowerItem.includes('fell') || lowerItem.includes('drop')

        let Icon = Info
        let iconBg = 'bg-blue-50'
        let iconColor = 'text-blue-500'
        let badge = null

        if (isPositive) {
          Icon = ArrowUpRight
          iconBg = 'bg-green-50'
          iconColor = 'text-green-500'
          badge = <TrendingUp size={12} className="text-green-600" />
        } else if (isNegative) {
          Icon = ArrowDownRight
          iconBg = 'bg-red-50'
          iconColor = 'text-red-500'
          badge = <TrendingDown size={12} className="text-red-600" />
        } else {
          Icon = Info
          iconBg = 'bg-indigo-50'
          iconColor = 'text-indigo-500'
        }

        return (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-4 items-start transition-shadow hover:shadow-md">
            <div className={`w-10 h-10 rounded-full ${iconBg} flex flex-col items-center justify-center shrink-0`}>
              <Icon size={18} className={iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                {item}
              </p>
              {badge && (
                <div className="mt-2 inline-flex items-center gap-1 bg-gray-50 border border-gray-100 rounded text-[10px] uppercase font-bold text-gray-500 px-1.5 py-0.5 tracking-wider">
                  {badge} Trend
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
