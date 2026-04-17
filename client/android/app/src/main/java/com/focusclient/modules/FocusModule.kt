package com.focusclient.modules

import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.provider.Settings
import com.facebook.react.bridge.*
import com.focusclient.services.FocusAccessibilityService
import java.util.Calendar

class FocusModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "FocusModule"
    }

    @ReactMethod
    fun openAccessibilitySettings() {
        val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
    }

    @ReactMethod
    fun openUsageAccessSettings() {
        val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
    }

    @ReactMethod
    fun setFocusMode(isEnabled: Boolean, blockedAppsArray: ReadableArray, promise: Promise) {
        try {
            FocusAccessibilityService.isFocusModeOn = isEnabled
            
            val appsList = mutableListOf<String>()
            for (i in 0 until blockedAppsArray.size()) {
                blockedAppsArray.getString(i)?.let { appsList.add(it) }
            }
            
            FocusAccessibilityService.blockedApps.clear()
            FocusAccessibilityService.blockedApps.addAll(appsList)
            
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("FOCUS_ERROR", e.message)
        }
    }

    @ReactMethod
    fun getUsageStats(promise: Promise) {
        try {
            val usageStatsManager = reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
            val calendar = Calendar.getInstance()
            calendar.add(Calendar.DAY_OF_YEAR, -1)
            val start = calendar.timeInMillis
            val end = System.currentTimeMillis()

            val stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, start, end)
            
            val resultMap = WritableNativeMap()
            stats?.forEach { stat ->
                if (stat.totalTimeInForeground > 0) {
                    resultMap.putDouble(stat.packageName, stat.totalTimeInForeground.toDouble())
                }
            }
            promise.resolve(resultMap)
        } catch (e: Exception) {
            promise.reject("USAGE_ERROR", e.message)
        }
    }
}
