import { performance } from 'node:perf_hooks';

export const calculateDuration = (startTime: number) =>
  Math.round(((performance.now() - startTime) / 1000) * 100) / 100;
