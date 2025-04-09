const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

module.exports = function (context) {
  const manifestPath = path.join(
  context.opts.projectRoot,
  'platforms',
  'android',
  'app',
  'src',
  'main',
  'AndroidManifest.xml'
);
  /*
  const manifestPath = path.join(
    context.opts.projectRoot,
    'platforms',
    'android',
    'app',
    'src',
    'main',
    'AndroidManifest.xml'
  );
  */

  if (!fs.existsSync(manifestPath)) {
    console.error("AndroidManifest.xml not found at expected location:", manifestPath);
    return;
  }

  const manifestXml = fs.readFileSync(manifestPath, 'utf-8');

  xml2js.parseString(manifestXml, (err, result) => {
    if (err) {
      console.error("Failed to parse AndroidManifest.xml:", err);
      return;
    }

    const app = result['manifest']['application'][0];

    // ✅ Ensure MainActivity is exported
    const mainActivities = app.activity.filter(a => a.$['android:name'] === 'app.outsystems.dohledev.RafaelSandbox.MainActivity');
    if (mainActivities.length > 0) {
      const mainActivity = mainActivities[0];
      mainActivity.$['android:exported'] = 'true';
      console.log("✅ Set android:exported=\"true\" on MainActivity");

      // ✅ Add intent-filter if not already present
      const filters = mainActivity['intent-filter'] || [];

      const alreadyPresent = filters.some(filter =>
        filter.action?.some(a => a.$['android:name'] === 'outsystems.dohle.FILO.GET_DB_FILE')
      );

      if (!alreadyPresent) {
        filters.push({
          action: [{ $: { 'android:name': 'outsystems.dohle.FILO.GET_DB_FILE' } }],
          category: [{ $: { 'android:name': 'android.intent.category.DEFAULT' } }]
        });
        mainActivity['intent-filter'] = filters;
        console.log("✅ Added intent-filter to MainActivity");
      }
    } else {
      console.warn("⚠️ MainActivity not found. Cannot modify.");
    }

    // ✅ Add broadcast receiver
    const receiverName = 'com.darryncampbell.cordova.plugin.intent.FileRequestReceiver';
    const existingReceiver = (app.receiver || []).find(r => r.$['android:name'] === receiverName);
    if (!existingReceiver) {
      app.receiver = app.receiver || [];
      app.receiver.push({
        $: {
          'android:name': receiverName,
          'android:exported': 'true',
          'android:enabled': 'true'
        },
        'intent-filter': [{
          action: [{ $: { 'android:name': 'outsystems.dohle.FILO.GET_DB_FILE' } }]
        }]
      });
      console.log("✅ Receiver injected.");
    }

    const builder = new xml2js.Builder();
    const updatedXml = builder.buildObject(result);
    fs.writeFileSync(manifestPath, updatedXml, 'utf-8');
    console.log("✅ AndroidManifest.xml successfully updated.");
  });
};
