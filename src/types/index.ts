export type StorageClass = 'deletable' | 'permanent'
export type SizeUnit = 'MB' | 'GB'
export type DurationUnit = 'days' | 'epochs'
export type TrafficPattern = 'single' | 'periodic' | 'append'

export interface CostEstimate {
  totalWal: number
  minWal: number
  maxWal: number
  suiGas: number
  costPerEpoch: number
  sizeInMB: number
}

export interface ChartDataPoint {
  x: number
  y: number
  comparisonY: number
}

export interface RawMeasurement {
  id: string
  size: string
  class: string
  epochs: string | number
  wal: string
  gas: string
}