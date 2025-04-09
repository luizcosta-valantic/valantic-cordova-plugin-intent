var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

/**
 * This represents a thin shim layer over the Android Intent implementation
 * @constructor
 */
function IntentShimCustom() {
    var me = this;
}

IntentShimCustom.prototype.ACTION_SEND = "android.intent.action.SEND";
IntentShimCustom.prototype.ACTION_VIEW = "android.intent.action.VIEW";
IntentShimCustom.prototype.ACTION_INSTALL_PACKAGE = "android.intent.action.INSTALL_PACKAGE";
IntentShimCustom.prototype.ACTION_UNINSTALL_PACKAGE = "android.intent.action.UNINSTALL_PACKAGE";
IntentShimCustom.prototype.EXTRA_TEXT = "android.intent.extra.TEXT";
IntentShimCustom.prototype.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
IntentShimCustom.prototype.EXTRA_STREAM = "android.intent.extra.STREAM";
IntentShimCustom.prototype.EXTRA_EMAIL = "android.intent.extra.EMAIL";
IntentShimCustom.prototype.ACTION_CALL = "android.intent.action.CALL";
IntentShimCustom.prototype.ACTION_SENDTO = "android.intent.action.SENDTO";
IntentShimCustom.prototype.ACTION_GET_CONTENT = "android.intent.action.GET_CONTENT";
IntentShimCustom.prototype.ACTION_PICK = "android.intent.action.PICK";
IntentShimCustom.prototype.RESULT_CANCELED = 0;
IntentShimCustom.prototype.RESULT_OK = -1;

IntentShimCustom.prototype.startActivity = function (params, successCallback, errorCallback) {
    argscheck.checkArgs('off', 'IntentShimCustom.startActivity', arguments);
    exec(successCallback, errorCallback, "IntentShimCustom", "startActivity", [params]);
};

IntentShimCustom.prototype.startActivityForResult = function (params, successCallback, errorCallback) {
    argscheck.checkArgs('off', 'IntentShimCustom.startActivityForResult', arguments);
    exec(successCallback, errorCallback, "IntentShimCustom", "startActivityForResult", [params]);
};

IntentShimCustom.prototype.sendBroadcast = function (params, successCallback, errorCallback) {
    argscheck.checkArgs('off', 'IntentShimCustom.sendBroadcast', arguments);
    exec(successCallback, errorCallback, "IntentShimCustom", "sendBroadcast", [params]);
};

IntentShimCustom.prototype.startService = function (params, successCallback, errorCallback) {
    argscheck.checkArgs('off', 'IntentShimCustom.startService', arguments);
    exec(successCallback, errorCallback, "IntentShimCustom", "startService", [params]);
};

IntentShimCustom.prototype.registerBroadcastReceiver = function (params, callback) {
    argscheck.checkArgs('of', 'IntentShimCustom.registerBroadcastReceiver', arguments);
    exec(callback, null, "IntentShimCustom", "registerBroadcastReceiver", [params]);
};

IntentShimCustom.prototype.unregisterBroadcastReceiver = function () {
    argscheck.checkArgs('', 'IntentShimCustom.unregisterBroadcastReceiver', arguments);
    exec(null, null, "IntentShimCustom", "unregisterBroadcastReceiver", []);
};

IntentShimCustom.prototype.onIntent = function (callback) {
    argscheck.checkArgs('f', 'IntentShimCustom.onIntent', arguments);
    exec(callback, null, "IntentShimCustom", "onIntent", [callback]);
};

IntentShimCustom.prototype.onActivityResult = function (callback) {
    argscheck.checkArgs('f', 'IntentShimCustom.onActivityResult', arguments);
    exec(callback, null, "IntentShimCustom", "onActivityResult", [callback]);
};

IntentShimCustom.prototype.getIntent = function (successCallback, failureCallback) {
    argscheck.checkArgs('ff', 'IntentShimCustom.getIntent', arguments);
    exec(successCallback, failureCallback, "IntentShimCustom", "getIntent", []);
};

IntentShimCustom.prototype.sendResult = function (params, callback) {
    argscheck.checkArgs('of', 'IntentShimCustom.sendResult', arguments);
    exec(callback, null, "IntentShimCustom", "sendResult", [params]);
};

IntentShimCustom.prototype.realPathFromUri = function (params, successCallback, errorCallback) {
    argscheck.checkArgs('off', 'IntentShimCustom.realPathFromUri', arguments);
    exec(successCallback, errorCallback, "IntentShimCustom", "realPathFromUri", [params]);
};

IntentShimCustom.prototype.packageExists = function (packageName, successCallback) {
    argscheck.checkArgs('sf', 'IntentShimCustom.packageExists', arguments);
    exec(successCallback, null, "IntentShimCustom", "packageExists", [packageName]);
};

window.intentShimCustom = new IntentShimCustom();
window.plugins = window.plugins || {};
window.plugins.intentShimCustom = window.intentShimCustom;
