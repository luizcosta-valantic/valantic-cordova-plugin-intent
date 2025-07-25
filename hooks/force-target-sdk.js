const fs = require('fs');
const path = require('path');

module.exports = function (context) {
    const gradlePath = path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'build.gradle');
    
    if (fs.existsSync(gradlePath)) {
        let gradleContent = fs.readFileSync(gradlePath, 'utf8');
        
        gradleContent = gradleContent.replace(/targetSdkVersion\s+\d+/g, 'targetSdkVersion 26');
        
        fs.writeFileSync(gradlePath, gradleContent);
        console.log("✅ targetSdkVersion set to 26");
    } else {
        console.warn("⚠️ build.gradle not found. Cannot set targetSdkVersion.");
    }
};
