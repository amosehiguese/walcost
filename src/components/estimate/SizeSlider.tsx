import { memo, useCallback } from 'react'
import type { SizeUnit } from '@/types'

interface SizeSliderProps {
  blobSize: number
  sizeUnit: SizeUnit
  onSizeChange: (size: number) => void
  onUnitChange: (unit: SizeUnit) => void
}

export const SizeSlider = memo(({ blobSize, sizeUnit, onSizeChange, onUnitChange }: SizeSliderProps) => {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSizeChange(Number(e.target.value))
  }, [onSizeChange])

  const handleRangeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSizeChange(Number(e.target.value))
  }, [onSizeChange])

  const handleUnitClick = useCallback((unit: SizeUnit) => {
    onUnitChange(unit)
  }, [onUnitChange])

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Blob Size</label>
      <div className="flex items-center gap-0 border border-gray-300 rounded-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all">
        <input 
          type="number" 
          value={blobSize}
          onChange={handleInputChange}
          className="w-full p-3 text-lg font-mono text-gray-900 outline-none placeholder-gray-300"
        />
        <div className="flex border-l border-gray-200 bg-gray-50">
          <button 
            onClick={() => handleUnitClick('MB')}
            className={`px-3 py-3 text-xs font-medium transition-colors ${sizeUnit === 'MB' ? 'text-blue-700 bg-blue-50' : 'text-gray-500 hover:text-gray-900'}`}
          >
            MB
          </button>
          <button 
            onClick={() => handleUnitClick('GB')}
            className={`px-3 py-3 text-xs font-medium transition-colors ${sizeUnit === 'GB' ? 'text-blue-700 bg-blue-50' : 'text-gray-500 hover:text-gray-900'}`}
          >
            GB
          </button>
        </div>
      </div>
      
      <input 
        type="range" 
        min="1" 
        max="1000" 
        value={blobSize} 
        onChange={handleRangeChange}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
      />
      <div className="flex justify-between text-xs text-gray-400 font-mono">
        <span>1 MB</span>
        <span>1000 {sizeUnit}</span>
      </div>
    </div>
  )
})

SizeSlider.displayName = 'SizeSlider'