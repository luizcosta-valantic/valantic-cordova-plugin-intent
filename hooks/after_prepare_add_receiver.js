module.exports = function (context) {
    const fs = require('fs');
    const path = require('path');

    const manifestPath = path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
    let manifest = fs.readFileSync(manifestPath, 'utf8');

    // 1️⃣ Receiver block
    const receiverDeclaration = `
        <receiver android:exported="true" android:name="com.darryncampbell.cordova.plugin.intent.MyBroadcastReceiver">
            <intent-filter>
                <action android:name="com.symbol.datawedge.api.RESULT_ACTION" />
                <action android:name="com.dohle.outsystems.SCAN_RESULT" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </receiver>
    `;

    if (!manifest.includes("MyBroadcastReceiver")) {
        manifest = manifest.replace(/<\/application>/, receiverDeclaration + "\n</application>");
        console.log('✅ MyBroadcastReceiver added to AndroidManifest.xml');
    } else {
        console.log('ℹ️ MyBroadcastReceiver already exists in AndroidManifest.xml');
    }

    // 2️⃣ Provider block
    const providerDeclaration = `
        <provider
            android:name="com.darryncampbell.cordova.plugin.intent.CordovaPluginIntentFileProvider"
            android:authorities="\${applicationId}.darryncampbell.cordova.plugin.intent.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/provider_paths"/>
        </provider>
    `;

    if (!manifest.includes("CordovaPluginIntentFileProvider")) {
        manifest = manifest.replace(/<\/application>/, providerDeclaration + "\n</application>");
        console.log('✅ CordovaPluginIntentFileProvider added to AndroidManifest.xml');
    } else {
        console.log('ℹ️ CordovaPluginIntentFileProvider already exists in AndroidManifest.xml');
    }

    // Write the updated manifest
    fs.writeFileSync(manifestPath, manifest);
};
