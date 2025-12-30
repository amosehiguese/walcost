import { memo, useCallback } from 'react'
import type { DurationUnit, StorageClass } from '@/types'

interface DurationSelectorProps {
  duration: number
  durationUnit: DurationUnit
  storageType: StorageClass
  onDurationChange: (duration: number) => void
  onDurationUnitChange: (unit: DurationUnit) => void
}

export const DurationSelector = memo(({ 
  duration, 
  durationUnit, 
  storageType, 
  onDurationChange, 
  onDurationUnitChange 
}: DurationSelectorProps) => {
  const handleDurationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onDurationChange(Number(e.target.value))
  }, [onDurationChange])

  const handleUnitClick = useCallback((unit: DurationUnit) => {
    onDurationUnitChange(unit)
  }, [onDurationUnitChange])

  return (
    <div className={`space-y-3 pt-4 transition-opacity duration-300 ${storageType === 'permanent' ? 'opacity-40 pointer-events-none grayscale' : 'opacity-100'}`}>
      <div className="flex justify-between items-end">
        <label className="block text-sm font-medium text-gray-700">Duration</label>
      </div>
      
      <div className="flex items-center gap-0 border border-gray-300 rounded-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all">
        <input 
          type="number" 
          value={duration}
          onChange={handleDurationChange}
          className="w-full p-3 text-lg font-mono text-gray-900 outline-none"
        />
        <div className="flex border-l border-gray-200 bg-gray-50">
          <button 
            onClick={() => handleUnitClick('days')}
            className={`px-4 py-3 text-xs font-medium transition-colors ${durationUnit === 'days' ? 'text-blue-700 bg-blue-50' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Days
          </button>
          <button 
            onClick={() => handleUnitClick('epochs')}
            className={`px-4 py-3 text-xs font-medium transition-colors ${durationUnit === 'epochs' ? 'text-blue-700 bg-blue-50' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Epochs
          </button>
        </div>
      </div>
    </div>
  )
})

DurationSelector.displayName = 'DurationSelector'