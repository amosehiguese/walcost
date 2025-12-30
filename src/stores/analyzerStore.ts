import { create } from 'zustand'
import type { TrafficPattern, StorageClass } from '@/types'

interface AnalyzerState {
  pattern: TrafficPattern
  uploadSize: number
  frequency: number
  retention: StorageClass

  setPattern: (pattern: TrafficPattern) => void
  setUploadSize: (size: number) => void
  setFrequency: (frequency: number) => void
  setRetention: (retention: StorageClass) => void
}

export const useAnalyzerStore = create<AnalyzerState>((set) => ({
  pattern: 'periodic',
  uploadSize: 10,
  frequency: 1,
  retention: 'deletable',

  setPattern: (pattern) => set({ pattern }),
  setUploadSize: (size) => set({ uploadSize: size }),
  setFrequency: (frequency) => set({ frequency }),
  setRetention: (retention) => set({ retention }),
}))