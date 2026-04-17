import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useFocusStore } from '../../../store/useFocusStore';
import { setFocusMode, openAccessibilitySettings, openUsageAccessSettings } from '../services/FocusNative';
import BackgroundTimer from 'react-native-background-timer';

export const FocusScreen = () => {
  const { isFocusMode, blockedApps, sessionTimeLeft, setFocusMode: setGlobalFocusMode, updateSessionTimeLeft } = useFocusStore();
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (timerRunning) {
      BackgroundTimer.runBackgroundTimer(() => {
        if (sessionTimeLeft > 0) {
          updateSessionTimeLeft(sessionTimeLeft - 1);
        } else {
          stopFocus();
        }
      }, 1000);
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerRunning, sessionTimeLeft]);

  const startFocus = async () => {
    try {
      await setFocusMode(true, blockedApps);
      setGlobalFocusMode(true);
      setTimerRunning(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopFocus = async () => {
    try {
      await setFocusMode(false, []);
      setGlobalFocusMode(false);
      setTimerRunning(false);
    } catch (e) {
      console.error(e);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Focus Engine</Text>
      
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(sessionTimeLeft)}</Text>
      </View>

      {!isFocusMode ? (
        <TouchableOpacity style={styles.button} onPress={startFocus}>
          <Text style={styles.buttonText}>Start Focus Session</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopFocus}>
          <Text style={styles.buttonText}>Stop Focus</Text>
        </TouchableOpacity>
      )}

      <View style={styles.permissionsContainer}>
        <Text style={styles.subtitle}>Permissions Required (Android)</Text>
        <TouchableOpacity style={styles.outlineButton} onPress={openAccessibilitySettings}>
          <Text style={styles.outlineButtonText}>Enable Accessibility Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineButton} onPress={openUsageAccessSettings}>
          <Text style={styles.outlineButtonText}>Enable Usage Access</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 40 },
  timerContainer: { 
    width: 250, height: 250, borderRadius: 125, 
    borderWidth: 8, borderColor: '#6C63FF',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 50
  },
  timer: { fontSize: 56, fontWeight: 'bold', color: '#fff' },
  button: { backgroundColor: '#6C63FF', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  stopButton: { backgroundColor: '#FF6584' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  permissionsContainer: { marginTop: 60, width: '100%' },
  subtitle: { color: '#aaa', marginBottom: 15, textAlign: 'center' },
  outlineButton: { 
    borderWidth: 1, borderColor: '#444', padding: 12, 
    borderRadius: 8, marginBottom: 10, alignItems: 'center' 
  },
  outlineButtonText: { color: '#ddd' }
});
