import { create } from 'zustand'
import type { StorageClass, SizeUnit, DurationUnit } from '@/types'

interface EstimatorState {
  blobSize: number
  sizeUnit: SizeUnit
  storageClass: StorageClass
  duration: number
  durationUnit: DurationUnit

  setBlobSize: (size: number) => void
  setSizeUnit: (unit: SizeUnit) => void
  setStorageClass: (type: StorageClass) => void
  setDuration: (duration: number) => void
  setDurationUnit: (unit: DurationUnit) => void
}

export const useEstimatorStore = create<EstimatorState>((set) => ({
  blobSize: 100,
  sizeUnit: 'MB',
  storageClass: 'deletable',
  duration: 30,
  durationUnit: 'days',

  setBlobSize: (size) => set({ blobSize: size }),
  setSizeUnit: (unit) => set({ sizeUnit: unit }),
  setStorageClass: (type) => set({ storageClass: type }),
  setDuration: (duration) => set({ duration }),
  setDurationUnit: (unit) => set({ durationUnit: unit }),
}))