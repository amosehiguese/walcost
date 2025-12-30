import { memo, useMemo } from 'react'
import type { ChartDataPoint, StorageClass } from '@/types'

interface CostChartProps {
  chartData: ChartDataPoint[]
  breakEvenIndex: number
  retention: StorageClass
}

export const CostChart = memo(({ chartData, breakEvenIndex, retention }: CostChartProps) => {
  const { pointsString, compareString, maxY, getX, getY } = useMemo(() => {
    const width = 800
    const height = 400
    const padding = 40
    const maxY = Math.max(...chartData.map(d => Math.max(d.y, d.comparisonY))) * 1.1
    
    const getX = (epoch: number) => padding + (epoch / 50) * (width - 2 * padding)
    const getY = (val: number) => height - padding - (val / maxY) * (height - 2 * padding)

    const pointsString = chartData.map(p => `${getX(p.x)},${getY(p.y)}`).join(' ')
    const compareString = chartData.map(p => `${getX(p.x)},${getY(p.comparisonY)}`).join(' ')

    return { pointsString, compareString, maxY, getX, getY, width, height, padding }
  }, [chartData])

  const width = 800
  const height = 400
  const padding = 40

  const strokeColor = useMemo(() => {
    if (breakEvenIndex !== -1 && retention === 'deletable' && chartData[49].y > chartData[49].comparisonY) {
      return '#ef4444'
    }
    return '#2563eb'
  }, [breakEvenIndex, retention, chartData])

  return (
    <div className="flex-1 w-full h-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {[0, 0.25, 0.5, 0.75, 1].map(tick => (
          <line 
            key={tick} 
            x1={padding} 
            y1={getY(maxY * tick)} 
            x2={width - padding} 
            y2={getY(maxY * tick)} 
            stroke="#e5e7eb" 
            strokeWidth="1" 
          />
        ))}

        <polyline 
          points={compareString} 
          fill="none" 
          stroke="#d1d5db" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />

        <polyline 
          points={pointsString} 
          fill="none" 
          stroke={strokeColor} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />

        {breakEvenIndex !== -1 && (
          <>
            <circle 
              cx={getX(breakEvenIndex)} 
              cy={getY(chartData[breakEvenIndex].y)} 
              r="6" 
              fill="#f59e0b" 
              stroke="white" 
              strokeWidth="2"
            />
            <text 
              x={getX(breakEvenIndex)} 
              y={getY(chartData[breakEvenIndex].y) - 15} 
              textAnchor="middle" 
              className="text-xs font-mono fill-amber-600 font-bold"
            >
              X
            </text>
          </>
        )}

        <text x={padding} y={height - 10} className="text-xs fill-gray-400 font-mono">Epoch 0</text>
        <text x={width - padding} y={height - 10} textAnchor="end" className="text-xs fill-gray-400 font-mono">Epoch 50</text>
      </svg>
    </div>
  )
})

CostChart.displayName = 'CostChart'