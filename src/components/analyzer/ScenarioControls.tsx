import { memo, useCallback } from 'react'
import type { TrafficPattern, StorageClass } from '@/types'

interface ScenarioControlsProps {
  pattern: TrafficPattern
  uploadSize: number
  frequency: number
  retention: StorageClass
  onPatternChange: (pattern: TrafficPattern) => void
  onUploadSizeChange: (size: number) => void
  onFrequencyChange: (frequency: number) => void
  onRetentionChange: (retention: StorageClass) => void
}

const PATTERN_OPTIONS = [
  { id: 'single' as const, label: 'Single Upload', desc: 'One-time archival' },
  { id: 'periodic' as const, label: 'Periodic Backup', desc: 'Repeated fixed uploads' },
  { id: 'append' as const, label: 'Append Stream', desc: 'Continuous data growth' }
]

export const ScenarioControls = memo(({
  pattern,
  uploadSize,
  frequency,
  retention,
  onPatternChange,
  onUploadSizeChange,
  onFrequencyChange,
  onRetentionChange
}: ScenarioControlsProps) => {
  const handlePatternClick = useCallback((id: TrafficPattern) => {
    onPatternChange(id)
  }, [onPatternChange])

  const handleUploadSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUploadSizeChange(Number(e.target.value))
  }, [onUploadSizeChange])

  const handleFrequencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFrequencyChange(Number(e.target.value))
  }, [onFrequencyChange])

  const handleRetentionClick = useCallback((type: StorageClass) => {
    onRetentionChange(type)
  }, [onRetentionChange])

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <label className="block text-xs font-bold text-gray-500 uppercase">Traffic Pattern</label>
        <div className="flex flex-col gap-2">
          {PATTERN_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handlePatternClick(opt.id)}
              className={`flex items-center justify-between p-3 border rounded-sm text-left transition-all ${
                pattern === opt.id 
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={`text-sm font-medium ${pattern === opt.id ? 'text-blue-900' : 'text-gray-700'}`}>{opt.label}</span>
              {pattern === opt.id && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold text-gray-500 uppercase">Upload Size</label>
        <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input 
            type="number" 
            value={uploadSize}
            onChange={handleUploadSizeChange}
            className="w-full p-2 text-sm font-mono text-gray-900 outline-none"
          />
          <div className="bg-gray-100 px-3 py-2 border-l border-gray-300 text-xs font-mono text-gray-500">GB</div>
        </div>
      </div>

      {pattern === 'periodic' && (
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-500 uppercase">Frequency (Epochs)</label>
          <select 
            value={frequency}
            onChange={handleFrequencyChange}
            className="w-full p-2 text-sm font-mono text-gray-900 bg-white border border-gray-300 rounded-sm outline-none focus:border-blue-600"
          >
            <option value={1}>Every Epoch</option>
            <option value={7}>Every 7 Epochs</option>
            <option value={30}>Every 30 Epochs</option>
          </select>
        </div>
      )}

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="block text-xs font-bold text-gray-500 uppercase">Comparison Target</label>
        <div className="flex rounded-sm border border-gray-200 overflow-hidden">
          <button 
            onClick={() => handleRetentionClick('deletable')}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${retention === 'deletable' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            Standard
          </button>
          <button 
            onClick={() => handleRetentionClick('permanent')}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${retention === 'permanent' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            Permanent
          </button>
        </div>
        <p className="text-[10px] text-gray-400">
          {retention === 'deletable' 
            ? 'Comparing Standard Storage vs Permanent Buy-in' 
            : 'Comparing Permanent Buy-in vs Standard Rent'}
        </p>
      </div>
    </div>
  )
})

ScenarioControls.displayName = 'ScenarioControls'