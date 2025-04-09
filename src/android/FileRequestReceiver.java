package com.darryncampbell.cordova.plugin.intent;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class FileRequestReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("FileRequestReceiver", "Received broadcast while app is closed!");

        if ("outsystems.dohle.FILO.GET_DB_FILE".equals(intent.getAction())) {
            // Start MainActivity (cold start the app)
            Intent launchIntent = new Intent(context, MainActivity.class);
            launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            launchIntent.putExtra("triggeredBy", "receiver");
            context.startActivity(launchIntent);
        }
    }
}
