package com.darryncampbell.cordova.plugin.intent;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONObject;

import com.darryncampbell.cordova.plugin.intent.IntentShim;
import com.darryncampbell.cordova.plugin.intent.MainActivity;

public class MyBroadcastReceiver extends BroadcastReceiver {
    public static CallbackContext callbackContext;

    @Override
    public void onReceive(Context context, Intent intent) {
        if (!MainActivity.isInForeground) {
            Log.d("MyBroadcastReceiver", "App em background. Ignorando intent.");
            return;
        }

        Log.d("MyBroadcastReceiver", "Received broadcast: " + intent.getAction());
        Log.d("MyBroadcastReceiver", "Received broadcast: " + intent.toString());

        if (!MainActivity.isInForeground) {
            Log.d("MyBroadcastReceiver", "App in background. Ignoring intent.");
            return;
        }

        if (IntentShim.broadcastCallbackContext != null && intent != null) {
            try {
                if (intent.getAction() != null &&
                    (intent.getAction().equals("com.symbol.datawedge.api.RESULT_ACTION") || intent.getAction().equals("com.dohle.outsystems.SCAN_RESULT"))) {
                    JSONObject intentJson = new JSONObject();
                    intentJson.put("action", intent.getAction());

                    Bundle extras = intent.getExtras();
                    if (extras != null) {
                        JSONObject extrasJson = new JSONObject();
                        for (String key : extras.keySet()) {
                            Object value = extras.get(key);
                            extrasJson.put(key, value != null ? value.toString() : JSONObject.NULL);
                        }
                        intentJson.put("extras", extrasJson);
                    }

                    PluginResult result = new PluginResult(PluginResult.Status.OK, intentJson);
                    result.setKeepCallback(true);
                    IntentShim.broadcastCallbackContext.sendPluginResult(result);
                }
            } catch (Exception e) {
                Log.e("MyBroadcastReceiver", "Error parsing intent", e);
            }
        }
    }

    
}
