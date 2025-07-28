module.exports = function (context) {
    const fs = require('fs');
    const path = require('path');

    const manifestPath = path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
    let manifest = fs.readFileSync(manifestPath, 'utf8');

    const receiverDeclaration = `
        <receiver android:exported="true" android:enabled="true" android:name="com.darryncampbell.cordova.plugin.intent.MyBroadcastReceiver">
             <intent-filter>
                <action android:name="com.symbol.datawedge.api.RESULT_ACTION" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
            <intent-filter>
                <action android:name="com.valantic.outsystems.SCAN_RESULT" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </receiver>
    `;

    const batteryPermission = `<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" />`;

    if (!manifest.includes('android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS')) {
        // Insert just after the <manifest ...> tag
        manifest = manifest.replace(/<manifest[^>]*>/, match => `${match}\n    ${batteryPermission}`);
        console.log('✅ Added android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS to AndroidManifest.xml');
    } else {
        console.log('ℹ️ Battery optimization permission already present in AndroidManifest.xml');
    }

    if (!manifest.includes("MyBroadcastReceiver")) {
        manifest = manifest.replace(/<\/application>/, receiverDeclaration + "\n</application>");
        console.log('✅ MyBroadcastReceiver added to AndroidManifest.xml');
    } else {
        console.log('ℹ️ MyBroadcastReceiver already exists in AndroidManifest.xml');
    }
    
    // Queries block
    const queryBlock = `
    <intent>
        <action android:name="com.symbol.datawedge.api.RESULT_ACTION" />
        <data android:scheme="*"/>
    </intent>
    <intent>
        <action android:name="com.valantic.outsystems.SCAN_RESULT" />
        <data android:scheme="*"/>
    </intent>
    `;
/*
    if (manifest.includes('<queries>')) {
        // Add intent block just before </queries>
        manifest = manifest.replace('</queries>', queryBlock + '\n</queries>');
        console.log("🔍 Custom queries added inside <queries>.");
    } else {
        // No <queries> block found, create one before </manifest>
        manifest = manifest.replace('</manifest>', `<queries>${queryBlock}\n</queries>\n</manifest>`);
        console.log("📁 Created <queries> block and added custom intent queries.");
    }*/

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
