import { NativeModules } from 'react-native';

const { FocusModule } = NativeModules;

export const openAccessibilitySettings = () => {
  FocusModule.openAccessibilitySettings();
};

export const openUsageAccessSettings = () => {
  FocusModule.openUsageAccessSettings();
};

export const setFocusMode = async (isEnabled: boolean, blockedApps: string[]): Promise<boolean> => {
  return await FocusModule.setFocusMode(isEnabled, blockedApps);
};

export const getUsageStats = async (): Promise<Record<string, number>> => {
  return await FocusModule.getUsageStats();
};
