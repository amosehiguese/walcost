import type { CostEstimate, StorageClass, ChartDataPoint, TrafficPattern } from '@/types'

const WAL_PER_MB_EPOCH = 0.002
const PERMANENT_MULTIPLIER = 5.0
const SUI_BASE_FEE = 0.004

export function calculateCost(
  blobSize: number,
  sizeUnit: 'MB' | 'GB',
  storageType: StorageClass,
  duration: number,
  durationUnit: 'days' | 'epochs'
): CostEstimate {
  const sizeInMB = sizeUnit === 'GB' ? blobSize * 1024 : blobSize
  const durationInEpochs = durationUnit === 'days' ? duration : duration

  let baseWal = sizeInMB * durationInEpochs * WAL_PER_MB_EPOCH

  if (storageType === 'permanent') {
    baseWal = sizeInMB * (PERMANENT_MULTIPLIER * 100)
  }

  const minWal = baseWal * 0.92
  const maxWal = baseWal * 1.08
  const suiGas = SUI_BASE_FEE + (sizeInMB * 0.00001)

  return {
    totalWal: baseWal,
    minWal,
    maxWal,
    suiGas,
    costPerEpoch: storageType === 'permanent' ? 0 : (baseWal / durationInEpochs),
    sizeInMB
  }
}

export function generateChartData(
  pattern: TrafficPattern,
  uploadSize: number,
  frequency: number,
  retention: StorageClass
): { data: ChartDataPoint[], breakEvenIndex: number } {
  const points: ChartDataPoint[] = []
  const maxEpochs = 50
  const permanentCostMultiplier = 50

  let currentDeletableCost = 0
  let currentPermanentCost = 0

  for (let i = 0; i <= maxEpochs; i++) {
    let newData = 0
    if (pattern === 'single' && i === 0) newData = uploadSize
    if (pattern === 'periodic' && i % frequency === 0) newData = uploadSize
    if (pattern === 'append') newData = uploadSize

    const storedData = pattern === 'single' 
      ? uploadSize 
      : (pattern === 'periodic' 
        ? uploadSize * (Math.floor(i/frequency) + 1) 
        : uploadSize * (i+1))

    if (retention === 'deletable') {
      currentDeletableCost += storedData * 0.05
    } else {
      if (pattern === 'single' && i === 0) currentPermanentCost += uploadSize * permanentCostMultiplier
      else if (pattern === 'periodic' && i % frequency === 0) currentPermanentCost += uploadSize * permanentCostMultiplier
      else if (pattern === 'append') currentPermanentCost += uploadSize * permanentCostMultiplier
    }

    points.push({
      x: i,
      y: retention === 'deletable' ? currentDeletableCost : currentPermanentCost,
      comparisonY: retention === 'deletable' 
        ? (pattern === 'single' ? uploadSize * permanentCostMultiplier : (points[i-1]?.comparisonY || 0) + (newData ? newData * permanentCostMultiplier : 0))
        : (pattern === 'single' ? i * uploadSize * 0.05 : (points[i-1]?.comparisonY || 0) + storedData * 0.05)
    })
  }

  const breakEvenIndex = points.findIndex(p => p.y > p.comparisonY)
  
  return { data: points, breakEvenIndex }
}