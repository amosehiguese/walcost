import { memo } from 'react'
import type { RawMeasurement } from '@/types'

interface MeasurementCardProps {
  data: RawMeasurement[]
}

export const MeasurementCard = memo(({ data }: MeasurementCardProps) => {
  return (
    <div className="md:hidden space-y-4">
      {data.map((row, i) => (
        <div key={i} className="border border-gray-200 p-4 rounded-sm bg-gray-50/30 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-xs font-mono text-gray-400">{row.id}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wide border ${
              row.class === 'Permanent' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-100 text-gray-600 border-gray-200'
            }`}>
              {row.class}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-gray-500 text-xs uppercase tracking-wide font-medium self-center">Blob Size</div>
            <div className="font-mono text-right text-gray-900">{row.size}</div>

            <div className="text-gray-500 text-xs uppercase tracking-wide font-medium self-center">Commitment</div>
            <div className="font-mono text-right text-gray-900">{row.epochs}</div>

            <div className="text-gray-500 text-xs uppercase tracking-wide font-medium self-center">WAL Cost</div>
            <div className="font-mono text-right text-gray-900 font-bold">{row.wal}</div>

            <div className="text-gray-500 text-xs uppercase tracking-wide font-medium self-center">SUI Gas</div>
            <div className="font-mono text-right text-gray-500">{row.gas}</div>
          </div>
        </div>
      ))}
    </div>
  )
})

MeasurementCard.displayName = 'MeasurementCard'