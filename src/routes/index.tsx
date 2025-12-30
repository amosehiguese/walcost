import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Database, Server, HelpCircle } from 'lucide-react'
import { useEstimatorStore } from '@/stores/estimatorStore'
import { calculateCost } from '@/lib/calculations'
import { SizeSlider } from '@/components/estimate/SizeSlider'
import { StorageToggle } from '@/components/estimate/StorageToggle'
import { DurationSelector } from '@/components/estimate/DurationSelector'
import { CostSummaryCard } from '@/components/estimate/CostSummaryCard'
import { ConfidenceRange } from '@/components/estimate/ConfidenceRange'

export const Route = createFileRoute('/')({
  component: EstimatePage,
})

function EstimatePage() {
  const {
    blobSize,
    sizeUnit,
    storageClass,
    duration,
    durationUnit,
    setBlobSize,
    setSizeUnit,
    setStorageClass,
    setDuration,
    setDurationUnit,
  } = useEstimatorStore()

  const estimate = useMemo(() => {
    return calculateCost(blobSize, sizeUnit, storageClass, duration, durationUnit)
  }, [blobSize, sizeUnit, storageClass, duration, durationUnit])

  return (
    <div className="md:grid md:grid-cols-12 md:divide-x md:divide-gray-200 h-full">
      <section className="p-6 md:p-10 md:col-span-5 lg:col-span-4 space-y-10 md:overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            <Database className="w-3 h-3" />
            <span>Storage Configuration</span>
          </div>

          <SizeSlider
            blobSize={blobSize}
            sizeUnit={sizeUnit}
            onSizeChange={setBlobSize}
            onUnitChange={setSizeUnit}
          />

          <StorageToggle
            storageType={storageClass}
            onStorageTypeChange={setStorageClass}
          />

          <DurationSelector
            duration={duration}
            durationUnit={durationUnit}
            storageType={storageClass}
            onDurationChange={setDuration}
            onDurationUnitChange={setDurationUnit}
          />
        </div>
      </section>

      <section className="bg-gray-50/50 p-6 md:p-10 md:col-span-7 lg:col-span-8 flex flex-col">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-8">
          <Server className="w-3 h-3" />
          <span>Cost Estimation</span>
        </div>

        <div className="mb-10">
          <div className="flex items-baseline gap-1 mb-2">
            <h2 className="text-sm font-medium text-gray-500">Total Estimated Cost</h2>
          </div>
          
          <div className="flex items-baseline gap-4">
            <span className="text-6xl md:text-7xl font-mono font-bold text-gray-900 tracking-tighter">
              {estimate.totalWal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-2xl font-bold text-gray-400">WAL</span>
          </div>

          <ConfidenceRange minWal={estimate.minWal} maxWal={estimate.maxWal} />
        </div>

        <div className="h-px bg-gray-200 w-full mb-8"></div>

        <CostSummaryCard estimate={estimate} storageType={storageClass} />

        <div className="mt-auto pt-10">
          <div className="bg-white border border-gray-200 p-4 rounded-sm flex gap-4 items-start">
            <HelpCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm text-gray-900 font-medium">Need precision?</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                This tool provides a rapid estimation for budgeting. Actual storage costs are determined by the Storage Fund exchange rate at the exact moment of the transaction execution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}