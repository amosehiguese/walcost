import { createFileRoute } from '@tanstack/react-router'
import { Server } from 'lucide-react'
import { MeasurementTable } from '@/components/transparency/MeasurementTable'
import { MeasurementCard } from '@/components/transparency/MeasurementCard'
import type { RawMeasurement } from '@/types'

export const Route = createFileRoute('/transparency')({
  component: TransparencyPage,
})

const RAW_DATA: RawMeasurement[] = [
  { id: '0x1a...4f', size: '100 MB', class: 'Deletable', epochs: 30, wal: '1.2045', gas: '0.00512' },
  { id: '0x2b...9c', size: '100 MB', class: 'Deletable', epochs: 1, wal: '0.0401', gas: '0.00508' },
  { id: '0x3c...2d', size: '1.2 GB', class: 'Permanent', epochs: '∞', wal: '540.22', gas: '0.00620' },
  { id: '0x4d...1e', size: '500 MB', class: 'Deletable', epochs: 7, wal: '1.4055', gas: '0.00540' },
  { id: '0x5e...3f', size: '50 MB', class: 'Permanent', epochs: '∞', wal: '21.500', gas: '0.00490' },
  { id: '0x6f...5a', size: '200 MB', class: 'Deletable', epochs: 365, wal: '29.200', gas: '0.00520' },
  { id: '0x7a...6b', size: '10 GB', class: 'Deletable', epochs: 30, wal: '120.45', gas: '0.00850' },
  { id: '0x8b...7c', size: '5 GB', class: 'Permanent', epochs: '∞', wal: '2250.1', gas: '0.00710' },
  { id: '0x9c...8d', size: '1 MB', class: 'Deletable', epochs: 1, wal: '0.0004', gas: '0.00405' },
  { id: '0x0d...9e', size: '750 MB', class: 'Deletable', epochs: 14, wal: '4.2000', gas: '0.00580' },
]

function TransparencyPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-10 text-xs font-mono text-gray-500 border-b border-gray-200 pb-6 shrink-0">
        <div>
          <span className="uppercase tracking-wider font-semibold text-gray-400 mr-3">Protocol Ver</span>
          <span className="text-gray-900 bg-gray-100 px-2 py-1 rounded-sm">v14.2.0-beta</span>
        </div>
        <div>
          <span className="uppercase tracking-wider font-semibold text-gray-400 mr-3">Last Updated</span>
          <span className="text-gray-900">{new Date().toISOString()}</span>
        </div>
        <div>
          <span className="uppercase tracking-wider font-semibold text-gray-400 mr-3">Data Source</span>
          <span className="text-gray-900 flex-inline items-center gap-1">
            On-Chain Aggregation <span className="w-2 h-2 inline-block bg-green-500 rounded-full ml-1 animate-pulse"></span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">
        <Server className="w-3 h-3" />
        <span>Raw Cost Measurements</span>
      </div>

      <MeasurementTable data={RAW_DATA} />
      <MeasurementCard data={RAW_DATA} />

      <div className="mt-8 text-center md:text-left">
        <button className="text-xs text-blue-600 font-mono hover:underline flex items-center justify-center md:justify-start gap-1">
          Download CSV Report <Server className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}