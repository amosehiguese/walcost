import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { TrendingUp, BarChart3 } from 'lucide-react'
import { useAnalyzerStore } from '@/stores/analyzerStore'
import { generateChartData } from '@/lib/calculations'
import { CostChart } from '@/components/analyzer/CostChart'
import { ScenarioControls } from '@/components/analyzer/ScenarioControls'
import { BreakEvenMarker } from '@/components/analyzer/BreakEvenMarker'

export const Route = createFileRoute('/analyzer')({
  component: AnalyzerPage,
})

function AnalyzerPage() {
  const {
    pattern,
    uploadSize,
    frequency,
    retention,
    setPattern,
    setUploadSize,
    setFrequency,
    setRetention,
  } = useAnalyzerStore()

  const { chartData, breakEvenIndex } = useMemo(() => {
    const result = generateChartData(pattern, uploadSize, frequency, retention)
    return { chartData: result.data, breakEvenIndex: result.breakEvenIndex }
  }, [pattern, uploadSize, frequency, retention])

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 md:divide-x md:divide-gray-200 h-full overflow-hidden">
      <section className="bg-gray-50/50 p-6 md:p-10 md:col-span-8 order-first md:order-last flex flex-col h-[50vh] md:h-auto border-b md:border-b-0 border-gray-200 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <TrendingUp className="w-3 h-3" />
            <span>Projected Cost Over Time (50 Epochs)</span>
          </div>
          <BreakEvenMarker breakEvenIndex={breakEvenIndex} />
        </div>

        <CostChart 
          chartData={chartData} 
          breakEvenIndex={breakEvenIndex} 
          retention={retention} 
        />
      </section>

      <section className="p-6 md:p-10 md:col-span-4 space-y-8 md:overflow-y-auto bg-white z-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">
          <BarChart3 className="w-3 h-3" />
          <span>Scenario Parameters</span>
        </div>

        <ScenarioControls
          pattern={pattern}
          uploadSize={uploadSize}
          frequency={frequency}
          retention={retention}
          onPatternChange={setPattern}
          onUploadSizeChange={setUploadSize}
          onFrequencyChange={setFrequency}
          onRetentionChange={setRetention}
        />
      </section>
    </div>
  )
}