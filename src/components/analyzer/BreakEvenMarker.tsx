import { memo } from 'react'
import { Zap } from 'lucide-react'

interface BreakEvenMarkerProps {
  breakEvenIndex: number
}

export const BreakEvenMarker = memo(({ breakEvenIndex }: BreakEvenMarkerProps) => {
  if (breakEvenIndex === -1) return null

  return (
    <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200 text-xs font-medium">
      <Zap className="w-3 h-3 fill-current" />
      Break-even at Epoch {breakEvenIndex}
    </div>
  )
})

BreakEvenMarker.displayName = 'BreakEvenMarker'