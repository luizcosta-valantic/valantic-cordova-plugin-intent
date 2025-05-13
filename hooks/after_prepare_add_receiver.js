module.exports = function (context) {
    const fs = require('fs');
    const path = require('path');

    const manifestPath = path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
    let manifest = fs.readFileSync(manifestPath, 'utf8');

    // <receiver android:exported="true" android:name="com.darryncampbell.cordova.plugin.intent.MyBroadcastReceiver">
    const receiverDeclaration = `
        <receiver android:exported="true" android:name=".MyBroadcastReceiver">
            <intent-filter>
                <action android:name="com.symbol.datawedge.api.RESULT_ACTION" />
                <action android:name="com.dohle.outsystems.SCAN_RESULT" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </receiver>
    `;

    if (!manifest.includes("MyBroadcastReceiver")) {
        manifest = manifest.replace(/<\/application>/, receiverDeclaration + "\n</application>");
        fs.writeFileSync(manifestPath, manifest);
        console.log('✅ MyBroadcastReceiver added to AndroidManifest.xml');
    }
};