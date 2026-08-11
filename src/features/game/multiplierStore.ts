import { useSyncExternalStore } from 'react';

type Listener = () => void;

let currentMultiplier = 1;
const listeners = new Set<Listener>();

const subscribe = (listener: Listener) => {
  listeners.add(listener);

  return () => listeners.delete(listener);
};

const getSnapshot = () => currentMultiplier;

export const setCurrentMultiplier = (multiplier: number) => {
  if (!Number.isFinite(multiplier) || multiplier < 1 || multiplier === currentMultiplier) {
    return;
  }

  currentMultiplier = multiplier;
  listeners.forEach((listener) => listener());
};

export const useCurrentMultiplier = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
