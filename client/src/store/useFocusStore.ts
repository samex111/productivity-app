import { create } from 'zustand';

interface FocusState {
  isFocusMode: boolean;
  blockedApps: string[];
  sessionTimeLeft: number;
  totalFocusTime: number;
  setFocusMode: (isActive: boolean) => void;
  setBlockedApps: (apps: string[]) => void;
  updateSessionTimeLeft: (time: number) => void;
  addFocusTime: (time: number) => void;
}

export const useFocusStore = create<FocusState>((set) => ({
  isFocusMode: false,
  blockedApps: ['com.android.chrome', 'com.google.android.youtube'],
  sessionTimeLeft: 1500, // 25 mins
  totalFocusTime: 0,
  setFocusMode: (isActive) => set({ isFocusMode: isActive }),
  setBlockedApps: (apps) => set({ blockedApps: apps }),
  updateSessionTimeLeft: (time) => set({ sessionTimeLeft: time }),
  addFocusTime: (time) => set((state) => ({ totalFocusTime: state.totalFocusTime + time })),
}));
