import { memo } from 'react'
import type { RawMeasurement } from '@/types'

interface MeasurementTableProps {
  data: RawMeasurement[]
}

export const MeasurementTable = memo(({ data }: MeasurementTableProps) => {
  return (
    <div className="hidden md:block overflow-auto border border-gray-200 rounded-sm">
      <table className="w-full text-left border-collapse bg-white">
        <thead className="bg-gray-50 sticky top-0">
          <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            <th className="py-4 px-6 border-b border-gray-200">Tx Hash</th>
            <th className="py-4 px-6 border-b border-gray-200">Blob Size</th>
            <th className="py-4 px-6 border-b border-gray-200">Storage Class</th>
            <th className="py-4 px-6 border-b border-gray-200">Commitment</th>
            <th className="py-4 px-6 border-b border-gray-200 text-right">WAL Cost</th>
            <th className="py-4 px-6 border-b border-gray-200 text-right">SUI Gas</th>
          </tr>
        </thead>
        <tbody className="text-sm font-mono text-gray-900 divide-y divide-gray-100">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-blue-50/30 transition-colors group cursor-default">
              <td className="py-3 px-6 text-gray-400">{row.id}</td>
              <td className="py-3 px-6 font-medium">{row.size}</td>
              <td className="py-3 px-6">
                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide border ${
                  row.class === 'Permanent' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  {row.class}
                </span>
              </td>
              <td className="py-3 px-6">{row.epochs} {row.epochs !== '∞' && 'epochs'}</td>
              <td className="py-3 px-6 text-right font-bold">{row.wal}</td>
              <td className="py-3 px-6 text-right text-gray-500">{row.gas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

MeasurementTable.displayName = 'MeasurementTable'