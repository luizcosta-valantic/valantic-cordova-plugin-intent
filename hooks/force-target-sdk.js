const fs = require('fs');
const path = require('path');

module.exports = function (context) {
    // 1️⃣ Modify build.gradle
    const gradlePath = path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'build.gradle');
    if (fs.existsSync(gradlePath)) {
        let gradleContent = fs.readFileSync(gradlePath, 'utf8');
        gradleContent = gradleContent
            .replace(/targetSdkVersion\s+\d+/g, 'targetSdkVersion 19')
            .replace(/minSdkVersion\s+\d+/g, 'minSdkVersion 8');
        fs.writeFileSync(gradlePath, gradleContent, 'utf8');
        console.log('✅ Patched build.gradle: targetSdkVersion=19, minSdkVersion=8');
    } else {
        console.warn('⚠️ build.gradle not found, cannot update SDK versions there.');
    }

    // 2️⃣ Modify AndroidManifest.xml
    const manifestPath = path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
    if (fs.existsSync(manifestPath)) {
        let manifest = fs.readFileSync(manifestPath, 'utf8');

        const usesSdkBlock = `<uses-sdk android:minSdkVersion="8" android:targetSdkVersion="19" />`;

        if (!manifest.includes('<uses-sdk')) {
            manifest = manifest.replace(/<manifest[^>]*>/, match => `${match}\n    ${usesSdkBlock}`);
            fs.writeFileSync(manifestPath, manifest, 'utf8');
            console.log('✅ Injected <uses-sdk> block into AndroidManifest.xml');
        } else {
            console.log('ℹ️ <uses-sdk> already present in AndroidManifest.xml, no change made');
        }
    } else {
        console.warn('⚠️ AndroidManifest.xml not found, cannot inject <uses-sdk>');
    }
};
