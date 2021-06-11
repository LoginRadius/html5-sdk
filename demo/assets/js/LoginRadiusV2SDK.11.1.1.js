var LoginRadiusSDK = (function() {
  //for cross browser communication
  (function(a, b) {
    "use strict";
    var c = function() {
      var b = function() {
        var b = a.location.hash ? a.location.hash.substr(1).split("&") : [],
          c = {};
        for (var d = 0; d < b.length; d++) {
          var e = b[d].split("=");
          c[e[0]] = decodeURIComponent(e[1])
        }
        return c
      };
      var c = function(b) {
        var c = [];
        for (var d in b) {
          c.push(d + "=" + encodeURIComponent(b[d]))
        }
        a.location.hash = c.join("&")
      };
      return {
        get: function(a) {
          var c = b();
          if (a) {
            return c[a]
          } else {
            return c
          }
        },
        add: function(a) {
          var d = b();
          for (var e in a) {
            d[e] = a[e]
          }
          c(d)
        },
        remove: function(a) {
          a = typeof a == "string" ? [a] : a;
          var d = b();
          for (var e = 0; e < a.length; e++) {
            delete d[a[e]]
          }
          c(d)
        },
        clear: function() {
          c({})
        }
      }
    }();
    a.hash = c
  })(window)

  var documentCookies = {
    getItem: function(sKey) {
      if (!sKey) {
        return null;
      }
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      var sExpires = "";
      var vExpiryDate = {
        getInStringFormat: function(nMaxAge) { //"max-age" in second
          if (nMaxAge === Infinity) {
            return "Fri, 31 Dec 9999 23:59:59 GMT";
          }
          var dDate = new Date();
          dDate.setTime(dDate.getTime() + (nMaxAge * 1000));
          return dDate.toGMTString();
        }
      }
      if (vEnd) {
        switch (vEnd.constructor) {
        case Number:
          sExpires = "; expires=" + vExpiryDate.getInStringFormat(vEnd) + vEnd === Infinity ? "" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function(sKey, sPath, sDomain) {
      if (!this.hasItem(sKey)) {
        return false;
      }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function(sKey) {
      if (!sKey) {
        return false;
      }
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function() {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }
      return aKeys;

    }
  };  
  var apiDomain = "https://api.loginradius.com";
  var token = 'LRTokenKey';
  var util = {};
  var config = {};

  //Error codes for errors to be returned by this SDK.
  var errorMsgs = {
    906: {
      "Description": "The access token is not valid",
      "ErrorCode": 906,
      "Message": "The LoginRadius access token is invalid, please use the correct or valid access token in order to process this request."
    },
    920: {
      "Description": "The provided LoginRadius API key is invalid, please use a valid API key of your LoginRadius account.",
      "ErrorCode": 920,
      "Message": "API key is invalid" 
    },
    1000:{
      "Description": "Oops something went wrong, Please try again.",
      "ErrorCode": 1000,
      "Message": "Oops something went wrong, Please try again."
    },
    429: {
      "Description": "Too many request in a particular timeframe.",
      "ErrorCode": 429,
      "Message": "Too many request in a particular timeframe."
    }
  }

  // store all about loginradius module
  var module = {};
  var onlogin = function() {};

  module.isauthenticated = false;

  /* function is used to set Callback Handler to login
   *
   * @function
   * @public
   * @param fn {function}
   */
  module.setLoginCallback = function(fn) {
    module.onlogin = fn;
  };

  /* function is used to check local storage is supported or not
   *
   * @function
   * @public
   * @param fn {lsName}
   */
  function isLocalStorageNameSupported(lsName) {
    if (window[lsName]) {
      var testKey = 'test',
        storage = window[lsName];
      try {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }

  /* function is used to get local storage
   *
   * @function
   * @public
   * @param fn {lsName}
   */
  function getBrowserStorage(key) {
    if (isLocalStorageNameSupported('localStorage') &&
      localStorage.getItem(key) !== null && localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== "") {
      return localStorage.getItem(key);
    }
    if (isLocalStorageNameSupported('sessionStorage') &&
          sessionStorage.getItem(key) !== null && sessionStorage.getItem(key) !== undefined && sessionStorage.getItem(key) !== "") {
      return sessionStorage.getItem(key);
    }

    return documentCookies.getItem(key);
  }
  /* function is used to set local storage
   *
   * @function
   * @public
   * @param fn {lsName}
   */
  function setBrowserStorage(key, value) {
    var cookieFallback = true;
    if (isLocalStorageNameSupported('localStorage')) {
      localStorage.setItem(key, value);
      cookieFallback = false;
    }

    if (isLocalStorageNameSupported('sessionStorage')) {
      sessionStorage.setItem(key, value);
      cookieFallback = false;
    }

    if (cookieFallback) {
      documentCookies.setItem(key, value, '', window.location);
    }
  }
    
  module.oneTouchLoginApi = {};  
  module.oneTouchLoginApi = { 
    /**
    * This API is used to send a link to a specified email for a frictionless login/registration
    * @param {oneTouchLoginByEmailModel} Model Class containing Definition of payload for OneTouchLogin By EmailModel API
    * @param {oneTouchLoginEmailTemplate} Name of the One Touch Login Email Template
    * @param {redirecturl} Url where the user will redirect after success authentication
    * @param {welcomeemailtemplate} Name of the welcome email template
    * @return Response containing Definition of Complete Validation data
    * 1.2
    */
    oneTouchLoginByEmail : function (oneTouchLoginByEmailModel, oneTouchLoginEmailTemplate,
      redirecturl, welcomeemailtemplate, handle) {
      if (util.checkJson(oneTouchLoginByEmailModel)) {
        return handle(util.message('oneTouchLoginByEmailModel'));
      }
      var queryParameters = {};

      if (!util.isNull(oneTouchLoginEmailTemplate)) {
        queryParameters.oneTouchLoginEmailTemplate = oneTouchLoginEmailTemplate;
      }
      if (!util.isNull(redirecturl)) {
        queryParameters.redirecturl = redirecturl;
      }
      if (!util.isNull(welcomeemailtemplate)) {
        queryParameters.welcomeemailtemplate = welcomeemailtemplate;
      }

      var resourcePath = 'identity/v2/auth/onetouchlogin/email';

      return util.xhttpCall('POST', resourcePath, queryParameters, oneTouchLoginByEmailModel, handle);
    },
    /**
    * This API is used to send one time password to a given phone number for a frictionless login/registration.
    * @param {oneTouchLoginByPhoneModel} Model Class containing Definition of payload for OneTouchLogin By PhoneModel API
    * @param {smsTemplate} SMS Template name
    * @return Response containing Definition of Complete Validation data
    * 1.4
    */
    oneTouchLoginByPhone : function (oneTouchLoginByPhoneModel, smsTemplate, handle) {
      if (util.checkJson(oneTouchLoginByPhoneModel)) {
        return handle(util.message('oneTouchLoginByPhoneModel'));
      }
      var queryParameters = {};

      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var resourcePath = 'identity/v2/auth/onetouchlogin/phone';

      return util.xhttpCall('POST', resourcePath, queryParameters, oneTouchLoginByPhoneModel, handle);
    },
    /**
    * This API is used to verify the otp for One Touch Login.
    * @param {otp} The Verification Code
    * @param {phone} New Phone Number
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {smsTemplate} SMS Template name
    * @return Response Containing Access Token and Complete Profile Data
    * 1.5
    */
    oneTouchLoginOTPVerification : function (otp, phone,
      fields, smsTemplate, handle) {
      if (util.isNull(otp)) {
        return handle(util.message('otp'));
      }
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      queryParameters.otp = otp;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var bodyParameters = {};
      bodyParameters.phone = phone;

      var resourcePath = 'identity/v2/auth/onetouchlogin/phone/verify';

      return util.xhttpCall('PUT', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API verifies the provided token for One Touch Login
    * @param {verificationToken} Verification token received in the email
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Complete verified response data
    * 8.4.2
    */
    oneTouchEmailVerification : function (verificationToken, welcomeEmailTemplate, handle) {
      if (util.isNull(verificationToken)) {
        return handle(util.message('verificationToken'));
      }
      var queryParameters = {};

      queryParameters.verificationToken = verificationToken;
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/email/onetouchlogin';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to check if the One Touch Login link has been clicked or not.
    * @param {clientGuid} Unique string used in the Smart Login request
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @return Response containing User Profile Data and access token
    * 9.21.2
    */
    oneTouchLoginPing : function (clientGuid, fields, handle) {
      if (util.isNull(clientGuid)) {
        return handle(util.message('clientGuid'));
      }
      var queryParameters = {};

      queryParameters.clientGuid = clientGuid;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'identity/v2/auth/login/smartlogin/ping';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    }, 
  }  
  module.authenticationApi = {};  
  module.authenticationApi = { 
    /**
    * This API is used to retrieve the list of questions that are configured on the respective LoginRadius site.
    * @param {email} Email of the user
    * @return Response containing Definition for Complete SecurityQuestions data
    * 2.1
    */
    getSecurityQuestionsByEmail : function (email, handle) {
      if (util.isNull(email)) {
        return handle(util.message('email'));
      }
      var queryParameters = {};

      queryParameters.email = email;

      var resourcePath = 'identity/v2/auth/securityquestion/email';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to retrieve the list of questions that are configured on the respective LoginRadius site.
    * @param {userName} UserName of the user
    * @return Response containing Definition for Complete SecurityQuestions data
    * 2.2
    */
    getSecurityQuestionsByUserName : function (userName, handle) {
      if (util.isNull(userName)) {
        return handle(util.message('userName'));
      }
      var queryParameters = {};

      queryParameters.userName = userName;

      var resourcePath = 'identity/v2/auth/securityquestion/username';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to retrieve the list of questions that are configured on the respective LoginRadius site.
    * @param {phone} The Registered Phone Number
    * @return Response containing Definition for Complete SecurityQuestions data
    * 2.3
    */
    getSecurityQuestionsByPhone : function (phone, handle) {
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      queryParameters.phone = phone;

      var resourcePath = 'identity/v2/auth/securityquestion/phone';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to retrieve the list of questions that are configured on the respective LoginRadius site.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response containing Definition for Complete SecurityQuestions data
    * 2.4
    */
    getSecurityQuestionsByAccessToken : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/securityquestion/accesstoken';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This api validates access token, if valid then returns a response with its expiry otherwise error.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response containing Definition of Complete Token data
    * 4.1
    */
    authValidateAccessToken : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/access_token/validate';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This api call invalidates the active access token or expires an access token's validity.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {preventRefresh} Boolean value that when set as true, in addition of the access token being invalidated, it will no longer have the capability of being refreshed.
    * @return Response containing Definition of Complete Validation data
    * 4.2
    */
    authInValidateAccessToken : function (accessToken, preventRefresh, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (preventRefresh !== null) {
        queryParameters.preventRefresh = preventRefresh;
      }

      var resourcePath = 'identity/v2/auth/access_token/invalidate';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This api call provide the active access token Information
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response containing Definition of Token Information
    * 4.3
    */
    getAccessTokenInfo : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/access_token';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API retrieves a copy of the user data based on the access token.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @return Response containing Definition for Complete profile data
    * 5.2
    */
    getProfileByAccessToken : function (accessToken, fields, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'identity/v2/auth/account';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API sends a welcome email
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Response containing Definition of Complete Validation data
    * 5.3
    */
    sendWelcomeEmail : function (accessToken, welcomeEmailTemplate, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/account/sendwelcomeemail';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to update the user's profile by passing the access token.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {userProfileUpdateModel} Model Class containing Definition of payload for User Profile update API
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {nullSupport} Boolean, pass true if you wish to update any user profile field with a NULL value, You can get the details
    * @param {smsTemplate} SMS Template name
    * @param {verificationUrl} Email verification url
    * @return Response containing Definition of Complete Validation and UserProfile data
    * 5.4
    */
    updateProfileByAccessToken : function (accessToken, userProfileUpdateModel,
      emailTemplate, fields, nullSupport, smsTemplate, verificationUrl, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(userProfileUpdateModel)) {
        return handle(util.message('userProfileUpdateModel'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (nullSupport !== null) {
        queryParameters.nullSupport = nullSupport;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var resourcePath = 'identity/v2/auth/account';

      return util.xhttpCall('PUT', resourcePath, queryParameters, userProfileUpdateModel, handle);
    },
    /**
    * This API will send a confirmation email for account deletion to the customer's email when passed the customer's access token
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {deleteUrl} Url of the site
    * @param {emailTemplate} Email template name
    * @return Response containing Definition of Delete Request
    * 5.5
    */
    deleteAccountWithEmailConfirmation : function (accessToken, deleteUrl,
      emailTemplate, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(deleteUrl)) {
        queryParameters.deleteUrl = deleteUrl;
      }
      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }

      var resourcePath = 'identity/v2/auth/account';

      return util.xhttpCall('DELETE', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to delete an account by passing it a delete token.
    * @param {deletetoken} Delete token received in the email
    * @return Response containing Definition of Complete Validation data
    * 5.6
    */
    deleteAccountByDeleteToken : function (deletetoken, handle) {
      if (util.isNull(deletetoken)) {
        return handle(util.message('deletetoken'));
      }
      var queryParameters = {};

      queryParameters.deletetoken = deletetoken;

      var resourcePath = 'identity/v2/auth/account/delete';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to allow a customer with a valid access token to unlock their account provided that they successfully pass the prompted Bot Protection challenges. The Block or Suspend block types are not applicable for this API. For additional details see our Auth Security Configuration documentation.You are only required to pass the Post Parameters that correspond to the prompted challenges.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {unlockProfileModel} Payload containing Unlock Profile API
    * @return Response containing Definition of Complete Validation data
    * 5.15
    */
    unlockAccountByToken : function (accessToken, unlockProfileModel, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(unlockProfileModel)) {
        return handle(util.message('unlockProfileModel'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/account/unlock';

      return util.xhttpCall('PUT', resourcePath, queryParameters, unlockProfileModel, handle);
    },
    /**
    * 
    * @param {clientGuid} 
    * @param {emailTemplate} 
    * @param {fields} 
    * @param {verificationUrl} 
    * @param {welcomeEmailTemplate} 
    * @return Response containing User Profile Data and access token
    * 5.16
    */
    getProfileByPing : function (clientGuid, emailTemplate,
      fields, verificationUrl, welcomeEmailTemplate, handle) {
      if (util.isNull(clientGuid)) {
        return handle(util.message('clientGuid'));
      }
      var queryParameters = {};

      queryParameters.clientGuid = clientGuid;
      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/account/ping';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to check the email exists or not on your site.
    * @param {email} Email of the user
    * @return Response containing Definition Complete ExistResponse data
    * 8.1
    */
    checkEmailAvailability : function (email, handle) {
      if (util.isNull(email)) {
        return handle(util.message('email'));
      }
      var queryParameters = {};

      queryParameters.email = email;

      var resourcePath = 'identity/v2/auth/email';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to verify the email of user. Note: This API will only return the full profile if you have 'Enable auto login after email verification' set in your LoginRadius Admin Console's Email Workflow settings under 'Verification Email'.
    * @param {verificationToken} Verification token received in the email
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {url} Mention URL to log the main URL(Domain name) in Database.
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Response containing Definition of Complete Validation, UserProfile data and Access Token
    * 8.2
    */
    verifyEmail : function (verificationToken, fields,
      url, welcomeEmailTemplate, handle) {
      if (util.isNull(verificationToken)) {
        return handle(util.message('verificationToken'));
      }
      var queryParameters = {};

      queryParameters.verificationToken = verificationToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(url)) {
        queryParameters.url = url;
      }
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/email';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to verify the email of user when the OTP Email verification flow is enabled, please note that you must contact LoginRadius to have this feature enabled.
    * @param {emailVerificationByOtpModel} Model Class containing Definition for EmailVerificationByOtpModel API
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {url} Mention URL to log the main URL(Domain name) in Database.
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Response containing Definition of Complete Validation, UserProfile data and Access Token
    * 8.3
    */
    verifyEmailByOTP : function (emailVerificationByOtpModel, fields,
      url, welcomeEmailTemplate, handle) {
      if (util.checkJson(emailVerificationByOtpModel)) {
        return handle(util.message('emailVerificationByOtpModel'));
      }
      var queryParameters = {};

      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(url)) {
        queryParameters.url = url;
      }
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/email';

      return util.xhttpCall('PUT', resourcePath, queryParameters, emailVerificationByOtpModel, handle);
    },
    /**
    * This API is used to add additional emails to a user's account.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {email} user's email
    * @param {type} String to identify the type of parameter
    * @param {emailTemplate} Email template name
    * @param {verificationUrl} Email verification url
    * @return Response containing Definition of Complete Validation data
    * 8.5
    */
    addEmail : function (accessToken, email,
      type, emailTemplate, verificationUrl, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(email)) {
        return handle(util.message('email'));
      }
      if (util.isNull(type)) {
        return handle(util.message('type'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var bodyParameters = {};
      bodyParameters.email = email;
      bodyParameters.type = type;

      var resourcePath = 'identity/v2/auth/email';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to remove additional emails from a user's account.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {email} user's email
    * @return Response containing Definition of Delete Request
    * 8.6
    */
    removeEmail : function (accessToken, email, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(email)) {
        return handle(util.message('email'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var bodyParameters = {};
      bodyParameters.email = email;

      var resourcePath = 'identity/v2/auth/email';

      return util.xhttpCall('DELETE', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API retrieves a copy of the user data based on the Email
    * @param {emailAuthenticationModel} Model Class containing Definition of payload for Email Authentication API
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {loginUrl} Url where the user is logging from
    * @param {verificationUrl} Email verification url
    * @return Response containing User Profile Data and access token
    * 9.2.1
    */
    loginByEmail : function (emailAuthenticationModel, emailTemplate,
      fields, loginUrl, verificationUrl, handle) {
      if (util.checkJson(emailAuthenticationModel)) {
        return handle(util.message('emailAuthenticationModel'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(loginUrl)) {
        queryParameters.loginUrl = loginUrl;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var resourcePath = 'identity/v2/auth/login';

      return util.xhttpCall('POST', resourcePath, queryParameters, emailAuthenticationModel, handle);
    },
    /**
    * This API retrieves a copy of the user data based on the Username
    * @param {userNameAuthenticationModel} Model Class containing Definition of payload for Username Authentication API
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {loginUrl} Url where the user is logging from
    * @param {verificationUrl} Email verification url
    * @return Response containing User Profile Data and access token
    * 9.2.2
    */
    loginByUserName : function (userNameAuthenticationModel, emailTemplate,
      fields, loginUrl, verificationUrl, handle) {
      if (util.checkJson(userNameAuthenticationModel)) {
        return handle(util.message('userNameAuthenticationModel'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(loginUrl)) {
        queryParameters.loginUrl = loginUrl;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var resourcePath = 'identity/v2/auth/login';

      return util.xhttpCall('POST', resourcePath, queryParameters, userNameAuthenticationModel, handle);
    },
    /**
    * This API is used to send the reset password url to a specified account. Note: If you have the UserName workflow enabled, you may replace the 'email' parameter with 'username'
    * @param {email} user's email
    * @param {resetPasswordUrl} Url to which user should get re-directed to for resetting the password
    * @param {emailTemplate} Email template name
    * @return Response containing Definition of Complete Validation data
    * 10.1
    */
    forgotPassword : function (email, resetPasswordUrl,
      emailTemplate, handle) {
      if (util.isNull(email)) {
        return handle(util.message('email'));
      }
      if (util.isNull(resetPasswordUrl)) {
        return handle(util.message('resetPasswordUrl'));
      }
      var queryParameters = {};

      queryParameters.resetPasswordUrl = resetPasswordUrl;
      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }

      var bodyParameters = {};
      bodyParameters.email = email;

      var resourcePath = 'identity/v2/auth/password';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to reset password for the specified account by security question
    * @param {resetPasswordBySecurityAnswerAndEmailModel} Model Class containing Definition of payload for ResetPasswordBySecurityAnswerAndEmail API
    * @return Response containing Definition of Validation data and access token
    * 10.3.1
    */
    resetPasswordBySecurityAnswerAndEmail : function (resetPasswordBySecurityAnswerAndEmailModel, handle) {
      if (util.checkJson(resetPasswordBySecurityAnswerAndEmailModel)) {
        return handle(util.message('resetPasswordBySecurityAnswerAndEmailModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/password/securityanswer';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPasswordBySecurityAnswerAndEmailModel, handle);
    },
    /**
    * This API is used to reset password for the specified account by security question
    * @param {resetPasswordBySecurityAnswerAndPhoneModel} Model Class containing Definition of payload for ResetPasswordBySecurityAnswerAndPhone API
    * @return Response containing Definition of Validation data and access token
    * 10.3.2
    */
    resetPasswordBySecurityAnswerAndPhone : function (resetPasswordBySecurityAnswerAndPhoneModel, handle) {
      if (util.checkJson(resetPasswordBySecurityAnswerAndPhoneModel)) {
        return handle(util.message('resetPasswordBySecurityAnswerAndPhoneModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/password/securityanswer';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPasswordBySecurityAnswerAndPhoneModel, handle);
    },
    /**
    * This API is used to reset password for the specified account by security question
    * @param {resetPasswordBySecurityAnswerAndUserNameModel} Model Class containing Definition of payload for ResetPasswordBySecurityAnswerAndUserName API
    * @return Response containing Definition of Validation data and access token
    * 10.3.3
    */
    resetPasswordBySecurityAnswerAndUserName : function (resetPasswordBySecurityAnswerAndUserNameModel, handle) {
      if (util.checkJson(resetPasswordBySecurityAnswerAndUserNameModel)) {
        return handle(util.message('resetPasswordBySecurityAnswerAndUserNameModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/password/securityanswer';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPasswordBySecurityAnswerAndUserNameModel, handle);
    },
    /**
    * This API is used to set a new password for the specified account.
    * @param {resetPasswordByResetTokenModel} Model Class containing Definition of payload for ResetToken API
    * @return Response containing Definition of Validation data and access token
    * 10.7.1
    */
    resetPasswordByResetToken : function (resetPasswordByResetTokenModel, handle) {
      if (util.checkJson(resetPasswordByResetTokenModel)) {
        return handle(util.message('resetPasswordByResetTokenModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/password/reset';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPasswordByResetTokenModel, handle);
    },
    /**
    * This API is used to set a new password for the specified account.
    * @param {resetPasswordByEmailAndOtpModel} Model Class containing Definition of payload for ResetPasswordByEmailAndOtp API
    * @return Response containing Definition of Validation data and access token
    * 10.7.2
    */
    resetPasswordByEmailOTP : function (resetPasswordByEmailAndOtpModel, handle) {
      if (util.checkJson(resetPasswordByEmailAndOtpModel)) {
        return handle(util.message('resetPasswordByEmailAndOtpModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/password/reset';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPasswordByEmailAndOtpModel, handle);
    },
    /**
    * This API is used to set a new password for the specified account if you are using the username as the unique identifier in your workflow
    * @param {resetPasswordByUserNameModel} Model Class containing Definition of payload for ResetPasswordByUserName API
    * @return Response containing Definition of Validation data and access token
    * 10.7.3
    */
    resetPasswordByOTPAndUserName : function (resetPasswordByUserNameModel, handle) {
      if (util.checkJson(resetPasswordByUserNameModel)) {
        return handle(util.message('resetPasswordByUserNameModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/password/reset';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPasswordByUserNameModel, handle);
    },
    /**
    * This API is used to change the accounts password based on the previous password
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {newPassword} New password
    * @param {oldPassword} User's current password
    * @return Response containing Definition of Complete Validation data
    * 10.8
    */
    changePassword : function (accessToken, newPassword,
      oldPassword, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(newPassword)) {
        return handle(util.message('newPassword'));
      }
      if (util.isNull(oldPassword)) {
        return handle(util.message('oldPassword'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var bodyParameters = {};
      bodyParameters.newPassword = newPassword;
      bodyParameters.oldPassword = oldPassword;

      var resourcePath = 'identity/v2/auth/password/change';

      return util.xhttpCall('PUT', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to unlink up a social provider account with the specified account based on the access token and the social providers user access token. The unlinked account will automatically get removed from your database.
    * @param {accessToken} Access_Token
    * @param {provider} Name of the provider
    * @param {providerId} Unique ID of the linked account
    * @return Response containing Definition of Delete Request
    * 12.2
    */
    unlinkSocialIdentities : function (accessToken, provider,
      providerId, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(provider)) {
        return handle(util.message('provider'));
      }
      if (util.isNull(providerId)) {
        return handle(util.message('providerId'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var bodyParameters = {};
      bodyParameters.provider = provider;
      bodyParameters.providerId = providerId;

      var resourcePath = 'identity/v2/auth/socialidentity';

      return util.xhttpCall('DELETE', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to link up a social provider account with an existing LoginRadius account on the basis of access token and the social providers user access token.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {candidateToken} Access token of the account to be linked
    * @return Response containing Definition of Complete Validation data
    * 12.4
    */
    linkSocialIdentities : function (accessToken, candidateToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(candidateToken)) {
        return handle(util.message('candidateToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var bodyParameters = {};
      bodyParameters.candidateToken = candidateToken;

      var resourcePath = 'identity/v2/auth/socialidentity';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to link up a social provider account with an existing LoginRadius account on the basis of ping and the social providers user access token.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {clientGuid} Unique ID generated by client
    * @return Response containing Definition of Complete Validation data
    * 12.5
    */
    linkSocialIdentitiesByPing : function (accessToken, clientGuid, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(clientGuid)) {
        return handle(util.message('clientGuid'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var bodyParameters = {};
      bodyParameters.clientGuid = clientGuid;

      var resourcePath = 'identity/v2/auth/socialidentity';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to set or change UserName by access token.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {username} Username of the user
    * @return Response containing Definition of Complete Validation data
    * 13.1
    */
    setOrChangeUserName : function (accessToken, username, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(username)) {
        return handle(util.message('username'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var bodyParameters = {};
      bodyParameters.username = username;

      var resourcePath = 'identity/v2/auth/username';

      return util.xhttpCall('PUT', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to check the UserName exists or not on your site.
    * @param {username} UserName of the user
    * @return Response containing Definition Complete ExistResponse data
    * 13.2
    */
    checkUserNameAvailability : function (username, handle) {
      if (util.isNull(username)) {
        return handle(util.message('username'));
      }
      var queryParameters = {};

      queryParameters.username = username;

      var resourcePath = 'identity/v2/auth/username';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to update the privacy policy stored in the user's profile by providing the access token of the user accepting the privacy policy
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @return Response containing Definition for Complete profile data
    * 15.1
    */
    acceptPrivacyPolicy : function (accessToken, fields, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'identity/v2/auth/privacypolicy/accept';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API will return all the accepted privacy policies for the user by providing the access token of that user.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Complete Policy History data
    * 15.2
    */
    getPrivacyPolicyHistoryByAccessToken : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/privacypolicy/history';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API creates a user in the database as well as sends a verification email to the user.
    * @param {authUserRegistrationModel} Model Class containing Definition of payload for Auth User Registration API
    * @param {sott} LoginRadius Secured One Time Token
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {options} PreventVerificationEmail (Specifying this value prevents the verification email from being sent. Only applicable if you have the optional email verification flow)
    * @param {verificationUrl} Email verification url
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Response containing Definition of Complete Validation, UserProfile data and Access Token
    * 17.1.1
    */
    userRegistrationByEmail : function (authUserRegistrationModel, sott,
      emailTemplate, fields, options, verificationUrl, welcomeEmailTemplate, handle) {
      if (util.checkJson(authUserRegistrationModel)) {
        return handle(util.message('authUserRegistrationModel'));
      }
      if (util.isNull(sott)) {
        return handle(util.message('sott'));
      }
      var queryParameters = {};

      queryParameters.sott = sott;
      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(options)) {
        queryParameters.options = options;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/register';

      return util.xhttpCall('POST', resourcePath, queryParameters, authUserRegistrationModel, handle);
    },
    /**
    * This API creates a user in the database as well as sends a verification email to the user.
    * @param {authUserRegistrationModelWithCaptcha} Model Class containing Definition of payload for Auth User Registration by Recaptcha API
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {options} PreventVerificationEmail (Specifying this value prevents the verification email from being sent. Only applicable if you have the optional email verification flow)
    * @param {smsTemplate} SMS Template name
    * @param {verificationUrl} Email verification url
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Response containing Definition of Complete Validation, UserProfile data and Access Token
    * 17.2
    */
    userRegistrationByCaptcha : function (authUserRegistrationModelWithCaptcha, emailTemplate,
      fields, options, smsTemplate, verificationUrl, welcomeEmailTemplate, handle) {
      if (util.checkJson(authUserRegistrationModelWithCaptcha)) {
        return handle(util.message('authUserRegistrationModelWithCaptcha'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(options)) {
        queryParameters.options = options;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/register/captcha';

      return util.xhttpCall('POST', resourcePath, queryParameters, authUserRegistrationModelWithCaptcha, handle);
    },
    /**
    * This API resends the verification email to the user.
    * @param {email} user's email
    * @param {emailTemplate} Email template name
    * @param {verificationUrl} Email verification url
    * @return Response containing Definition of Complete Validation data
    * 17.3
    */
    authResendEmailVerification : function (email, emailTemplate,
      verificationUrl, handle) {
      if (util.isNull(email)) {
        return handle(util.message('email'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var bodyParameters = {};
      bodyParameters.email = email;

      var resourcePath = 'identity/v2/auth/register';

      return util.xhttpCall('PUT', resourcePath, queryParameters, bodyParameters, handle);
    }, 
  }  
  module.configurationApi = {};  
  module.configurationApi = { 

    /**
    * This API is used to get the configurations which are set in the LoginRadius Dashboard for a particular LoginRadius site/environment
    * @return Response containing LoginRadius App configurations which are set in the LoginRadius Dashboard for a particular LoginRadius site/environment
    * 100
    */
    getConfigurations: function (handle) {
      var resourcePath = 'ciam/appinfo';

      var queryParameters = {};
      return util.xhttpCall('GET', resourcePath, queryParameters, null, handle);
    },
    /**
    * This API allows you to query your LoginRadius account for basic server information and server time information which is useful when generating an SOTT token.
    * @param {timeDifference} The time difference you would like to pass, If you not pass difference then the default value is 10 minutes
    * @return Response containing Definition of Complete service info data
    * 3.1
    */
    getServerInfo : function (timeDifference, handle) {
      var queryParameters = {};

      if (timeDifference !== null) {
        queryParameters.timeDifference = timeDifference;
      }

      var resourcePath = 'identity/v2/serverinfo';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    }, 
  }  
  module.multiFactorAuthenticationApi = {};  
  module.multiFactorAuthenticationApi = { 
    /**
    * This API is used to configure the Multi-factor authentication after login by using the access token when MFA is set as optional on the LoginRadius site.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {smsTemplate2FA} SMS Template Name
    * @return Response containing Definition of Complete Multi-Factor Authentication Settings data
    * 5.7
    */
    mfaConfigureByAccessToken : function (accessToken, smsTemplate2FA, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }

      var resourcePath = 'identity/v2/auth/account/2fa';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to trigger the Multi-factor authentication settings after login for secure actions
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {multiFactorAuthModelWithLockout} Model Class containing Definition of payload for MultiFactorAuthModel With Lockout API
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @return Response containing Definition for Complete profile data
    * 5.9
    */
    mfaUpdateSetting : function (accessToken, multiFactorAuthModelWithLockout,
      fields, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(multiFactorAuthModelWithLockout)) {
        return handle(util.message('multiFactorAuthModelWithLockout'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'identity/v2/auth/account/2fa/verification/otp';

      return util.xhttpCall('PUT', resourcePath, queryParameters, multiFactorAuthModelWithLockout, handle);
    },
    /**
    * This API is used to Enable Multi-factor authentication by access token on user login
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {multiFactorAuthModelByGoogleAuthenticatorCode} Model Class containing Definition of payload for MultiFactorAuthModel By GoogleAuthenticator Code API
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {smsTemplate} SMS Template name
    * @return Response containing Definition for Complete profile data
    * 5.10
    */
    mfaUpdateByAccessToken : function (accessToken, multiFactorAuthModelByGoogleAuthenticatorCode,
      fields, smsTemplate, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(multiFactorAuthModelByGoogleAuthenticatorCode)) {
        return handle(util.message('multiFactorAuthModelByGoogleAuthenticatorCode'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var resourcePath = 'identity/v2/auth/account/2fa/verification/googleauthenticatorcode';

      return util.xhttpCall('PUT', resourcePath, queryParameters, multiFactorAuthModelByGoogleAuthenticatorCode, handle);
    },
    /**
    * This API is used to update the Multi-factor authentication phone number by sending the verification OTP to the provided phone number
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {phoneNo2FA} Phone Number For 2FA
    * @param {smsTemplate2FA} SMS Template Name
    * @return Response containing Definition for Complete SMS data
    * 5.11
    */
    mfaUpdatePhoneNumberByToken : function (accessToken, phoneNo2FA,
      smsTemplate2FA, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(phoneNo2FA)) {
        return handle(util.message('phoneNo2FA'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }

      var bodyParameters = {};
      bodyParameters.phoneNo2FA = phoneNo2FA;

      var resourcePath = 'identity/v2/auth/account/2fa';

      return util.xhttpCall('PUT', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API Resets the Google Authenticator configurations on a given account via the access token
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {googleauthenticator} boolean type value,Enable google Authenticator Code.
    * @return Response containing Definition of Delete Request
    * 5.12.1
    */
    mfaResetGoogleAuthByToken : function (accessToken, googleauthenticator, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var bodyParameters = {};
      bodyParameters.googleauthenticator = googleauthenticator;

      var resourcePath = 'identity/v2/auth/account/2fa/authenticator';

      return util.xhttpCall('DELETE', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API resets the SMS Authenticator configurations on a given account via the access token.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {otpauthenticator} Pass 'otpauthenticator' to remove SMS Authenticator
    * @return Response containing Definition of Delete Request
    * 5.12.2
    */
    mfaResetSMSAuthByToken : function (accessToken, otpauthenticator, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var bodyParameters = {};
      bodyParameters.otpauthenticator = otpauthenticator;

      var resourcePath = 'identity/v2/auth/account/2fa/authenticator';

      return util.xhttpCall('DELETE', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to get a set of backup codes via access token to allow the user login on a site that has Multi-factor Authentication enabled in the event that the user does not have a secondary factor available. We generate 10 codes, each code can only be consumed once. If any user attempts to go over the number of invalid login attempts configured in the Dashboard then the account gets blocked automatically
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response containing Definition of Complete Backup Code data
    * 5.13
    */
    mfaBackupCodeByAccessToken : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/account/2fa/backupcode';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * API is used to reset the backup codes on a given account via the access token. This API call will generate 10 new codes, each code can only be consumed once
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response containing Definition of Complete Backup Code data
    * 5.14
    */
    mfaResetBackupCodeByAccessToken : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/account/2fa/backupcode/reset';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API can be used to login by emailid on a Multi-factor authentication enabled LoginRadius site.
    * @param {email} user's email
    * @param {password} Password for the email
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {loginUrl} Url where the user is logging from
    * @param {smsTemplate} SMS Template name
    * @param {smsTemplate2FA} SMS Template Name
    * @param {verificationUrl} Email verification url
    * @return Complete user UserProfile data
    * 9.8.1
    */
    mfaLoginByEmail : function (email, password,
      emailTemplate, fields, loginUrl, smsTemplate, smsTemplate2FA,
      verificationUrl, handle) {
      if (util.isNull(email)) {
        return handle(util.message('email'));
      }
      if (util.isNull(password)) {
        return handle(util.message('password'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(loginUrl)) {
        queryParameters.loginUrl = loginUrl;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var bodyParameters = {};
      bodyParameters.email = email;
      bodyParameters.password = password;

      var resourcePath = 'identity/v2/auth/login/2fa';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API can be used to login by username on a Multi-factor authentication enabled LoginRadius site.
    * @param {password} Password for the email
    * @param {username} Username of the user
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {loginUrl} Url where the user is logging from
    * @param {smsTemplate} SMS Template name
    * @param {smsTemplate2FA} SMS Template Name
    * @param {verificationUrl} Email verification url
    * @return Complete user UserProfile data
    * 9.8.2
    */
    mfaLoginByUserName : function (password, username,
      emailTemplate, fields, loginUrl, smsTemplate, smsTemplate2FA,
      verificationUrl, handle) {
      if (util.isNull(password)) {
        return handle(util.message('password'));
      }
      if (util.isNull(username)) {
        return handle(util.message('username'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(loginUrl)) {
        queryParameters.loginUrl = loginUrl;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var bodyParameters = {};
      bodyParameters.password = password;
      bodyParameters.username = username;

      var resourcePath = 'identity/v2/auth/login/2fa';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API can be used to login by Phone on a Multi-factor authentication enabled LoginRadius site.
    * @param {password} Password for the email
    * @param {phone} New Phone Number
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {loginUrl} Url where the user is logging from
    * @param {smsTemplate} SMS Template name
    * @param {smsTemplate2FA} SMS Template Name
    * @param {verificationUrl} Email verification url
    * @return Complete user UserProfile data
    * 9.8.3
    */
    mfaLoginByPhone : function (password, phone,
      emailTemplate, fields, loginUrl, smsTemplate, smsTemplate2FA,
      verificationUrl, handle) {
      if (util.isNull(password)) {
        return handle(util.message('password'));
      }
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(loginUrl)) {
        queryParameters.loginUrl = loginUrl;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var bodyParameters = {};
      bodyParameters.password = password;
      bodyParameters.phone = phone;

      var resourcePath = 'identity/v2/auth/login/2fa';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to login via Multi-factor authentication by passing the One Time Password received via SMS
    * @param {multiFactorAuthModelWithLockout} Model Class containing Definition of payload for MultiFactorAuthModel With Lockout API
    * @param {secondFactorAuthenticationToken} A Uniquely generated MFA identifier token after successful authentication
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {smsTemplate2FA} SMS Template Name
    * @return Complete user UserProfile data
    * 9.12
    */
    mfaValidateOTPByPhone : function (multiFactorAuthModelWithLockout, secondFactorAuthenticationToken,
      fields, smsTemplate2FA, handle) {
      if (util.checkJson(multiFactorAuthModelWithLockout)) {
        return handle(util.message('multiFactorAuthModelWithLockout'));
      }
      if (util.isNull(secondFactorAuthenticationToken)) {
        return handle(util.message('secondFactorAuthenticationToken'));
      }
      var queryParameters = {};

      queryParameters.secondFactorAuthenticationToken = secondFactorAuthenticationToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }

      var resourcePath = 'identity/v2/auth/login/2fa/verification/otp';

      return util.xhttpCall('PUT', resourcePath, queryParameters, multiFactorAuthModelWithLockout, handle);
    },
    /**
    * This API is used to login via Multi-factor-authentication by passing the google authenticator code.
    * @param {googleAuthenticatorCode} The code generated by google authenticator app after scanning QR code
    * @param {secondFactorAuthenticationToken} A Uniquely generated MFA identifier token after successful authentication
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {smsTemplate2FA} SMS Template Name
    * @return Complete user UserProfile data
    * 9.13
    */
    mfaValidateGoogleAuthCode : function (googleAuthenticatorCode, secondFactorAuthenticationToken,
      fields, smsTemplate2FA, handle) {
      if (util.isNull(googleAuthenticatorCode)) {
        return handle(util.message('googleAuthenticatorCode'));
      }
      if (util.isNull(secondFactorAuthenticationToken)) {
        return handle(util.message('secondFactorAuthenticationToken'));
      }
      var queryParameters = {};

      queryParameters.secondFactorAuthenticationToken = secondFactorAuthenticationToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }

      var bodyParameters = {};
      bodyParameters.googleAuthenticatorCode = googleAuthenticatorCode;

      var resourcePath = 'identity/v2/auth/login/2fa/verification/googleauthenticatorcode';

      return util.xhttpCall('PUT', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to validate the backup code provided by the user and if valid, we return an access token allowing the user to login incases where Multi-factor authentication (MFA) is enabled and the secondary factor is unavailable. When a user initially downloads the Backup codes, We generate 10 codes, each code can only be consumed once. if any user attempts to go over the number of invalid login attempts configured in the Dashboard then the account gets blocked automatically
    * @param {multiFactorAuthModelByBackupCode} Model Class containing Definition of payload for MultiFactorAuth By BackupCode API
    * @param {secondFactorAuthenticationToken} A Uniquely generated MFA identifier token after successful authentication
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @return Complete user UserProfile data
    * 9.14
    */
    mfaValidateBackupCode : function (multiFactorAuthModelByBackupCode, secondFactorAuthenticationToken,
      fields, handle) {
      if (util.checkJson(multiFactorAuthModelByBackupCode)) {
        return handle(util.message('multiFactorAuthModelByBackupCode'));
      }
      if (util.isNull(secondFactorAuthenticationToken)) {
        return handle(util.message('secondFactorAuthenticationToken'));
      }
      var queryParameters = {};

      queryParameters.secondFactorAuthenticationToken = secondFactorAuthenticationToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'identity/v2/auth/login/2fa/verification/backupcode';

      return util.xhttpCall('PUT', resourcePath, queryParameters, multiFactorAuthModelByBackupCode, handle);
    },
    /**
    * This API is used to update (if configured) the phone number used for Multi-factor authentication by sending the verification OTP to the provided phone number
    * @param {phoneNo2FA} Phone Number For 2FA
    * @param {secondFactorAuthenticationToken} A Uniquely generated MFA identifier token after successful authentication
    * @param {smsTemplate2FA} SMS Template Name
    * @return Response containing Definition for Complete SMS data
    * 9.16
    */
    mfaUpdatePhoneNumber : function (phoneNo2FA, secondFactorAuthenticationToken,
      smsTemplate2FA, handle) {
      if (util.isNull(phoneNo2FA)) {
        return handle(util.message('phoneNo2FA'));
      }
      if (util.isNull(secondFactorAuthenticationToken)) {
        return handle(util.message('secondFactorAuthenticationToken'));
      }
      var queryParameters = {};

      queryParameters.secondFactorAuthenticationToken = secondFactorAuthenticationToken;
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }

      var bodyParameters = {};
      bodyParameters.phoneNo2FA = phoneNo2FA;

      var resourcePath = 'identity/v2/auth/login/2fa';

      return util.xhttpCall('PUT', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to resending the verification OTP to the provided phone number
    * @param {secondFactorAuthenticationToken} A Uniquely generated MFA identifier token after successful authentication
    * @param {smsTemplate2FA} SMS Template Name
    * @return Response containing Definition for Complete SMS data
    * 9.17
    */
    mfaResendOTP : function (secondFactorAuthenticationToken, smsTemplate2FA, handle) {
      if (util.isNull(secondFactorAuthenticationToken)) {
        return handle(util.message('secondFactorAuthenticationToken'));
      }
      var queryParameters = {};

      queryParameters.secondFactorAuthenticationToken = secondFactorAuthenticationToken;
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }

      var resourcePath = 'identity/v2/auth/login/2fa/resend';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    }, 
  }  
  module.customObjectApi = {};  
  module.customObjectApi = { 
    /**
    * This API is used to write information in JSON format to the custom object for the specified account.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {objectName} LoginRadius Custom Object Name
    * @param {payload} LoginRadius Custom Object Name
    * @return Response containing Definition for Complete user custom object data
    * 6.1
    */
    createCustomObjectByToken : function (accessToken, objectName,
      payload, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(objectName)) {
        return handle(util.message('objectName'));
      }
      if (util.checkJson(payload)) {
        return handle(util.message('payload'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.objectName = objectName;

      var resourcePath = 'identity/v2/auth/customobject';

      return util.xhttpCall('POST', resourcePath, queryParameters, payload, handle);
    },
    /**
    * This API is used to update the specified custom object data of the specified account. If the value of updatetype is 'replace' then it will fully replace custom object with the new custom object and if the value of updatetype is 'partialreplace' then it will perform an upsert type operation
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {objectName} LoginRadius Custom Object Name
    * @param {objectRecordId} Unique identifier of the user's record in Custom Object
    * @param {payload} LoginRadius Custom Object Name
    * @param {updateType} Possible values: replace, partialreplace.
    * @return Response containing Definition for Complete user custom object data
    * 6.2
    */
    updateCustomObjectByToken : function (accessToken, objectName,
      objectRecordId, payload, updateType, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(objectName)) {
        return handle(util.message('objectName'));
      }
      if (util.isNull(objectRecordId)) {
        return handle(util.message('objectRecordId'));
      }
      if (util.checkJson(payload)) {
        return handle(util.message('payload'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.objectName = objectName;
      if (updateType !== null) {
        queryParameters.updateType = updateType;
      }

      var resourcePath = 'identity/v2/auth/customobject/' + objectRecordId;

      return util.xhttpCall('PUT', resourcePath, queryParameters, payload, handle);
    },
    /**
    * This API is used to retrieve the specified Custom Object data for the specified account.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {objectName} LoginRadius Custom Object Name
    * @return Complete user CustomObject data
    * 6.3
    */
    getCustomObjectByToken : function (accessToken, objectName, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(objectName)) {
        return handle(util.message('objectName'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.objectName = objectName;

      var resourcePath = 'identity/v2/auth/customobject';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to retrieve the Custom Object data for the specified account.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {objectName} LoginRadius Custom Object Name
    * @param {objectRecordId} Unique identifier of the user's record in Custom Object
    * @return Response containing Definition for Complete user custom object data
    * 6.4
    */
    getCustomObjectByRecordIDAndToken : function (accessToken, objectName,
      objectRecordId, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(objectName)) {
        return handle(util.message('objectName'));
      }
      if (util.isNull(objectRecordId)) {
        return handle(util.message('objectRecordId'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.objectName = objectName;

      var resourcePath = 'identity/v2/auth/customobject/' + objectRecordId;

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to remove the specified Custom Object data using ObjectRecordId of a specified account.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {objectName} LoginRadius Custom Object Name
    * @param {objectRecordId} Unique identifier of the user's record in Custom Object
    * @return Response containing Definition of Delete Request
    * 6.5
    */
    deleteCustomObjectByToken : function (accessToken, objectName,
      objectRecordId, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(objectName)) {
        return handle(util.message('objectName'));
      }
      if (util.isNull(objectRecordId)) {
        return handle(util.message('objectRecordId'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.objectName = objectName;

      var resourcePath = 'identity/v2/auth/customobject/' + objectRecordId;

      return util.xhttpCall('DELETE', resourcePath, queryParameters, {}, handle);
    }, 
  }  
  module.customRegistrationDataApi = {};  
  module.customRegistrationDataApi = { 
    /**
    * This API is used to retrieve dropdown data.
    * @param {type} Type of the Datasource
    * @param {limit} Retrieve number of records at a time(max limit is 50)
    * @param {parentId} Id of parent dropdown member(if any).
    * @param {skip} Skip number of records from start
    * @return Complete user Registration data
    * 7.1
    */
    authGetRegistrationData : function (type, limit,
      parentId, skip, handle) {
      if (util.isNull(type)) {
        return handle(util.message('type'));
      }
      var queryParameters = {};

      if (limit !== null) {
        queryParameters.limit = limit;
      }
      if (!util.isNull(parentId)) {
        queryParameters.parentId = parentId;
      }
      if (skip !== null) {
        queryParameters.skip = skip;
      }

      var resourcePath = 'identity/v2/auth/registrationdata/' + type;

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API allows you to validate code for a particular dropdown member.
    * @param {code} Secret Code
    * @param {recordId} Selected dropdown item’s record id
    * @return Response containing Definition of Complete Validation data
    * 7.2
    */
    validateRegistrationDataCode : function (code, recordId, handle) {
      if (util.isNull(code)) {
        return handle(util.message('code'));
      }
      if (util.isNull(recordId)) {
        return handle(util.message('recordId'));
      }
      var queryParameters = {};


      var bodyParameters = {};
      bodyParameters.code = code;
      bodyParameters.recordId = recordId;

      var resourcePath = 'identity/v2/auth/registrationdata/validatecode';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    }, 
  }  
  module.smartLoginApi = {};  
  module.smartLoginApi = { 
    /**
    * This API verifies the provided token for Smart Login
    * @param {verificationToken} Verification token received in the email
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Complete verified response data
    * 8.4.1
    */
    smartLoginTokenVerification : function (verificationToken, welcomeEmailTemplate, handle) {
      if (util.isNull(verificationToken)) {
        return handle(util.message('verificationToken'));
      }
      var queryParameters = {};

      queryParameters.verificationToken = verificationToken;
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/email/smartlogin';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API sends a Smart Login link to the user's Email Id.
    * @param {clientGuid} Unique string used in the Smart Login request
    * @param {email} Email of the user
    * @param {redirectUrl} Url where the user will redirect after success authentication
    * @param {smartLoginEmailTemplate} Email template for Smart Login link
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Response containing Definition of Complete Validation data
    * 9.17.1
    */
    smartLoginByEmail : function (clientGuid, email,
      redirectUrl, smartLoginEmailTemplate, welcomeEmailTemplate, handle) {
      if (util.isNull(clientGuid)) {
        return handle(util.message('clientGuid'));
      }
      if (util.isNull(email)) {
        return handle(util.message('email'));
      }
      var queryParameters = {};

      queryParameters.clientGuid = clientGuid;
      queryParameters.email = email;
      if (!util.isNull(redirectUrl)) {
        queryParameters.redirectUrl = redirectUrl;
      }
      if (!util.isNull(smartLoginEmailTemplate)) {
        queryParameters.smartLoginEmailTemplate = smartLoginEmailTemplate;
      }
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/login/smartlogin';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API sends a Smart Login link to the user's Email Id.
    * @param {clientGuid} Unique string used in the Smart Login request
    * @param {username} UserName of the user
    * @param {redirectUrl} Url where the user will redirect after success authentication
    * @param {smartLoginEmailTemplate} Email template for Smart Login link
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Response containing Definition of Complete Validation data
    * 9.17.2
    */
    smartLoginByUserName : function (clientGuid, username,
      redirectUrl, smartLoginEmailTemplate, welcomeEmailTemplate, handle) {
      if (util.isNull(clientGuid)) {
        return handle(util.message('clientGuid'));
      }
      if (util.isNull(username)) {
        return handle(util.message('username'));
      }
      var queryParameters = {};

      queryParameters.clientGuid = clientGuid;
      queryParameters.username = username;
      if (!util.isNull(redirectUrl)) {
        queryParameters.redirectUrl = redirectUrl;
      }
      if (!util.isNull(smartLoginEmailTemplate)) {
        queryParameters.smartLoginEmailTemplate = smartLoginEmailTemplate;
      }
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/login/smartlogin';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to check if the Smart Login link has been clicked or not
    * @param {clientGuid} Unique string used in the Smart Login request
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @return Response containing User Profile Data and access token
    * 9.21.1
    */
    smartLoginPing : function (clientGuid, fields, handle) {
      if (util.isNull(clientGuid)) {
        return handle(util.message('clientGuid'));
      }
      var queryParameters = {};

      queryParameters.clientGuid = clientGuid;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'identity/v2/auth/login/smartlogin/ping';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    }, 
  }  
  module.phoneAuthenticationApi = {};  
  module.phoneAuthenticationApi = { 
    /**
    * This API retrieves a copy of the user data based on the Phone
    * @param {phoneAuthenticationModel} Model Class containing Definition of payload for PhoneAuthenticationModel API
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {loginUrl} Url where the user is logging from
    * @param {smsTemplate} SMS Template name
    * @return Response containing User Profile Data and access token
    * 9.2.3
    */
    loginByPhone : function (phoneAuthenticationModel, fields,
      loginUrl, smsTemplate, handle) {
      if (util.checkJson(phoneAuthenticationModel)) {
        return handle(util.message('phoneAuthenticationModel'));
      }
      var queryParameters = {};

      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(loginUrl)) {
        queryParameters.loginUrl = loginUrl;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var resourcePath = 'identity/v2/auth/login';

      return util.xhttpCall('POST', resourcePath, queryParameters, phoneAuthenticationModel, handle);
    },
    /**
    * This API is used to send the OTP to reset the account password.
    * @param {phone} New Phone Number
    * @param {smsTemplate} SMS Template name
    * @return Response Containing Validation Data and SMS Data
    * 10.4
    */
    forgotPasswordByPhoneOTP : function (phone, smsTemplate, handle) {
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var bodyParameters = {};
      bodyParameters.phone = phone;

      var resourcePath = 'identity/v2/auth/password/otp';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to reset the password
    * @param {resetPasswordByOTPModel} Model Class containing Definition of payload for ResetPasswordByOTP API
    * @return Response containing Definition of Complete Validation data
    * 10.5
    */
    resetPasswordByPhoneOTP : function (resetPasswordByOTPModel, handle) {
      if (util.checkJson(resetPasswordByOTPModel)) {
        return handle(util.message('resetPasswordByOTPModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/password/otp';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPasswordByOTPModel, handle);
    },
    /**
    * This API is used to validate the verification code sent to verify a user's phone number
    * @param {otp} The Verification Code
    * @param {phone} New Phone Number
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {smsTemplate} SMS Template name
    * @return Response containing User Profile Data and access token
    * 11.1.1
    */
    phoneVerificationByOTP : function (otp, phone,
      fields, smsTemplate, handle) {
      if (util.isNull(otp)) {
        return handle(util.message('otp'));
      }
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      queryParameters.otp = otp;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var bodyParameters = {};
      bodyParameters.phone = phone;

      var resourcePath = 'identity/v2/auth/phone/otp';

      return util.xhttpCall('PUT', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to consume the verification code sent to verify a user's phone number. Use this call for front-end purposes in cases where the user is already logged in by passing the user's access token.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {otp} The Verification Code
    * @param {smsTemplate} SMS Template name
    * @return Response containing Definition of Complete Validation data
    * 11.1.2
    */
    phoneVerificationOTPByAccessToken : function (accessToken, otp,
      smsTemplate, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(otp)) {
        return handle(util.message('otp'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.otp = otp;
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var resourcePath = 'identity/v2/auth/phone/otp';

      return util.xhttpCall('PUT', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to resend a verification OTP to verify a user's Phone Number. The user will receive a verification code that they will need to input
    * @param {phone} New Phone Number
    * @param {smsTemplate} SMS Template name
    * @return Response Containing Validation Data and SMS Data
    * 11.2.1
    */
    phoneResendVerificationOTP : function (phone, smsTemplate, handle) {
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var bodyParameters = {};
      bodyParameters.phone = phone;

      var resourcePath = 'identity/v2/auth/phone/otp';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to resend a verification OTP to verify a user's Phone Number in cases in which an active token already exists
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {phone} New Phone Number
    * @param {smsTemplate} SMS Template name
    * @return Response Containing Validation Data and SMS Data
    * 11.2.2
    */
    phoneResendVerificationOTPByToken : function (accessToken, phone,
      smsTemplate, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var bodyParameters = {};
      bodyParameters.phone = phone;

      var resourcePath = 'identity/v2/auth/phone/otp';

      return util.xhttpCall('POST', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to update the login Phone Number of users
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {phone} New Phone Number
    * @param {smsTemplate} SMS Template name
    * @return Response Containing Validation Data and SMS Data
    * 11.5
    */
    updatePhoneNumber : function (accessToken, phone,
      smsTemplate, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var bodyParameters = {};
      bodyParameters.phone = phone;

      var resourcePath = 'identity/v2/auth/phone';

      return util.xhttpCall('PUT', resourcePath, queryParameters, bodyParameters, handle);
    },
    /**
    * This API is used to check the Phone Number exists or not on your site.
    * @param {phone} The Registered Phone Number
    * @return Response containing Definition Complete ExistResponse data
    * 11.6
    */
    checkPhoneNumberAvailability : function (phone, handle) {
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      queryParameters.phone = phone;

      var resourcePath = 'identity/v2/auth/phone';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to delete the Phone ID on a user's account via the access token
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response containing Definition of Delete Request
    * 11.7
    */
    removePhoneIDByAccessToken : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/phone';

      return util.xhttpCall('DELETE', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API registers the new users into your Cloud Storage and triggers the phone verification process.
    * @param {authUserRegistrationModel} Model Class containing Definition of payload for Auth User Registration API
    * @param {sott} LoginRadius Secured One Time Token
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {options} PreventVerificationEmail (Specifying this value prevents the verification email from being sent. Only applicable if you have the optional email verification flow)
    * @param {smsTemplate} SMS Template name
    * @param {verificationUrl} Email verification url
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Response containing Definition of Complete Validation, UserProfile data and Access Token
    * 17.1.2
    */
    userRegistrationByPhone : function (authUserRegistrationModel, sott,
      fields, options, smsTemplate, verificationUrl, welcomeEmailTemplate, handle) {
      if (util.checkJson(authUserRegistrationModel)) {
        return handle(util.message('authUserRegistrationModel'));
      }
      if (util.isNull(sott)) {
        return handle(util.message('sott'));
      }
      var queryParameters = {};

      queryParameters.sott = sott;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(options)) {
        queryParameters.options = options;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/register';

      return util.xhttpCall('POST', resourcePath, queryParameters, authUserRegistrationModel, handle);
    }, 
  }  
  module.riskBasedAuthenticationApi = {};  
  module.riskBasedAuthenticationApi = { 
    /**
    * This API retrieves a copy of the user data based on the Email
    * @param {emailAuthenticationModel} Model Class containing Definition of payload for Email Authentication API
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {loginUrl} Url where the user is logging from
    * @param {passwordDelegation} Password Delegation Allows you to use a third-party service to store your passwords rather than LoginRadius Cloud storage.
    * @param {passwordDelegationApp} RiskBased Authentication Password Delegation App
    * @param {rbaBrowserEmailTemplate} Risk Based Authentication Browser EmailTemplate
    * @param {rbaBrowserSmsTemplate} Risk Based Authentication Browser Sms Template
    * @param {rbaCityEmailTemplate} Risk Based Authentication City Email Template
    * @param {rbaCitySmsTemplate} Risk Based Authentication City SmsTemplate
    * @param {rbaCountryEmailTemplate} Risk Based Authentication Country EmailTemplate
    * @param {rbaCountrySmsTemplate} Risk Based Authentication Country SmsTemplate
    * @param {rbaIpEmailTemplate} Risk Based Authentication Ip EmailTemplate
    * @param {rbaIpSmsTemplate} Risk Based Authentication Ip SmsTemplate
    * @param {rbaOneclickEmailTemplate} Risk Based Authentication Oneclick EmailTemplate
    * @param {rbaOTPSmsTemplate} Risk Based Authentication Oneclick EmailTemplate
    * @param {smsTemplate} SMS Template name
    * @param {verificationUrl} Email verification url
    * @return Response containing User Profile Data and access token
    * 9.2.4
    */
    rbaLoginByEmail : function (emailAuthenticationModel, emailTemplate,
      fields, loginUrl, passwordDelegation, passwordDelegationApp, rbaBrowserEmailTemplate,
      rbaBrowserSmsTemplate, rbaCityEmailTemplate, rbaCitySmsTemplate, rbaCountryEmailTemplate,
      rbaCountrySmsTemplate, rbaIpEmailTemplate, rbaIpSmsTemplate, rbaOneclickEmailTemplate,
      rbaOTPSmsTemplate, smsTemplate, verificationUrl, handle) {
      if (util.checkJson(emailAuthenticationModel)) {
        return handle(util.message('emailAuthenticationModel'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(loginUrl)) {
        queryParameters.loginUrl = loginUrl;
      }
      if (passwordDelegation !== null) {
        queryParameters.passwordDelegation = passwordDelegation;
      }
      if (!util.isNull(passwordDelegationApp)) {
        queryParameters.passwordDelegationApp = passwordDelegationApp;
      }
      if (!util.isNull(rbaBrowserEmailTemplate)) {
        queryParameters.rbaBrowserEmailTemplate = rbaBrowserEmailTemplate;
      }
      if (!util.isNull(rbaBrowserSmsTemplate)) {
        queryParameters.rbaBrowserSmsTemplate = rbaBrowserSmsTemplate;
      }
      if (!util.isNull(rbaCityEmailTemplate)) {
        queryParameters.rbaCityEmailTemplate = rbaCityEmailTemplate;
      }
      if (!util.isNull(rbaCitySmsTemplate)) {
        queryParameters.rbaCitySmsTemplate = rbaCitySmsTemplate;
      }
      if (!util.isNull(rbaCountryEmailTemplate)) {
        queryParameters.rbaCountryEmailTemplate = rbaCountryEmailTemplate;
      }
      if (!util.isNull(rbaCountrySmsTemplate)) {
        queryParameters.rbaCountrySmsTemplate = rbaCountrySmsTemplate;
      }
      if (!util.isNull(rbaIpEmailTemplate)) {
        queryParameters.rbaIpEmailTemplate = rbaIpEmailTemplate;
      }
      if (!util.isNull(rbaIpSmsTemplate)) {
        queryParameters.rbaIpSmsTemplate = rbaIpSmsTemplate;
      }
      if (!util.isNull(rbaOneclickEmailTemplate)) {
        queryParameters.rbaOneclickEmailTemplate = rbaOneclickEmailTemplate;
      }
      if (!util.isNull(rbaOTPSmsTemplate)) {
        queryParameters.rbaOTPSmsTemplate = rbaOTPSmsTemplate;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var resourcePath = 'identity/v2/auth/login';

      return util.xhttpCall('POST', resourcePath, queryParameters, emailAuthenticationModel, handle);
    },
    /**
    * This API retrieves a copy of the user data based on the Username
    * @param {userNameAuthenticationModel} Model Class containing Definition of payload for Username Authentication API
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {loginUrl} Url where the user is logging from
    * @param {passwordDelegation} Password Delegation Allows you to use a third-party service to store your passwords rather than LoginRadius Cloud storage.
    * @param {passwordDelegationApp} RiskBased Authentication Password Delegation App
    * @param {rbaBrowserEmailTemplate} Risk Based Authentication Browser EmailTemplate
    * @param {rbaBrowserSmsTemplate} Risk Based Authentication Browser Sms Template
    * @param {rbaCityEmailTemplate} Risk Based Authentication City Email Template
    * @param {rbaCitySmsTemplate} Risk Based Authentication City SmsTemplate
    * @param {rbaCountryEmailTemplate} Risk Based Authentication Country EmailTemplate
    * @param {rbaCountrySmsTemplate} Risk Based Authentication Country SmsTemplate
    * @param {rbaIpEmailTemplate} Risk Based Authentication Ip EmailTemplate
    * @param {rbaIpSmsTemplate} Risk Based Authentication Ip SmsTemplate
    * @param {rbaOneclickEmailTemplate} Risk Based Authentication Oneclick EmailTemplate
    * @param {rbaOTPSmsTemplate} Risk Based Authentication OTPSmsTemplate
    * @param {smsTemplate} SMS Template name
    * @param {verificationUrl} Email verification url
    * @return Response containing User Profile Data and access token
    * 9.2.5
    */
    rbaLoginByUserName : function (userNameAuthenticationModel, emailTemplate,
      fields, loginUrl, passwordDelegation, passwordDelegationApp, rbaBrowserEmailTemplate,
      rbaBrowserSmsTemplate, rbaCityEmailTemplate, rbaCitySmsTemplate, rbaCountryEmailTemplate,
      rbaCountrySmsTemplate, rbaIpEmailTemplate, rbaIpSmsTemplate, rbaOneclickEmailTemplate,
      rbaOTPSmsTemplate, smsTemplate, verificationUrl, handle) {
      if (util.checkJson(userNameAuthenticationModel)) {
        return handle(util.message('userNameAuthenticationModel'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(loginUrl)) {
        queryParameters.loginUrl = loginUrl;
      }
      if (passwordDelegation !== null) {
        queryParameters.passwordDelegation = passwordDelegation;
      }
      if (!util.isNull(passwordDelegationApp)) {
        queryParameters.passwordDelegationApp = passwordDelegationApp;
      }
      if (!util.isNull(rbaBrowserEmailTemplate)) {
        queryParameters.rbaBrowserEmailTemplate = rbaBrowserEmailTemplate;
      }
      if (!util.isNull(rbaBrowserSmsTemplate)) {
        queryParameters.rbaBrowserSmsTemplate = rbaBrowserSmsTemplate;
      }
      if (!util.isNull(rbaCityEmailTemplate)) {
        queryParameters.rbaCityEmailTemplate = rbaCityEmailTemplate;
      }
      if (!util.isNull(rbaCitySmsTemplate)) {
        queryParameters.rbaCitySmsTemplate = rbaCitySmsTemplate;
      }
      if (!util.isNull(rbaCountryEmailTemplate)) {
        queryParameters.rbaCountryEmailTemplate = rbaCountryEmailTemplate;
      }
      if (!util.isNull(rbaCountrySmsTemplate)) {
        queryParameters.rbaCountrySmsTemplate = rbaCountrySmsTemplate;
      }
      if (!util.isNull(rbaIpEmailTemplate)) {
        queryParameters.rbaIpEmailTemplate = rbaIpEmailTemplate;
      }
      if (!util.isNull(rbaIpSmsTemplate)) {
        queryParameters.rbaIpSmsTemplate = rbaIpSmsTemplate;
      }
      if (!util.isNull(rbaOneclickEmailTemplate)) {
        queryParameters.rbaOneclickEmailTemplate = rbaOneclickEmailTemplate;
      }
      if (!util.isNull(rbaOTPSmsTemplate)) {
        queryParameters.rbaOTPSmsTemplate = rbaOTPSmsTemplate;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var resourcePath = 'identity/v2/auth/login';

      return util.xhttpCall('POST', resourcePath, queryParameters, userNameAuthenticationModel, handle);
    },
    /**
    * This API retrieves a copy of the user data based on the Phone
    * @param {phoneAuthenticationModel} Model Class containing Definition of payload for PhoneAuthenticationModel API
    * @param {emailTemplate} Email template name
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {loginUrl} Url where the user is logging from
    * @param {passwordDelegation} Password Delegation Allows you to use a third-party service to store your passwords rather than LoginRadius Cloud storage.
    * @param {passwordDelegationApp} RiskBased Authentication Password Delegation App
    * @param {rbaBrowserEmailTemplate} Risk Based Authentication Browser EmailTemplate
    * @param {rbaBrowserSmsTemplate} Risk Based Authentication Browser Sms Template
    * @param {rbaCityEmailTemplate} Risk Based Authentication City Email Template
    * @param {rbaCitySmsTemplate} Risk Based Authentication City SmsTemplate
    * @param {rbaCountryEmailTemplate} Risk Based Authentication Country EmailTemplate
    * @param {rbaCountrySmsTemplate} Risk Based Authentication Country SmsTemplate
    * @param {rbaIpEmailTemplate} Risk Based Authentication Ip EmailTemplate
    * @param {rbaIpSmsTemplate} Risk Based Authentication Ip SmsTemplate
    * @param {rbaOneclickEmailTemplate} Risk Based Authentication Oneclick EmailTemplate
    * @param {rbaOTPSmsTemplate} Risk Based Authentication OTPSmsTemplate
    * @param {smsTemplate} SMS Template name
    * @param {verificationUrl} Email verification url
    * @return Response containing User Profile Data and access token
    * 9.2.6
    */
    rbaLoginByPhone : function (phoneAuthenticationModel, emailTemplate,
      fields, loginUrl, passwordDelegation, passwordDelegationApp, rbaBrowserEmailTemplate,
      rbaBrowserSmsTemplate, rbaCityEmailTemplate, rbaCitySmsTemplate, rbaCountryEmailTemplate,
      rbaCountrySmsTemplate, rbaIpEmailTemplate, rbaIpSmsTemplate, rbaOneclickEmailTemplate,
      rbaOTPSmsTemplate, smsTemplate, verificationUrl, handle) {
      if (util.checkJson(phoneAuthenticationModel)) {
        return handle(util.message('phoneAuthenticationModel'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(loginUrl)) {
        queryParameters.loginUrl = loginUrl;
      }
      if (passwordDelegation !== null) {
        queryParameters.passwordDelegation = passwordDelegation;
      }
      if (!util.isNull(passwordDelegationApp)) {
        queryParameters.passwordDelegationApp = passwordDelegationApp;
      }
      if (!util.isNull(rbaBrowserEmailTemplate)) {
        queryParameters.rbaBrowserEmailTemplate = rbaBrowserEmailTemplate;
      }
      if (!util.isNull(rbaBrowserSmsTemplate)) {
        queryParameters.rbaBrowserSmsTemplate = rbaBrowserSmsTemplate;
      }
      if (!util.isNull(rbaCityEmailTemplate)) {
        queryParameters.rbaCityEmailTemplate = rbaCityEmailTemplate;
      }
      if (!util.isNull(rbaCitySmsTemplate)) {
        queryParameters.rbaCitySmsTemplate = rbaCitySmsTemplate;
      }
      if (!util.isNull(rbaCountryEmailTemplate)) {
        queryParameters.rbaCountryEmailTemplate = rbaCountryEmailTemplate;
      }
      if (!util.isNull(rbaCountrySmsTemplate)) {
        queryParameters.rbaCountrySmsTemplate = rbaCountrySmsTemplate;
      }
      if (!util.isNull(rbaIpEmailTemplate)) {
        queryParameters.rbaIpEmailTemplate = rbaIpEmailTemplate;
      }
      if (!util.isNull(rbaIpSmsTemplate)) {
        queryParameters.rbaIpSmsTemplate = rbaIpSmsTemplate;
      }
      if (!util.isNull(rbaOneclickEmailTemplate)) {
        queryParameters.rbaOneclickEmailTemplate = rbaOneclickEmailTemplate;
      }
      if (!util.isNull(rbaOTPSmsTemplate)) {
        queryParameters.rbaOTPSmsTemplate = rbaOTPSmsTemplate;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var resourcePath = 'identity/v2/auth/login';

      return util.xhttpCall('POST', resourcePath, queryParameters, phoneAuthenticationModel, handle);
    }, 
  }  
  module.passwordLessLoginApi = {};  
  module.passwordLessLoginApi = { 
    /**
    * This API verifies an account by OTP and allows the customer to login.
    * @param {passwordLessLoginOtpModel} Model Class containing Definition of payload for PasswordLessLoginOtpModel API
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {smsTemplate} SMS Template name
    * @return Response containing User Profile Data and access token
    * 9.6
    */
    passwordlessLoginPhoneVerification : function (passwordLessLoginOtpModel, fields,
      smsTemplate, handle) {
      if (util.checkJson(passwordLessLoginOtpModel)) {
        return handle(util.message('passwordLessLoginOtpModel'));
      }
      var queryParameters = {};

      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var resourcePath = 'identity/v2/auth/login/passwordlesslogin/otp/verify';

      return util.xhttpCall('PUT', resourcePath, queryParameters, passwordLessLoginOtpModel, handle);
    },
    /**
    * API can be used to send a One-time Passcode (OTP) provided that the account has a verified PhoneID
    * @param {phone} The Registered Phone Number
    * @param {smsTemplate} SMS Template name
    * @return Response Containing Definition of SMS Data
    * 9.15
    */
    passwordlessLoginByPhone : function (phone, smsTemplate, handle) {
      if (util.isNull(phone)) {
        return handle(util.message('phone'));
      }
      var queryParameters = {};

      queryParameters.phone = phone;
      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var resourcePath = 'identity/v2/auth/login/passwordlesslogin/otp';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to send a Passwordless Login verification link to the provided Email ID
    * @param {email} Email of the user
    * @param {passwordLessLoginTemplate} Passwordless Login Template Name
    * @param {verificationUrl} Email verification url
    * @return Response containing Definition of Complete Validation data
    * 9.18.1
    */
    passwordlessLoginByEmail : function (email, passwordLessLoginTemplate,
      verificationUrl, handle) {
      if (util.isNull(email)) {
        return handle(util.message('email'));
      }
      var queryParameters = {};

      queryParameters.email = email;
      if (!util.isNull(passwordLessLoginTemplate)) {
        queryParameters.passwordLessLoginTemplate = passwordLessLoginTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var resourcePath = 'identity/v2/auth/login/passwordlesslogin/email';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to send a Passwordless Login Verification Link to a customer by providing their UserName
    * @param {username} UserName of the user
    * @param {passwordLessLoginTemplate} Passwordless Login Template Name
    * @param {verificationUrl} Email verification url
    * @return Response containing Definition of Complete Validation data
    * 9.18.2
    */
    passwordlessLoginByUserName : function (username, passwordLessLoginTemplate,
      verificationUrl, handle) {
      if (util.isNull(username)) {
        return handle(util.message('username'));
      }
      var queryParameters = {};

      queryParameters.username = username;
      if (!util.isNull(passwordLessLoginTemplate)) {
        queryParameters.passwordLessLoginTemplate = passwordLessLoginTemplate;
      }
      if (!util.isNull(verificationUrl)) {
        queryParameters.verificationUrl = verificationUrl;
      }

      var resourcePath = 'identity/v2/auth/login/passwordlesslogin/email';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to verify the Passwordless Login verification link. Note: If you are using Passwordless Login by Phone you will need to use the Passwordless Login Phone Verification API
    * @param {verificationToken} Verification token received in the email
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @param {welcomeEmailTemplate} Name of the welcome email template
    * @return Response containing User Profile Data and access token
    * 9.19
    */
    passwordlessLoginVerification : function (verificationToken, fields,
      welcomeEmailTemplate, handle) {
      if (util.isNull(verificationToken)) {
        return handle(util.message('verificationToken'));
      }
      var queryParameters = {};

      queryParameters.verificationToken = verificationToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }
      if (!util.isNull(welcomeEmailTemplate)) {
        queryParameters.welcomeEmailTemplate = welcomeEmailTemplate;
      }

      var resourcePath = 'identity/v2/auth/login/passwordlesslogin/email/verify';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * 
    * @param {passwordLessLoginByEmailAndOtpModel} 
    * @param {fields} 
    * @return Response containing User Profile Data and access token
    * 9.23
    */
    passwordlessLoginVerificationByEmailAndOTP : function (passwordLessLoginByEmailAndOtpModel, fields, handle) {
      if (util.checkJson(passwordLessLoginByEmailAndOtpModel)) {
        return handle(util.message('passwordLessLoginByEmailAndOtpModel'));
      }
      var queryParameters = {};

      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'identity/v2/auth/login/passwordlesslogin/email/verifyotp';

      return util.xhttpCall('POST', resourcePath, queryParameters, passwordLessLoginByEmailAndOtpModel, handle);
    },
    /**
    * 
    * @param {passwordLessLoginByUserNameAndOtpModel} 
    * @param {fields} 
    * @return Response containing User Profile Data and access token
    * 9.24
    */
    passwordlessLoginVerificationByUserNameAndOTP : function (passwordLessLoginByUserNameAndOtpModel, fields, handle) {
      if (util.checkJson(passwordLessLoginByUserNameAndOtpModel)) {
        return handle(util.message('passwordLessLoginByUserNameAndOtpModel'));
      }
      var queryParameters = {};

      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'identity/v2/auth/login/passwordlesslogin/username/verifyotp';

      return util.xhttpCall('POST', resourcePath, queryParameters, passwordLessLoginByUserNameAndOtpModel, handle);
    }, 
  }  
  module.pinAuthenticationApi = {};  
  module.pinAuthenticationApi = { 
    /**
    * This API is used to login a user by pin and session token.
    * @param {loginByPINModel} Model Class containing Definition of payload for LoginByPin API
    * @param {sessionToken} Session Token of user
    * @return Response containing User Profile Data and access token
    * 9.22
    */
    pinLogin : function (loginByPINModel, sessionToken, handle) {
      if (util.checkJson(loginByPINModel)) {
        return handle(util.message('loginByPINModel'));
      }
      if (util.isNull(sessionToken)) {
        return handle(util.message('sessionToken'));
      }
      var queryParameters = {};

      queryParameters.session_token = sessionToken;

      var resourcePath = 'identity/v2/auth/login/pin';

      return util.xhttpCall('POST', resourcePath, queryParameters, loginByPINModel, handle);
    },
    /**
    * This API sends the reset pin email to specified email address.
    * @param {forgotPINLinkByEmailModel} Model Class containing Definition for Forgot Pin Link By Email API
    * @param {emailTemplate} Email template name
    * @param {resetPINUrl} Reset PIN Url
    * @return Response containing Definition of Complete Validation data
    * 42.1
    */
    sendForgotPINEmailByEmail : function (forgotPINLinkByEmailModel, emailTemplate,
      resetPINUrl, handle) {
      if (util.checkJson(forgotPINLinkByEmailModel)) {
        return handle(util.message('forgotPINLinkByEmailModel'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(resetPINUrl)) {
        queryParameters.resetPINUrl = resetPINUrl;
      }

      var resourcePath = 'identity/v2/auth/pin/forgot/email';

      return util.xhttpCall('POST', resourcePath, queryParameters, forgotPINLinkByEmailModel, handle);
    },
    /**
    * This API sends the reset pin email using username.
    * @param {forgotPINLinkByUserNameModel} Model Class containing Definition for Forgot Pin Link By UserName API
    * @param {emailTemplate} Email template name
    * @param {resetPINUrl} Reset PIN Url
    * @return Response containing Definition of Complete Validation data
    * 42.2
    */
    sendForgotPINEmailByUsername : function (forgotPINLinkByUserNameModel, emailTemplate,
      resetPINUrl, handle) {
      if (util.checkJson(forgotPINLinkByUserNameModel)) {
        return handle(util.message('forgotPINLinkByUserNameModel'));
      }
      var queryParameters = {};

      if (!util.isNull(emailTemplate)) {
        queryParameters.emailTemplate = emailTemplate;
      }
      if (!util.isNull(resetPINUrl)) {
        queryParameters.resetPINUrl = resetPINUrl;
      }

      var resourcePath = 'identity/v2/auth/pin/forgot/username';

      return util.xhttpCall('POST', resourcePath, queryParameters, forgotPINLinkByUserNameModel, handle);
    },
    /**
    * This API is used to reset pin using reset token.
    * @param {resetPINByResetToken} Model Class containing Definition of payload for Reset Pin By Reset Token API
    * @return Response containing Definition of Complete Validation data
    * 42.3
    */
    resetPINByResetToken : function (resetPINByResetToken, handle) {
      if (util.checkJson(resetPINByResetToken)) {
        return handle(util.message('resetPINByResetToken'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/pin/reset/token';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPINByResetToken, handle);
    },
    /**
    * This API is used to reset pin using security question answer and email.
    * @param {resetPINBySecurityQuestionAnswerAndEmailModel} Model Class containing Definition of payload for Reset Pin By Security Question and Email API
    * @return Response containing Definition of Complete Validation data
    * 42.4
    */
    resetPINByEmailAndSecurityAnswer : function (resetPINBySecurityQuestionAnswerAndEmailModel, handle) {
      if (util.checkJson(resetPINBySecurityQuestionAnswerAndEmailModel)) {
        return handle(util.message('resetPINBySecurityQuestionAnswerAndEmailModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/pin/reset/securityanswer/email';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPINBySecurityQuestionAnswerAndEmailModel, handle);
    },
    /**
    * This API is used to reset pin using security question answer and username.
    * @param {resetPINBySecurityQuestionAnswerAndUsernameModel} Model Class containing Definition of payload for Reset Pin By Security Question and UserName API
    * @return Response containing Definition of Complete Validation data
    * 42.5
    */
    resetPINByUsernameAndSecurityAnswer : function (resetPINBySecurityQuestionAnswerAndUsernameModel, handle) {
      if (util.checkJson(resetPINBySecurityQuestionAnswerAndUsernameModel)) {
        return handle(util.message('resetPINBySecurityQuestionAnswerAndUsernameModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/pin/reset/securityanswer/username';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPINBySecurityQuestionAnswerAndUsernameModel, handle);
    },
    /**
    * This API is used to reset pin using security question answer and phone.
    * @param {resetPINBySecurityQuestionAnswerAndPhoneModel} Model Class containing Definition of payload for Reset Pin By Security Question and Phone API
    * @return Response containing Definition of Complete Validation data
    * 42.6
    */
    resetPINByPhoneAndSecurityAnswer : function (resetPINBySecurityQuestionAnswerAndPhoneModel, handle) {
      if (util.checkJson(resetPINBySecurityQuestionAnswerAndPhoneModel)) {
        return handle(util.message('resetPINBySecurityQuestionAnswerAndPhoneModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/pin/reset/securityanswer/phone';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPINBySecurityQuestionAnswerAndPhoneModel, handle);
    },
    /**
    * This API sends the OTP to specified phone number
    * @param {forgotPINOtpByPhoneModel} Model Class containing Definition for Forgot Pin Otp By Phone API
    * @param {smsTemplate} 
    * @return Response Containing Validation Data and SMS Data
    * 42.7
    */
    sendForgotPINSMSByPhone : function (forgotPINOtpByPhoneModel, smsTemplate, handle) {
      if (util.checkJson(forgotPINOtpByPhoneModel)) {
        return handle(util.message('forgotPINOtpByPhoneModel'));
      }
      var queryParameters = {};

      if (!util.isNull(smsTemplate)) {
        queryParameters.smsTemplate = smsTemplate;
      }

      var resourcePath = 'identity/v2/auth/pin/forgot/otp';

      return util.xhttpCall('POST', resourcePath, queryParameters, forgotPINOtpByPhoneModel, handle);
    },
    /**
    * This API is used to change a user's PIN using access token.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {changePINModel} Model Class containing Definition for change PIN Property
    * @return Response containing Definition of Complete Validation data
    * 42.8
    */
    changePINByAccessToken : function (accessToken, changePINModel, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(changePINModel)) {
        return handle(util.message('changePINModel'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/pin/change';

      return util.xhttpCall('PUT', resourcePath, queryParameters, changePINModel, handle);
    },
    /**
    * This API is used to reset pin using phoneId and OTP.
    * @param {resetPINByPhoneAndOTPModel} Model Class containing Definition of payload for Reset Pin By Phone and Otp API
    * @return Response containing Definition of Complete Validation data
    * 42.9
    */
    resetPINByPhoneAndOtp : function (resetPINByPhoneAndOTPModel, handle) {
      if (util.checkJson(resetPINByPhoneAndOTPModel)) {
        return handle(util.message('resetPINByPhoneAndOTPModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/pin/reset/otp/phone';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPINByPhoneAndOTPModel, handle);
    },
    /**
    * This API is used to reset pin using email and OTP.
    * @param {resetPINByEmailAndOtpModel} Model Class containing Definition of payload for Reset Pin By Email and Otp API
    * @return Response containing Definition of Complete Validation data
    * 42.10
    */
    resetPINByEmailAndOtp : function (resetPINByEmailAndOtpModel, handle) {
      if (util.checkJson(resetPINByEmailAndOtpModel)) {
        return handle(util.message('resetPINByEmailAndOtpModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/pin/reset/otp/email';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPINByEmailAndOtpModel, handle);
    },
    /**
    * This API is used to reset pin using username and OTP.
    * @param {resetPINByUsernameAndOtpModel} Model Class containing Definition of payload for Reset Pin By Username and Otp API
    * @return Response containing Definition of Complete Validation data
    * 42.11
    */
    resetPINByUsernameAndOtp : function (resetPINByUsernameAndOtpModel, handle) {
      if (util.checkJson(resetPINByUsernameAndOtpModel)) {
        return handle(util.message('resetPINByUsernameAndOtpModel'));
      }
      var queryParameters = {};


      var resourcePath = 'identity/v2/auth/pin/reset/otp/username';

      return util.xhttpCall('PUT', resourcePath, queryParameters, resetPINByUsernameAndOtpModel, handle);
    },
    /**
    * This API is used to change a user's PIN using Pin Auth token.
    * @param {pINRequiredModel} Model Class containing Definition for PIN
    * @param {pinAuthToken} Pin Auth Token
    * @return Response containing User Profile Data and access token
    * 42.12
    */
    setPINByPinAuthToken : function (pINRequiredModel, pinAuthToken, handle) {
      if (util.checkJson(pINRequiredModel)) {
        return handle(util.message('pINRequiredModel'));
      }
      if (util.isNull(pinAuthToken)) {
        return handle(util.message('pinAuthToken'));
      }
      var queryParameters = {};

      queryParameters.pinAuthToken = pinAuthToken;

      var resourcePath = 'identity/v2/auth/pin/set/pinauthtoken';

      return util.xhttpCall('POST', resourcePath, queryParameters, pINRequiredModel, handle);
    },
    /**
    * This API is used to invalidate pin session token.
    * @param {sessionToken} Session Token of user
    * @return Response containing Definition of Complete Validation data
    * 44.1
    */
    inValidatePinSessionToken : function (sessionToken, handle) {
      if (util.isNull(sessionToken)) {
        return handle(util.message('sessionToken'));
      }
      var queryParameters = {};

      queryParameters.session_token = sessionToken;

      var resourcePath = 'identity/v2/auth/session_token/invalidate';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    }, 
  }  
  module.reAuthenticationApi = {};  
  module.reAuthenticationApi = { 
    /**
    * This API is used to trigger the Multi-Factor Autentication workflow for the provided access token
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {smsTemplate2FA} SMS Template Name
    * @return Response containing Definition of Complete Multi-Factor Authentication Settings data
    * 14.3
    */
    mfaReAuthenticate : function (accessToken, smsTemplate2FA, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }

      var resourcePath = 'identity/v2/auth/account/reauth/2fa';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to re-authenticate via Multi-factor authentication by passing the One Time Password received via SMS
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {reauthByOtpModel} Model Class containing Definition for MFA Reauthentication by OTP
    * @return Complete user Multi-Factor Authentication Token data
    * 14.4
    */
    mfaReAuthenticateByOTP : function (accessToken, reauthByOtpModel, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(reauthByOtpModel)) {
        return handle(util.message('reauthByOtpModel'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/account/reauth/2fa/otp';

      return util.xhttpCall('PUT', resourcePath, queryParameters, reauthByOtpModel, handle);
    },
    /**
    * This API is used to re-authenticate by set of backup codes via access token on the site that has Multi-factor authentication enabled in re-authentication for the user that does not have the device
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {reauthByBackupCodeModel} Model Class containing Definition for MFA Reauthentication by Backup code
    * @return Complete user Multi-Factor Authentication Token data
    * 14.5
    */
    mfaReAuthenticateByBackupCode : function (accessToken, reauthByBackupCodeModel, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(reauthByBackupCodeModel)) {
        return handle(util.message('reauthByBackupCodeModel'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/account/reauth/2fa/backupcode';

      return util.xhttpCall('PUT', resourcePath, queryParameters, reauthByBackupCodeModel, handle);
    },
    /**
    * This API is used to re-authenticate via Multi-factor-authentication by passing the google authenticator code
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {reauthByGoogleAuthenticatorCodeModel} Model Class containing Definition for MFA Reauthentication by Google Authenticator
    * @return Complete user Multi-Factor Authentication Token data
    * 14.6
    */
    mfaReAuthenticateByGoogleAuth : function (accessToken, reauthByGoogleAuthenticatorCodeModel, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(reauthByGoogleAuthenticatorCodeModel)) {
        return handle(util.message('reauthByGoogleAuthenticatorCodeModel'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/account/reauth/2fa/googleauthenticatorcode';

      return util.xhttpCall('PUT', resourcePath, queryParameters, reauthByGoogleAuthenticatorCodeModel, handle);
    },
    /**
    * This API is used to re-authenticate via Multi-factor-authentication by passing the password
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {passwordEventBasedAuthModelWithLockout} Model Class containing Definition of payload for PasswordEventBasedAuthModel with Lockout API
    * @param {smsTemplate2FA} SMS Template Name
    * @return Complete user Multi-Factor Authentication Token data
    * 14.7
    */
    mfaReAuthenticateByPassword : function (accessToken, passwordEventBasedAuthModelWithLockout,
      smsTemplate2FA, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(passwordEventBasedAuthModelWithLockout)) {
        return handle(util.message('passwordEventBasedAuthModelWithLockout'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }

      var resourcePath = 'identity/v2/auth/account/reauth/password';

      return util.xhttpCall('PUT', resourcePath, queryParameters, passwordEventBasedAuthModelWithLockout, handle);
    },
    /**
    * This API is used to validate the triggered MFA authentication flow with a password.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {pINAuthEventBasedAuthModelWithLockout} Model Class containing Definition of payload for PIN
    * @param {smsTemplate2FA} SMS Template Name
    * @return Response containing Definition response of MFA reauthentication
    * 42.13
    */
    verifyPINAuthentication : function (accessToken, pINAuthEventBasedAuthModelWithLockout,
      smsTemplate2FA, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(pINAuthEventBasedAuthModelWithLockout)) {
        return handle(util.message('pINAuthEventBasedAuthModelWithLockout'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(smsTemplate2FA)) {
        queryParameters.smsTemplate2FA = smsTemplate2FA;
      }

      var resourcePath = 'identity/v2/auth/account/reauth/pin';

      return util.xhttpCall('PUT', resourcePath, queryParameters, pINAuthEventBasedAuthModelWithLockout, handle);
    }, 
  }  
  module.nativeSocialApi = {};  
  module.nativeSocialApi = { 
    /**
    * The API is used to get LoginRadius access token by sending Facebook's access token. It will be valid for the specific duration of time specified in the response.
    * @param {fbAccessToken} Facebook Access Token
    * @param {socialAppName} Name of Social provider APP
    * @return Response containing Definition of Complete Token data
    * 20.3
    */
    getAccessTokenByFacebookAccessToken : function (fbAccessToken, socialAppName, handle) {
      if (util.isNull(fbAccessToken)) {
        return handle(util.message('fbAccessToken'));
      }
      var queryParameters = {};

      queryParameters.fb_Access_Token = fbAccessToken;
      if (!util.isNull(socialAppName)) {
        queryParameters.socialAppName = socialAppName;
      }

      var resourcePath = 'api/v2/access_token/facebook';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The API is used to get LoginRadius access token by sending Twitter's access token. It will be valid for the specific duration of time specified in the response.
    * @param {twAccessToken} Twitter Access Token
    * @param {twTokenSecret} Twitter Token Secret
    * @param {socialAppName} Name of Social provider APP
    * @return Response containing Definition of Complete Token data
    * 20.4
    */
    getAccessTokenByTwitterAccessToken : function (twAccessToken, twTokenSecret,
      socialAppName, handle) {
      if (util.isNull(twAccessToken)) {
        return handle(util.message('twAccessToken'));
      }
      if (util.isNull(twTokenSecret)) {
        return handle(util.message('twTokenSecret'));
      }
      var queryParameters = {};

      queryParameters.tw_Access_Token = twAccessToken;
      queryParameters.tw_Token_Secret = twTokenSecret;
      if (!util.isNull(socialAppName)) {
        queryParameters.socialAppName = socialAppName;
      }

      var resourcePath = 'api/v2/access_token/twitter';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The API is used to get LoginRadius access token by sending Google's access token. It will be valid for the specific duration of time specified in the response.
    * @param {googleAccessToken} Google Access Token
    * @param {clientId} Google Client ID
    * @param {refreshToken} LoginRadius refresh token
    * @param {socialAppName} Name of Social provider APP
    * @return Response containing Definition of Complete Token data
    * 20.5
    */
    getAccessTokenByGoogleAccessToken : function (googleAccessToken, clientId,
      refreshToken, socialAppName, handle) {
      if (util.isNull(googleAccessToken)) {
        return handle(util.message('googleAccessToken'));
      }
      var queryParameters = {};

      queryParameters.google_Access_Token = googleAccessToken;
      if (!util.isNull(clientId)) {
        queryParameters.client_id = clientId;
      }
      if (!util.isNull(refreshToken)) {
        queryParameters.refresh_token = refreshToken;
      }
      if (!util.isNull(socialAppName)) {
        queryParameters.socialAppName = socialAppName;
      }

      var resourcePath = 'api/v2/access_token/google';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to Get LoginRadius Access Token using google jwt id token for google native mobile login/registration.
    * @param {idToken} Google JWT id_token
    * @return Response containing Definition of Complete Token data
    * 20.6
    */
    getAccessTokenByGoogleJWTAccessToken : function (idToken, handle) {
      if (util.isNull(idToken)) {
        return handle(util.message('idToken'));
      }
      var queryParameters = {};

      queryParameters.id_Token = idToken;

      var resourcePath = 'api/v2/access_token/googlejwt';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The API is used to get LoginRadius access token by sending Linkedin's access token. It will be valid for the specific duration of time specified in the response.
    * @param {lnAccessToken} Linkedin Access Token
    * @param {socialAppName} Name of Social provider APP
    * @return Response containing Definition of Complete Token data
    * 20.7
    */
    getAccessTokenByLinkedinAccessToken : function (lnAccessToken, socialAppName, handle) {
      if (util.isNull(lnAccessToken)) {
        return handle(util.message('lnAccessToken'));
      }
      var queryParameters = {};

      queryParameters.ln_Access_Token = lnAccessToken;
      if (!util.isNull(socialAppName)) {
        queryParameters.socialAppName = socialAppName;
      }

      var resourcePath = 'api/v2/access_token/linkedin';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The API is used to get LoginRadius access token by sending Foursquare's access token. It will be valid for the specific duration of time specified in the response.
    * @param {fsAccessToken} Foursquare Access Token
    * @return Response containing Definition of Complete Token data
    * 20.8
    */
    getAccessTokenByFoursquareAccessToken : function (fsAccessToken, handle) {
      if (util.isNull(fsAccessToken)) {
        return handle(util.message('fsAccessToken'));
      }
      var queryParameters = {};

      queryParameters.fs_Access_Token = fsAccessToken;

      var resourcePath = 'api/v2/access_token/foursquare';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The API is used to get LoginRadius access token by sending a valid Apple ID OAuth Code. It will be valid for the specific duration of time specified in the response.
    * @param {code} Apple Code
    * @param {socialAppName} Name of Social provider APP
    * @return Response containing Definition of Complete Token data
    * 20.12
    */
    getAccessTokenByAppleIdCode : function (code, socialAppName, handle) {
      if (util.isNull(code)) {
        return handle(util.message('code'));
      }
      var queryParameters = {};

      queryParameters.code = code;
      if (!util.isNull(socialAppName)) {
        queryParameters.socialAppName = socialAppName;
      }

      var resourcePath = 'api/v2/access_token/apple';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is used to retrieve a LoginRadius access token by passing in a valid WeChat OAuth Code.
    * @param {code} WeChat Code
    * @return Response containing Definition of Complete Token data
    * 20.13
    */
    getAccessTokenByWeChatCode : function (code, handle) {
      if (util.isNull(code)) {
        return handle(util.message('code'));
      }
      var queryParameters = {};

      queryParameters.code = code;

      var resourcePath = 'api/v2/access_token/wechat';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The API is used to get LoginRadius access token by sending Vkontakte's access token. It will be valid for the specific duration of time specified in the response.
    * @param {vkAccessToken} Vkontakte Access Token
    * @return Response containing Definition of Complete Token data
    * 20.15
    */
    getAccessTokenByVkontakteAccessToken : function (vkAccessToken, handle) {
      if (util.isNull(vkAccessToken)) {
        return handle(util.message('vkAccessToken'));
      }
      var queryParameters = {};

      queryParameters.vk_access_token = vkAccessToken;

      var resourcePath = 'api/v2/access_token/vkontakte';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The API is used to get LoginRadius access token by sending Google's AuthCode. It will be valid for the specific duration of time specified in the response.
    * @param {googleAuthcode} Google AuthCode
    * @param {socialAppName} Name of Social provider APP
    * @return Response containing Definition of Complete Token data
    * 20.16
    */
    getAccessTokenByGoogleAuthCode : function (googleAuthcode, socialAppName, handle) {
      if (util.isNull(googleAuthcode)) {
        return handle(util.message('googleAuthcode'));
      }
      var queryParameters = {};

      queryParameters.google_authcode = googleAuthcode;
      if (!util.isNull(socialAppName)) {
        queryParameters.socialAppName = socialAppName;
      }

      var resourcePath = 'api/v2/access_token/google';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    }, 
  }  
  module.socialApi = {};  
  module.socialApi = { 
    /**
    * <b>Supported Providers:</b> Facebook, Google, Live, Vkontakte.<br><br> This API returns the photo albums associated with the passed in access tokens Social Profile.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response Containing List of Album Data
    * 22.2.1
    */
    getAlbums : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/album';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * <b>Supported Providers:</b> Facebook, Google, Live, Vkontakte.<br><br> This API returns the photo albums associated with the passed in access tokens Social Profile.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {nextCursor} Cursor value if not all contacts can be retrieved once.
    * @return Response Model containing Albums with next cursor
    * 22.2.2
    */
    getAlbumsWithCursor : function (accessToken, nextCursor, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(nextCursor)) {
        return handle(util.message('nextCursor'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.nextCursor = nextCursor;

      var resourcePath = 'api/v2/album';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Audio API is used to get audio files data from the user's social account.<br><br><b>Supported Providers:</b> Live, Vkontakte
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response Containing List of Audio Data
    * 24.2.1
    */
    getAudios : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/audio';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Audio API is used to get audio files data from the user's social account.<br><br><b>Supported Providers:</b> Live, Vkontakte
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {nextCursor} Cursor value if not all contacts can be retrieved once.
    * @return Response Model containing Audio with next cursor
    * 24.2.2
    */
    getAudiosWithCursor : function (accessToken, nextCursor, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(nextCursor)) {
        return handle(util.message('nextCursor'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.nextCursor = nextCursor;

      var resourcePath = 'api/v2/audio';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Check In API is used to get check Ins data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Foursquare, Vkontakte
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response Containing List of CheckIn Data
    * 25.2.1
    */
    getCheckIns : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/checkin';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Check In API is used to get check Ins data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Foursquare, Vkontakte
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {nextCursor} Cursor value if not all contacts can be retrieved once.
    * @return Response Model containing Checkins with next cursor
    * 25.2.2
    */
    getCheckInsWithCursor : function (accessToken, nextCursor, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(nextCursor)) {
        return handle(util.message('nextCursor'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.nextCursor = nextCursor;

      var resourcePath = 'api/v2/checkin';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Contact API is used to get contacts/friends/connections data from the user's social account.This is one of the APIs that makes up the LoginRadius Friend Invite System. The data will normalized into LoginRadius' standard data format. This API requires setting permissions in your LoginRadius Dashboard. <br><br><b>Note:</b> Facebook restricts access to the list of friends that is returned. When using the Contacts API with Facebook you will only receive friends that have accepted some permissions with your app. <br><br><b>Supported Providers:</b> Facebook, Foursquare, Google, LinkedIn, Live, Twitter, Vkontakte, Yahoo
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {nextCursor} Cursor value if not all contacts can be retrieved once.
    * @return Response containing Definition of Contact Data with Cursor
    * 27.1
    */
    getContacts : function (accessToken, nextCursor, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(nextCursor)) {
        queryParameters.nextCursor = nextCursor;
      }

      var resourcePath = 'api/v2/contact';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Event API is used to get the event data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Live
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response Containing List of Events Data
    * 28.2.1
    */
    getEvents : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/event';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Event API is used to get the event data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Live
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {nextCursor} Cursor value if not all contacts can be retrieved once.
    * @return Response Model containing Events with next cursor
    * 28.2.2
    */
    getEventsWithCursor : function (accessToken, nextCursor, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(nextCursor)) {
        return handle(util.message('nextCursor'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.nextCursor = nextCursor;

      var resourcePath = 'api/v2/event';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * Get the following user list from the user's social account.<br><br><b>Supported Providers:</b> Twitter
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response Containing List of Contacts Data
    * 29.2.1
    */
    getFollowings : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/following';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * Get the following user list from the user's social account.<br><br><b>Supported Providers:</b> Twitter
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {nextCursor} Cursor value if not all contacts can be retrieved once.
    * @return Response containing Definition of Contact Data with Cursor
    * 29.2.2
    */
    getFollowingsWithCursor : function (accessToken, nextCursor, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(nextCursor)) {
        return handle(util.message('nextCursor'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.nextCursor = nextCursor;

      var resourcePath = 'api/v2/following';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Group API is used to get group data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Vkontakte
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response Containing List of Groups Data
    * 30.2.1
    */
    getGroups : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/group';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Group API is used to get group data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Vkontakte
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {nextCursor} Cursor value if not all contacts can be retrieved once.
    * @return Response Model containing Groups with next cursor
    * 30.2.2
    */
    getGroupsWithCursor : function (accessToken, nextCursor, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(nextCursor)) {
        return handle(util.message('nextCursor'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.nextCursor = nextCursor;

      var resourcePath = 'api/v2/group';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Like API is used to get likes data from the user's social account.<br><br><b>Supported Providers:</b> Facebook
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response Containing List of Likes Data
    * 31.2.1
    */
    getLikes : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/like';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Like API is used to get likes data from the user's social account.<br><br><b>Supported Providers:</b> Facebook
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {nextCursor} Cursor value if not all contacts can be retrieved once.
    * @return Response Model containing Likes with next cursor
    * 31.2.2
    */
    getLikesWithCursor : function (accessToken, nextCursor, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(nextCursor)) {
        return handle(util.message('nextCursor'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.nextCursor = nextCursor;

      var resourcePath = 'api/v2/like';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Mention API is used to get mentions data from the user's social account.<br><br><b>Supported Providers:</b> Twitter
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response Containing List of Status Data
    * 32.1
    */
    getMentions : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/mention';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * Post Message API is used to post messages to the user's contacts.<br><br><b>Supported Providers:</b> Twitter, LinkedIn <br><br>The Message API is used to post messages to the user?s contacts. This is one of the APIs that makes up the LoginRadius Friend Invite System. After using the Contact API, you can send messages to the retrieved contacts. This API requires setting permissions in your LoginRadius Dashboard.<br><br>GET & POST Message API work the same way except the API method is different
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {message} Body of your message
    * @param {subject} Subject of your message
    * @param {to} Recipient's social provider's id
    * @return Response containing Definition for Complete Validation data
    * 33.1
    */
    postMessage : function (accessToken, message,
      subject, to, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(message)) {
        return handle(util.message('message'));
      }
      if (util.isNull(subject)) {
        return handle(util.message('subject'));
      }
      if (util.isNull(to)) {
        return handle(util.message('to'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.message = message;
      queryParameters.subject = subject;
      queryParameters.to = to;

      var resourcePath = 'api/v2/message';

      return util.xhttpCall('POST', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Page API is used to get the page data from the user's social account.<br><br><b>Supported Providers:</b>  Facebook, LinkedIn
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {pageName} Name of the page you want to retrieve info from
    * @return Response containing Definition of Complete page data
    * 34.1
    */
    getPage : function (accessToken, pageName, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(pageName)) {
        return handle(util.message('pageName'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.pageName = pageName;

      var resourcePath = 'api/v2/page';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Photo API is used to get photo data from the user's social account.<br><br><b>Supported Providers:</b>  Facebook, Foursquare, Google, Live, Vkontakte
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {albumId} The id of the album you want to retrieve info from
    * @return Response Containing List of Photos Data
    * 35.1
    */
    getPhotos : function (accessToken, albumId, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(albumId)) {
        return handle(util.message('albumId'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.albumId = albumId;

      var resourcePath = 'api/v2/photo';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Post API is used to get post message data from the user's social account.<br><br><b>Supported Providers:</b>  Facebook
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response Containing List of Posts Data
    * 36.1
    */
    getPosts : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/post';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Status API is used to update the status on the user's wall.<br><br><b>Supported Providers:</b>  Facebook, Twitter, LinkedIn
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {caption} Message displayed below the description(Requires URL, Under 70 Characters).
    * @param {description} Description of the displayed URL and Image(Requires URL)
    * @param {imageurl} Image to be displayed in the share(Requires URL).
    * @param {status} Main body of the Status update.
    * @param {title} Title of Linked URL
    * @param {url} URL to be included when clicking on the share.
    * @param {shorturl} short url
    * @return Response conatining Definition of Validation and Short URL data
    * 37.2
    */
    statusPosting : function (accessToken, caption,
      description, imageurl, status, title, url,
      shorturl, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(caption)) {
        return handle(util.message('caption'));
      }
      if (util.isNull(description)) {
        return handle(util.message('description'));
      }
      if (util.isNull(imageurl)) {
        return handle(util.message('imageurl'));
      }
      if (util.isNull(status)) {
        return handle(util.message('status'));
      }
      if (util.isNull(title)) {
        return handle(util.message('title'));
      }
      if (util.isNull(url)) {
        return handle(util.message('url'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.caption = caption;
      queryParameters.description = description;
      queryParameters.imageurl = imageurl;
      queryParameters.status = status;
      queryParameters.title = title;
      queryParameters.url = url;
      if (!util.isNull(shorturl)) {
        queryParameters.shorturl = shorturl;
      }

      var resourcePath = 'api/v2/status';

      return util.xhttpCall('POST', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Trackable status API works very similar to the Status API but it returns a Post id that you can use to track the stats(shares, likes, comments) for a specific share/post/status update. This API requires setting permissions in your LoginRadius Dashboard.<br><br> The Trackable Status API is used to update the status on the user's wall and return an Post ID value. It is commonly referred to as Permission based sharing or Push notifications.<br><br> POST Input Parameter Format: application/x-www-form-urlencoded
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {statusModel} Model Class containing Definition of payload for Status API
    * @return Response containing Definition for Complete status data
    * 37.6
    */
    trackableStatusPosting : function (accessToken, statusModel, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(statusModel)) {
        return handle(util.message('statusModel'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'api/v2/status/trackable';

      return util.xhttpCall('POST', resourcePath, queryParameters, statusModel, handle);
    },
    /**
    * The Trackable status API works very similar to the Status API but it returns a Post id that you can use to track the stats(shares, likes, comments) for a specific share/post/status update. This API requires setting permissions in your LoginRadius Dashboard.<br><br> The Trackable Status API is used to update the status on the user's wall and return an Post ID value. It is commonly referred to as Permission based sharing or Push notifications.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {caption} Message displayed below the description(Requires URL, Under 70 Characters).
    * @param {description} Description of the displayed URL and Image(Requires URL)
    * @param {imageurl} Image to be displayed in the share(Requires URL).
    * @param {status} Main body of the Status update.
    * @param {title} Title of Linked URL
    * @param {url} URL to be included when clicking on the share.
    * @return Response containing Definition for Complete status data
    * 37.7
    */
    getTrackableStatusStats : function (accessToken, caption,
      description, imageurl, status, title, url, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(caption)) {
        return handle(util.message('caption'));
      }
      if (util.isNull(description)) {
        return handle(util.message('description'));
      }
      if (util.isNull(imageurl)) {
        return handle(util.message('imageurl'));
      }
      if (util.isNull(status)) {
        return handle(util.message('status'));
      }
      if (util.isNull(title)) {
        return handle(util.message('title'));
      }
      if (util.isNull(url)) {
        return handle(util.message('url'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.caption = caption;
      queryParameters.description = description;
      queryParameters.imageurl = imageurl;
      queryParameters.status = status;
      queryParameters.title = title;
      queryParameters.url = url;

      var resourcePath = 'api/v2/status/trackable/js';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The User Profile API is used to get social profile data from the user's social account after authentication.<br><br><b>Supported Providers:</b>  All
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @return Response containing Definition for Complete UserProfile data
    * 38.1
    */
    getSocialUserProfile : function (accessToken, fields, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'api/v2/userprofile';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The User Profile API is used to get the latest updated social profile data from the user's social account after authentication. The social profile will be retrieved via oAuth and OpenID protocols. The data is normalized into LoginRadius' standard data format. This API should be called using the access token retrieved from the refresh access token API.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {fields} The fields parameter filters the API response so that the response only includes a specific set of fields
    * @return Response containing Definition for Complete UserProfile data
    * 38.2
    */
    getRefreshedSocialUserProfile : function (accessToken, fields, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      if (!util.isNull(fields)) {
        queryParameters.fields = fields;
      }

      var resourcePath = 'api/v2/userprofile/refresh';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * The Video API is used to get video files data from the user's social account.<br><br><b>Supported Providers:</b>   Facebook, Google, Live, Vkontakte
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {nextCursor} Cursor value if not all contacts can be retrieved once.
    * @return Response containing Definition of Video Data with Cursor
    * 39.2
    */
    getVideos : function (accessToken, nextCursor, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(nextCursor)) {
        return handle(util.message('nextCursor'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.nextCursor = nextCursor;

      var resourcePath = 'api/v2/video';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    }, 
  }  
  module.consentManagementApi = {};  
  module.consentManagementApi = { 
    /**
    * This API is to submit consent form using consent token.
    * @param {consentToken} The consent token received after login error 1226 
    * @param {consentSubmitModel} Model class containing list of multiple consent
    * @return Response containing User Profile Data and access token
    * 43.1
    */
    submitConsentByConsentToken : function (consentToken, consentSubmitModel, handle) {
      if (util.isNull(consentToken)) {
        return handle(util.message('consentToken'));
      }
      if (util.checkJson(consentSubmitModel)) {
        return handle(util.message('consentSubmitModel'));
      }
      var queryParameters = {};

      queryParameters.consentToken = consentToken;

      var resourcePath = 'identity/v2/auth/consent';

      return util.xhttpCall('POST', resourcePath, queryParameters, consentSubmitModel, handle);
    },
    /**
    * This API is used to fetch consent logs.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @return Response containing consent logs
    * 43.2
    */
    getConsentLogs : function (accessToken, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/consent/logs';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * API to provide a way to end user to submit a consent form for particular event type.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {consentSubmitModel} Model class containing list of multiple consent
    * @return Response containing Definition for Complete profile data
    * 43.3
    */
    submitConsentByAccessToken : function (accessToken, consentSubmitModel, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(consentSubmitModel)) {
        return handle(util.message('consentSubmitModel'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/consent/profile';

      return util.xhttpCall('POST', resourcePath, queryParameters, consentSubmitModel, handle);
    },
    /**
    * This API is used to check if consent is submitted for a particular event or not.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {event} Allowed events: Login, Register, UpdateProfile, ResetPassword, ChangePassword, emailVerification, AddEmail, RemoveEmail, BlockAccount, DeleteAccount, SetUsername, AssignRoles, UnassignRoles, SetPassword, LinkAccount, UnlinkAccount, UpdatePhoneId, VerifyPhoneNumber, CreateCustomObject, UpdateCustomobject, DeleteCustomObject
    * @param {isCustom} true/false
    * @return Response containing consent profile
    * 43.4
    */
    verifyConsentByAccessToken : function (accessToken, event,
      isCustom, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.isNull(event)) {
        return handle(util.message('event'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;
      queryParameters.event = event;
      queryParameters.isCustom = isCustom;

      var resourcePath = 'identity/v2/auth/consent/verify';

      return util.xhttpCall('GET', resourcePath, queryParameters, {}, handle);
    },
    /**
    * This API is to update consents using access token.
    * @param {accessToken} Uniquely generated identifier key by LoginRadius that is activated after successful authentication.
    * @param {consentUpdateModel} Model class containg list of multiple consent
    * @return Response containing consent profile
    * 43.5
    */
    updateConsentProfileByAccessToken : function (accessToken, consentUpdateModel, handle) {
      if (util.isNull(accessToken)) {
        return handle(util.message('accessToken'));
      }
      if (util.checkJson(consentUpdateModel)) {
        return handle(util.message('consentUpdateModel'));
      }
      var queryParameters = {};

      queryParameters.access_token = accessToken;

      var resourcePath = 'identity/v2/auth/consent';

      return util.xhttpCall('PUT', resourcePath, queryParameters, consentUpdateModel, handle);
    }, 
  }
  /**
   * The Access Token API is used to get the LoginRadius access token after authentication. It will be valid for the specific duration of time specified in the response.
   *
   * @function
   * @public
   * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
   */
  module.getToken = function() {
    return getBrowserStorage(token);
  };

  /**
   * Checks if the API Key is available in the browser's storage for API Calls that require it
   *
   */
  module.getApiKey = function() {
    if (getBrowserStorage("lrApiKey")) {
      return getBrowserStorage("lrApiKey");
    } else {
      console.log("API Key not found, The API Key needs to be initialized for this API Call");
    }
  };

  /**
  * Check null or undefined
  * @param {string} as input
  * @return input is null or not
  */
  util.isNull = function (input) {
    return !((input === null || typeof input === 'undefined') ? '' : input);
  };

  /**
  * Check null or undefined
  * @param {string} as input
  * @return input is null or not
  */
  util._uuidFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  /**
  * Check json is correct or not
  * @param {string} input
  * @return input is json or not
  */
  util.checkJson = function (input) {
    return (input === null || input === undefined ||
  Array.isArray(input) || typeof input !== 'object');
  };

  /**
  * Get Validation Message
  * @param {string} type as error string
  * @return jsondata as json error object
  */
  util.message = function (type) {
    errorMsgs[1000].Description = 'The API Request Paramter ' + type + ' is not Correct or WellFormated';
    return errorMsgs[1000];
  };

  /**
  * @function log
  * @memberof util#
  * @param {String} message message to be logged
  * @description This funtion is used to log error/warning message in browser if debug mode has been made true.
  */
 util.log = function(message) {
    if (config.debugMode) {
      if (typeof console !== 'undefined') {
        console.error(message);
      }
    }
  };

  /**
   * The Function is used to Handle All GET, POST, PUT and DELETE API Request on Server.
   *
   * @param method
   * @param path
   * @param queryParameters
   * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
   */
  util.xhttpCall = function(method, path, queryParameters, model, handle) {
    if (config.apiKey) {
     
        if(path.indexOf('/v2/access_token/') != -1){
          queryParameters.key = config.apiKey;
        }else{
          queryParameters.ApiKey = config.apiKey;
        }
        
        var xhttpcall = new XMLHttpRequest();
        xhttpcall.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var jsonParse = JSON.parse(xhttpcall.responseText);
            if(jsonParse && jsonParse.ErrorCode){
              handle(jsonParse);
            }else{
              handle('', jsonParse);
            }
          }else if (this.readyState == 4 && this.status == 429) {
            handle(errorMsgs[429])
          }
        };
        if (path == 'ciam/appinfo') {
          apiDomain = "https://config.lrcontent.com";
        }
        if(queryParameters.access_token){ 
          var access_token = queryParameters.access_token;
          delete queryParameters.access_token;
        }
        if (queryParameters.sott) {
          var sott = queryParameters.sott;
          delete queryParameters.sott;
        }
        
        xhttpcall.open(method, apiDomain +"/"+ path + "?" + util.makeQuerySting(queryParameters));
        if(access_token){ 
          xhttpcall.setRequestHeader('authorization', 'Bearer ' + access_token);
          access_token = "";
        }
        if (sott) {
          xhttpcall.setRequestHeader('X-LoginRadius-Sott', sott);
          sott = "";
        }
        if(config.originIp){
          xhttpcall.setRequestHeader("X-Origin-IP", config.originIp);     
        }
        xhttpcall.setRequestHeader("Content-type", "application/json");
        xhttpcall.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhttpcall.onerror = function() {
          handle(errorMsgs[1000])
        };
        xhttpcall.send(JSON.stringify(model));
      }
    else{
      util.log('Please set the LoginRadius ApiKey');
      handle(errorMsgs[1000])
    }
  };
  /**
   * The Function is used to get query string
   * @param object 
   */
  util.makeQuerySting = function (object) {
    var qstring = [];
    for(var row in object){
      qstring.push(encodeURIComponent(row)+"="+encodeURIComponent(object[row]));
    }
    return qstring.join("&");
  }
  /**
   * Add event Listener when we get LoginRadius Token
   *
   * @param type
   * @param element
   * @param handle
   */
  util.addEvent = function(type, element, handle) {
    var elements = [];
    if (element instanceof Array) {
      elements = element;
    } else {
      elements.push(element);
    }
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].attachEvent) {
        elements[i].attachEvent("on" + type, function(e) {
          handle(e);
        });
      } else if (elements[i].addEventListener) {
        elements[i].addEventListener(type, handle, false);
      }
    }
  };
  // window event handler
  util.addEvent("message", window, receiveToken);

  var loginradiushtml5passToken = function(tok) {
    sessionStorage.setItem(token, tok);
    module.isauthenticated = true;

    var intVal = setInterval(function() {
      if (module.onlogin) {
        module.onlogin();
        clearInterval(intVal);
      }
    }, 100);

  };

  /**
   * Function for Receive Token
   *
   * @param event
   */
  function receiveToken(event) {
    if (event.origin.indexOf("hub.loginradius.com") == -1) {
      return;
    }
    loginradiushtml5passToken(event.data);
  }

  var lrToken = hash.get('lr-token');
  if (lrToken) {
    if (window.opener && window.opener.loginradiushtml5passToken) {
      window.opener.loginradiushtml5passToken(lrToken);
      document.write('<style type="text/css">body { display: none !important; } </style>');
      window.close();
    } else {
      window.loginradiushtml5passToken(lrToken);
    }
  }
  module.initSDK = function(settings) {
    config.apiKey = settings.apiKey;
    config.debugMode = settings.debugMode || false;
    config.originIp = settings.originIp;
    setBrowserStorage("lrApiKey", settings.apiKey);
  }
  return module;
})();
