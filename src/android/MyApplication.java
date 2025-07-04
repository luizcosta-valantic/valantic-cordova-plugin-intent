package com.darryncampbell.cordova.plugin.intent;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

public class MyApplication extends Application {
    private static boolean isInForeground = false;

    public static boolean isAppInForeground() {
        return isInForeground;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
            private int activityReferences = 0;
            private boolean isActivityChangingConfigurations = false;

            @Override
            public void onActivityStarted(Activity activity) {
                if (++activityReferences == 1 && !isActivityChangingConfigurations) {
                    isInForeground = true;
                }
            }

            @Override
            public void onActivityStopped(Activity activity) {
                isActivityChangingConfigurations = activity.isChangingConfigurations();
                if (--activityReferences == 0 && !isActivityChangingConfigurations) {
                    isInForeground = false;
                }
            }

            // Outros métodos não são obrigatórios para esse caso:
            public void onActivityCreated(Activity a, Bundle b) {}
            public void onActivityResumed(Activity a) {}
            public void onActivityPaused(Activity a) {}
            public void onActivitySaveInstanceState(Activity a, Bundle b) {}
            public void onActivityDestroyed(Activity a) {}
        });
    }
}