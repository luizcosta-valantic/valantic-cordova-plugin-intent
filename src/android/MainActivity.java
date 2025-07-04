package com.darryncampbell.cordova.plugin.intent;

import android.os.Bundle;
import org.apache.cordova.*;

public class MainActivity extends CordovaActivity {
    public static boolean isInForeground = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadUrl(launchUrl);
    }

    @Override
    protected void onResume() {
        super.onResume();
        isInForeground = true;
    }

    @Override
    protected void onPause() {
        super.onPause();
        isInForeground = false;
    }
}
