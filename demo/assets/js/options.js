// LoginRadius V2 JS configuration
var stringVariable = window.location.href;
var domainName = stringVariable.substring(0, stringVariable.lastIndexOf('/'));
var commonOptions = {};
commonOptions.apiKey = '<AppKey>';
commonOptions.appName = '<AppName>';
commonOptions.hashTemplate = true;
commonOptions.sott = '<SOTT>';
commonOptions.formValidationMessage = true;
commonOptions.verificationUrl = domainName + '/loginscreen.html';
commonOptions.resetPasswordUrl = domainName + '/loginscreen.html';
var LRObject = new LoginRadiusV2(commonOptions);


// HTML 5 SDK initilization
var sdkoptions = {
    "apiKey": commonOptions.apiKey,
    "debugMode": true
  }
LoginRadiusSDK.initSDK(sdkoptions);
  