import { memo } from 'react'
import { Zap, Clock, Database } from 'lucide-react'
import type { CostEstimate, StorageClass } from '@/types'

interface CostSummaryCardProps {
  estimate: CostEstimate
  storageType: StorageClass
}

export const CostSummaryCard = memo(({ estimate, storageType }: CostSummaryCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div>
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium">Network Gas</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-mono font-semibold text-gray-900">
            {estimate.suiGas.toFixed(5)}
          </span>
          <span className="text-sm font-semibold text-gray-400">SUI</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">One-time transaction fee</p>
      </div>

      {storageType !== 'permanent' && (
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Cost / Epoch</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-semibold text-gray-900">
              {estimate.costPerEpoch.toFixed(4)}
            </span>
            <span className="text-sm font-semibold text-gray-400">WAL</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">recurring approx. every 24h</p>
        </div>
      )}
      
      {storageType === 'permanent' && (
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Database className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">Storage Type</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-semibold text-gray-900">
              Forever
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">No recurring fees</p>
        </div>
      )}
    </div>
  )
})

CostSummaryCard.displayName = 'CostSummaryCard'