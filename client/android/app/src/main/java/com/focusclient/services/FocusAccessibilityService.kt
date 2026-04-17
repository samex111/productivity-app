package com.focusclient.services

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import android.content.Intent

class FocusAccessibilityService : AccessibilityService() {

    companion object {
        private const val TAG = "FocusAccessibility"
        // In a real app, this list is synced from the React Native JS layer via a NativeModule SharedPreference
        val blockedApps = mutableListOf<String>()
        var isFocusModeOn = false
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (!isFocusModeOn) return

        if (event?.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val packageName = event.packageName?.toString() ?: return
            
            Log.d(TAG, "Window changed to: $packageName")
            
            if (blockedApps.contains(packageName)) {
                Log.d(TAG, "Blocked app launched: $packageName! Showing overlay.")
                showBlockOverlay(packageName)
            }
        }
    }

    override fun onInterrupt() {
        Log.d(TAG, "Service Interrupted")
    }

    override fun onServiceConnected() {
        super.onServiceConnected()
        Log.d(TAG, "Focus Accessibility Service Connected")
        val info = AccessibilityServiceInfo()
        info.eventTypes = AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED or AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC
        info.notificationTimeout = 100
        serviceInfo = info
    }

    private fun showBlockOverlay(packageName: String) {
        val intent = Intent(this, com.focusclient.MainActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            putExtra("BLOCKED_APP", packageName)
        }
        startActivity(intent)
    }
}
