import { memo } from 'react'
import { Info } from 'lucide-react'

interface ConfidenceRangeProps {
  minWal: number
  maxWal: number
}

export const ConfidenceRange = memo(({ minWal, maxWal }: ConfidenceRangeProps) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
        <span>{minWal.toFixed(2)}</span>
        <span className="font-semibold text-gray-600">Confidence Range (95%)</span>
        <span>{maxWal.toFixed(2)}</span>
      </div>
      <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full bg-gray-200"></div>
        <div className="absolute top-0 h-full bg-blue-200 w-1/3 left-1/3 rounded-full opacity-50"></div>
        <div className="absolute top-0 h-full w-1 bg-blue-600 left-1/2 transform -translate-x-1/2"></div>
      </div>
      <p className="mt-3 text-[10px] text-gray-400 flex items-center gap-1">
        <Info className="w-3 h-3" />
        Derived from real on-chain measurements over last 100 epochs.
      </p>
    </div>
  )
})

ConfidenceRange.displayName = 'ConfidenceRange'