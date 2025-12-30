import { memo, useCallback } from 'react'
import type { StorageClass } from '@/types'

interface StorageToggleProps {
  storageType: StorageClass
  onStorageTypeChange: (type: StorageClass) => void
}

export const StorageToggle = memo(({ storageType, onStorageTypeChange }: StorageToggleProps) => {
  const handleDeletableClick = useCallback(() => {
    onStorageTypeChange('deletable')
  }, [onStorageTypeChange])

  const handlePermanentClick = useCallback(() => {
    onStorageTypeChange('permanent')
  }, [onStorageTypeChange])

  return (
    <div className="space-y-3 pt-4">
      <label className="block text-sm font-medium text-gray-700">Storage Type</label>
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={handleDeletableClick}
          className={`group relative p-4 border rounded-sm text-left transition-all ${
            storageType === 'deletable' 
              ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600 z-10' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className={`w-3 h-3 rounded-full absolute top-4 right-4 ${storageType === 'deletable' ? 'bg-blue-500' : 'bg-gray-200'}`} />
          <span className="block text-sm font-semibold text-gray-900">Deletable</span>
          <span className="block text-xs text-gray-500 mt-1">Standard retention</span>
        </button>

        <button 
          onClick={handlePermanentClick}
          className={`group relative p-4 border rounded-sm text-left transition-all ${
            storageType === 'permanent' 
              ? 'border-purple-600 bg-purple-50/30 ring-1 ring-purple-600 z-10' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className={`w-3 h-3 rounded-full absolute top-4 right-4 ${storageType === 'permanent' ? 'bg-purple-500' : 'bg-gray-200'}`} />
          <span className="block text-sm font-semibold text-gray-900">Permanent</span>
          <span className="block text-xs text-gray-500 mt-1">Pay once, store forever</span>
        </button>
      </div>
    </div>
  )
})

StorageToggle.displayName = 'StorageToggle'