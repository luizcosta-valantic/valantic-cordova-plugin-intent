package com.darryncampbell.cordova.plugin.intent;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Build;

public class AppStateUtils {

    public static boolean isAppInForeground(Context context) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        String packageName = context.getPackageName();

        if (activityManager == null) return false;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            for (ActivityManager.AppTask task : activityManager.getAppTasks()) {
                if (task.getTaskInfo().topActivity != null &&
                    task.getTaskInfo().topActivity.getPackageName().equals(packageName)) {
                    return true;
                }
            }
        } else {
            for (ActivityManager.RunningAppProcessInfo processInfo : activityManager.getRunningAppProcesses()) {
                if (processInfo.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    processInfo.processName.equals(packageName)) {
                    return true;
                }
            }
        }

        return false;
    }
}