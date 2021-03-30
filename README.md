# LoginRadius HTML5 SDK

Customer Identity public repo for the HTML5 SDK, based on LoginRadius V2 APIs.

![Home Image](http://docs.lrcontent.com/resources/github/banner-1544x500.png)


## Introduction ##

LoginRadius HTML 5 Customer Registration wrapper provides access to LoginRadius Identity Platform API.

LoginRadius is an Identity Management Platform that simplifies user registration while securing data. LoginRadius Platform simplifies and secures your user registration process, increases conversion with Social Login that combines 30 major social platforms, and offers a full solution with Traditional Customer Registration. You can gather a wealth of user profile data from Social Login or Traditional Customer Registration. This SDK includes support for the LoginRadius Authentication APIs, Custom Object Management APIs and Social APIs.


LoginRadius centralizes it all in one place, making it easy to manage and access. Easily integrate LoginRadius with all of your third-party applications, like MailChimp, Google Analytics, Livefyre and many more, making it easy to utilize the data you are capturing.

LoginRadius helps businesses boost user engagement on their web/mobile platform, manage online identities, utilize social media for marketing, capture accurate consumer data, and get unique social insight into their customer base.



Please visit [here](http://www.loginradius.com/) for more information.


## Documentation
-----

HTML5 SDK provides an approach to access LoginRadius service with only HTML and Javascript Get a Full Demo

>Disclaimer
This library is meant to help you with a quick implementation of the LoginRadius platform and also to serve as a reference point for the LoginRadius API. Keep in mind that it is an open source library, which means you are free to download and customize the library functions based on your specific application needs.




## Installation
In order to utilize the HTML5/JS SDK, you will need to initialize the SDK with your API Key:

```
var sdkoptions = {
  "apiKey": "{{YOUR API KEY}}"
}

LoginRadiusSDK.initSDK(sdkoptions);
```
### X-Origin-IP
LoginRadius allows you to add X-Origin-IP in your headers and it determines the IP address of the client's request,this can also be useful to overcome analytics discrepancies where the analytics depend on header data.

```
var sdkoptions = {
  "originIp": "{{CLIENT IP}}"
}
```

## Importing Required Libraries
- Download the SDK from [Github](https://github.com/LoginRadius/HTML5-SDK).
- Include the SDK javascript file on your website.
## HTML

```
<script src="LoginRadiusV2SDK.11.1.0.js" type="text/javascript"></script>
```

## Getting the Access Token
The Access Token will be automatically retrieved from logins performed via our LoginRadiusV2.js interface.

While it is required for many of the API Calls in our Authentication API, You can simple pass it.

However, if you need to manually retrieve the token, it can be done using ```LoginRadiusSDK.getToken()```

>Note
please make sure that all the API functions, are asynchronous.

## APIs
With the api key initialized and the access token, once a user has logged in, we can invoke any of these functions to grab data. However, this is dependent on the provider and permissions for each.

Note: All of the listed arguments must be passed for each function if you do not want
to pass a value simply pass an empty string `""`

When jsObject is listed as an argument you must pass in an Object as required for the specific API Call in our documentation.

  ### Authentication API


List of APIs in this Section:<br>

* PUT : [Auth Update Profile by Token](#UpdateProfileByAccessToken-put-)<br>
* PUT : [Auth Unlock Account by Access Token](#UnlockAccountByToken-put-)<br>
* PUT : [Auth Verify Email By OTP](#VerifyEmailByOTP-put-)<br>
* PUT : [Auth Reset Password by Security Answer and Email](#ResetPasswordBySecurityAnswerAndEmail-put-)<br>
* PUT : [Auth Reset Password by Security Answer and Phone](#ResetPasswordBySecurityAnswerAndPhone-put-)<br>
* PUT : [Auth Reset Password by Security Answer and UserName](#ResetPasswordBySecurityAnswerAndUserName-put-)<br>
* PUT : [Auth Reset Password by Reset Token](#ResetPasswordByResetToken-put-)<br>
* PUT : [Auth Reset Password by OTP](#ResetPasswordByEmailOTP-put-)<br>
* PUT : [Auth Reset Password by OTP and UserName](#ResetPasswordByOTPAndUserName-put-)<br>
* PUT : [Auth Change Password](#ChangePassword-put-)<br>
* PUT : [Auth Set or Change UserName](#SetOrChangeUserName-put-)<br>
* PUT : [Auth Resend Email Verification](#AuthResendEmailVerification-put-)<br>
* POST : [Auth Add Email](#AddEmail-post-)<br>
* POST : [Auth Login by Email](#LoginByEmail-post-)<br>
* POST : [Auth Login by Username](#LoginByUserName-post-)<br>
* POST : [Auth Forgot Password](#ForgotPassword-post-)<br>
* POST : [Auth Link Social Identities](#LinkSocialIdentities-post-)<br>
* POST : [Auth Link Social Identities By Ping](#LinkSocialIdentitiesByPing-post-)<br>
* POST : [Auth User Registration by Email](#UserRegistrationByEmail-post-)<br>
* POST : [Auth User Registration By Captcha](#UserRegistrationByCaptcha-post-)<br>
* GET : [Get Security Questions By Email](#GetSecurityQuestionsByEmail-get-)<br>
* GET : [Get Security Questions By UserName](#GetSecurityQuestionsByUserName-get-)<br>
* GET : [Get Security Questions By Phone](#GetSecurityQuestionsByPhone-get-)<br>
* GET : [Get Security Questions By Access Token](#GetSecurityQuestionsByAccessToken-get-)<br>
* GET : [Auth Validate Access token](#AuthValidateAccessToken-get-)<br>
* GET : [Access Token Invalidate](#AuthInValidateAccessToken-get-)<br>
* GET : [Access Token Info](#GetAccessTokenInfo-get-)<br>
* GET : [Auth Read all Profiles by Token](#GetProfileByAccessToken-get-)<br>
* GET : [Auth Send Welcome Email](#SendWelcomeEmail-get-)<br>
* GET : [Auth Delete Account](#DeleteAccountByDeleteToken-get-)<br>
* GET : [Get Profile By Ping](#GetProfileByPing-get-)<br>
* GET : [Auth Check Email Availability](#CheckEmailAvailability-get-)<br>
* GET : [Auth Verify Email](#VerifyEmail-get-)<br>
* GET : [Auth Check UserName Availability](#CheckUserNameAvailability-get-)<br>
* GET : [Auth Privacy Policy Accept](#AcceptPrivacyPolicy-get-)<br>
* GET : [Auth Privacy Policy History By Access Token](#GetPrivacyPolicyHistoryByAccessToken-get-)<br>
* DELETE : [Auth Delete Account with Email Confirmation](#DeleteAccountWithEmailConfirmation-delete-)<br>
* DELETE : [Auth Remove Email](#RemoveEmail-delete-)<br>
* DELETE : [Auth Unlink Social Identities](#UnlinkSocialIdentities-delete-)<br>



<h6 id="UpdateProfileByAccessToken-put-"> Auth Update Profile by Token (PUT)</h6>
 This API is used to update the user's profile by passing the access token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-update-profile-by-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var userProfileUpdateModel ={ 
"firstName" : "<firstName>",
"lastName" : "<lastName>"
};  //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var nullSupport = true; //Optional
var smsTemplate = "<smsTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.authenticationApi.updateProfileByAccessToken(accessToken, userProfileUpdateModel, emailTemplate, fields, nullSupport, smsTemplate, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="UnlockAccountByToken-put-"> Auth Unlock Account by Access Token (PUT)</h6>
 This API is used to allow a customer with a valid access token to unlock their account provided that they successfully pass the prompted Bot Protection challenges. The Block or Suspend block types are not applicable for this API. For additional details see our Auth Security Configuration documentation.You are only required to pass the Post Parameters that correspond to the prompted challenges.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-unlock-account-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var unlockProfileModel ={ 
"g-recaptcha-response" : "<g-recaptcha-response>"
};  //Required

 LoginRadiusSDK.authenticationApi.unlockAccountByToken(accessToken, unlockProfileModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="VerifyEmailByOTP-put-"> Auth Verify Email By OTP (PUT)</h6>
 This API is used to verify the email of user when the OTP Email verification flow is enabled, please note that you must contact LoginRadius to have this feature enabled.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-verify-email-by-otp/)

 
 

 ```


var emailVerificationByOtpModel ={ 
"email" : "<email>",
"otp" : "<otp>"
};  //Required
var fields = null; //Optional
var url = "<url>"; //Optional
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.authenticationApi.verifyEmailByOTP(emailVerificationByOtpModel, fields, url, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPasswordBySecurityAnswerAndEmail-put-"> Auth Reset Password by Security Answer and Email (PUT)</h6>
 This API is used to reset password for the specified account by security question  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-reset-password-by-email)

 
 

 ```


var resetPasswordBySecurityAnswerAndEmailModel ={ 
"email" : "<email>",
"password" : "<password>",
"securityAnswer" : {"QuestionID":"Answer"}
};  //Required

 LoginRadiusSDK.authenticationApi.resetPasswordBySecurityAnswerAndEmail(resetPasswordBySecurityAnswerAndEmailModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPasswordBySecurityAnswerAndPhone-put-"> Auth Reset Password by Security Answer and Phone (PUT)</h6>
 This API is used to reset password for the specified account by security question  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-reset-password-by-phone)

 
 

 ```


var resetPasswordBySecurityAnswerAndPhoneModel ={ 
"password" : "<password>",
"phone" : "<phone>",
"securityAnswer" : {"QuestionID":"Answer"}
};  //Required

 LoginRadiusSDK.authenticationApi.resetPasswordBySecurityAnswerAndPhone(resetPasswordBySecurityAnswerAndPhoneModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPasswordBySecurityAnswerAndUserName-put-"> Auth Reset Password by Security Answer and UserName (PUT)</h6>
 This API is used to reset password for the specified account by security question  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-reset-password-by-username)

 
 

 ```


var resetPasswordBySecurityAnswerAndUserNameModel ={ 
"password" : "<password>",
"securityAnswer" : {"QuestionID":"Answer"},
"userName" : "<userName>"
};  //Required

 LoginRadiusSDK.authenticationApi.resetPasswordBySecurityAnswerAndUserName(resetPasswordBySecurityAnswerAndUserNameModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPasswordByResetToken-put-"> Auth Reset Password by Reset Token (PUT)</h6>
 This API is used to set a new password for the specified account.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-reset-password-by-reset-token)

 
 

 ```


var resetPasswordByResetTokenModel ={ 
"password" : "<password>",
"resetToken" : "<resetToken>"
};  //Required

 LoginRadiusSDK.authenticationApi.resetPasswordByResetToken(resetPasswordByResetTokenModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPasswordByEmailOTP-put-"> Auth Reset Password by OTP (PUT)</h6>
 This API is used to set a new password for the specified account.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-reset-password-by-otp)

 
 

 ```


var resetPasswordByEmailAndOtpModel ={ 
"email" : "<email>",
"otp" : "<otp>",
"password" : "<password>"
};  //Required

 LoginRadiusSDK.authenticationApi.resetPasswordByEmailOTP(resetPasswordByEmailAndOtpModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPasswordByOTPAndUserName-put-"> Auth Reset Password by OTP and UserName (PUT)</h6>
 This API is used to set a new password for the specified account if you are using the username as the unique identifier in your workflow  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-reset-password-by-otp-and-username/)

 
 

 ```


var resetPasswordByUserNameModel ={ 
"otp" : "<otp>",
"password" : "<password>",
"userName" : "<userName>"
};  //Required

 LoginRadiusSDK.authenticationApi.resetPasswordByOTPAndUserName(resetPasswordByUserNameModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ChangePassword-put-"> Auth Change Password (PUT)</h6>
 This API is used to change the accounts password based on the previous password  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-change-password)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var newPassword = "<newPassword>"; //Required
var oldPassword = "<oldPassword>"; //Required

 LoginRadiusSDK.authenticationApi.changePassword(accessToken, newPassword, oldPassword, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SetOrChangeUserName-put-"> Auth Set or Change UserName (PUT)</h6>
 This API is used to set or change UserName by access token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-set-or-change-user-name/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var username = "<username>"; //Required

 LoginRadiusSDK.authenticationApi.setOrChangeUserName(accessToken, username, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="AuthResendEmailVerification-put-"> Auth Resend Email Verification (PUT)</h6>
 This API resends the verification email to the user.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-resend-email-verification/)

 
 

 ```

var email = "<email>"; //Required
var emailTemplate = "<emailTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.authenticationApi.authResendEmailVerification(email, emailTemplate, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="AddEmail-post-"> Auth Add Email (POST)</h6>
 This API is used to add additional emails to a user's account.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-add-email)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var email = "<email>"; //Required
var type = "<type>"; //Required
var emailTemplate = "<emailTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.authenticationApi.addEmail(accessToken, email, type, emailTemplate, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="LoginByEmail-post-"> Auth Login by Email (POST)</h6>
 This API retrieves a copy of the user data based on the Email  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-login-by-email)

 
 

 ```


var emailAuthenticationModel ={ 
"email" : "<email>",
"password" : "<password>"
};  //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var loginUrl = "<loginUrl>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.authenticationApi.loginByEmail(emailAuthenticationModel, emailTemplate, fields, loginUrl, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="LoginByUserName-post-"> Auth Login by Username (POST)</h6>
 This API retrieves a copy of the user data based on the Username  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-login-by-username)

 
 

 ```


var userNameAuthenticationModel ={ 
"password" : "<password>",
"username" : "<username>"
};  //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var loginUrl = "<loginUrl>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.authenticationApi.loginByUserName(userNameAuthenticationModel, emailTemplate, fields, loginUrl, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ForgotPassword-post-"> Auth Forgot Password (POST)</h6>
 This API is used to send the reset password url to a specified account. Note: If you have the UserName workflow enabled, you may replace the 'email' parameter with 'username'  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-forgot-password)

 
 

 ```

var email = "<email>"; //Required
var resetPasswordUrl = "<resetPasswordUrl>"; //Required
var emailTemplate = "<emailTemplate>"; //Optional

 LoginRadiusSDK.authenticationApi.forgotPassword(email, resetPasswordUrl, emailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="LinkSocialIdentities-post-"> Auth Link Social Identities (POST)</h6>
 This API is used to link up a social provider account with an existing LoginRadius account on the basis of access token and the social providers user access token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-link-social-identities)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var candidateToken = "<candidateToken>"; //Required

 LoginRadiusSDK.authenticationApi.linkSocialIdentities(accessToken, candidateToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="LinkSocialIdentitiesByPing-post-"> Auth Link Social Identities By Ping (POST)</h6>
 This API is used to link up a social provider account with an existing LoginRadius account on the basis of ping and the social providers user access token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-link-social-identities-by-ping)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var clientGuid = "<clientGuid>"; //Required

 LoginRadiusSDK.authenticationApi.linkSocialIdentitiesByPing(accessToken, clientGuid, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="UserRegistrationByEmail-post-"> Auth User Registration by Email (POST)</h6>
 This API creates a user in the database as well as sends a verification email to the user.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-user-registration-by-email)

 
 

 ```


var authUserRegistrationModel ={ 
"email" : [   { 
 "type" : "<type>"  ,
 "value" : "<value>"   
}  ] ,
"firstName" : "<firstName>",
"lastName" : "<lastName>",
"password" : "<password>"
};  //Required
var sott = "<sott>"; //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var options = "<options>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.authenticationApi.userRegistrationByEmail(authUserRegistrationModel, sott, emailTemplate, fields, options, verificationUrl, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="UserRegistrationByCaptcha-post-"> Auth User Registration By Captcha (POST)</h6>
 This API creates a user in the database as well as sends a verification email to the user.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-user-registration-by-recaptcha)

 
 

 ```


var authUserRegistrationModelWithCaptcha ={ 
"email" : [   { 
 "type" : "<type>"  ,
 "value" : "<value>"   
}  ] ,
"firstName" : "<firstName>",
"g-recaptcha-response" : "<g-recaptcha-response>",
"lastName" : "<lastName>",
"password" : "<password>"
};  //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var options = "<options>"; //Optional
var smsTemplate = "<smsTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.authenticationApi.userRegistrationByCaptcha(authUserRegistrationModelWithCaptcha, emailTemplate, fields, options, smsTemplate, verificationUrl, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetSecurityQuestionsByEmail-get-"> Get Security Questions By Email (GET)</h6>
 This API is used to retrieve the list of questions that are configured on the respective LoginRadius site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/security-questions-by-email/)

 
 

 ```

var email = "<email>"; //Required

 LoginRadiusSDK.authenticationApi.getSecurityQuestionsByEmail(email, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetSecurityQuestionsByUserName-get-"> Get Security Questions By UserName (GET)</h6>
 This API is used to retrieve the list of questions that are configured on the respective LoginRadius site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/security-questions-by-user-name/)

 
 

 ```

var userName = "<userName>"; //Required

 LoginRadiusSDK.authenticationApi.getSecurityQuestionsByUserName(userName, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetSecurityQuestionsByPhone-get-"> Get Security Questions By Phone (GET)</h6>
 This API is used to retrieve the list of questions that are configured on the respective LoginRadius site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/security-questions-by-phone/)

 
 

 ```

var phone = "<phone>"; //Required

 LoginRadiusSDK.authenticationApi.getSecurityQuestionsByPhone(phone, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetSecurityQuestionsByAccessToken-get-"> Get Security Questions By Access Token (GET)</h6>
 This API is used to retrieve the list of questions that are configured on the respective LoginRadius site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/security-questions-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.authenticationApi.getSecurityQuestionsByAccessToken(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="AuthValidateAccessToken-get-"> Auth Validate Access token (GET)</h6>
 This api validates access token, if valid then returns a response with its expiry otherwise error.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-validate-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.authenticationApi.authValidateAccessToken(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="AuthInValidateAccessToken-get-"> Access Token Invalidate (GET)</h6>
 This api call invalidates the active access token or expires an access token's validity.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-invalidate-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var preventRefresh = true; //Optional

 LoginRadiusSDK.authenticationApi.authInValidateAccessToken(accessToken, preventRefresh, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenInfo-get-"> Access Token Info (GET)</h6>
 This api call provide the active access token Information  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-access-token-info/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.authenticationApi.getAccessTokenInfo(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetProfileByAccessToken-get-"> Auth Read all Profiles by Token (GET)</h6>
 This API retrieves a copy of the user data based on the access token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-read-profiles-by-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var fields = null; //Optional

 LoginRadiusSDK.authenticationApi.getProfileByAccessToken(accessToken, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SendWelcomeEmail-get-"> Auth Send Welcome Email (GET)</h6>
 This API sends a welcome email  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-send-welcome-email/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.authenticationApi.sendWelcomeEmail(accessToken, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="DeleteAccountByDeleteToken-get-"> Auth Delete Account (GET)</h6>
 This API is used to delete an account by passing it a delete token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-delete-account/)

 
 

 ```

var deletetoken = "<deletetoken>"; //Required

 LoginRadiusSDK.authenticationApi.deleteAccountByDeleteToken(deletetoken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
<h6 id="GetProfileByPing-get-">Get Profile By Ping (GET)</h6>
This API is used to get a user's profile using the clientGuid parameter if no callback feature enabled. [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/social-login-by-ping/)

 
 

 ```

var clientGuid = "<clientGuid>"; //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var verificationUrl = "<verificationUrl>"; //Optional
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.authenticationApi.getProfileByPing(clientGuid, emailTemplate, fields, verificationUrl, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
  
 
<h6 id="CheckEmailAvailability-get-"> Auth Check Email Availability (GET)</h6>
 This API is used to check the email exists or not on your site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-email-availability/)

 
 

 ```

var email = "<email>"; //Required

 LoginRadiusSDK.authenticationApi.checkEmailAvailability(email, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="VerifyEmail-get-"> Auth Verify Email (GET)</h6>
 This API is used to verify the email of user. Note: This API will only return the full profile if you have 'Enable auto login after email verification' set in your LoginRadius Admin Console's Email Workflow settings under 'Verification Email'.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-verify-email/)

 
 

 ```

var verificationToken = "<verificationToken>"; //Required
var fields = null; //Optional
var url = "<url>"; //Optional
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.authenticationApi.verifyEmail(verificationToken, fields, url, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="CheckUserNameAvailability-get-"> Auth Check UserName Availability (GET)</h6>
 This API is used to check the UserName exists or not on your site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-username-availability/)

 
 

 ```

var username = "<username>"; //Required

 LoginRadiusSDK.authenticationApi.checkUserNameAvailability(username, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="AcceptPrivacyPolicy-get-"> Auth Privacy Policy Accept (GET)</h6>
 This API is used to update the privacy policy stored in the user's profile by providing the access token of the user accepting the privacy policy  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-privacy-policy-accept)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var fields = null; //Optional

 LoginRadiusSDK.authenticationApi.acceptPrivacyPolicy(accessToken, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetPrivacyPolicyHistoryByAccessToken-get-"> Auth Privacy Policy History By Access Token (GET)</h6>
 This API will return all the accepted privacy policies for the user by providing the access token of that user.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/privacy-policy-history-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.authenticationApi.getPrivacyPolicyHistoryByAccessToken(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="DeleteAccountWithEmailConfirmation-delete-"> Auth Delete Account with Email Confirmation (DELETE)</h6>
 This API will send a confirmation email for account deletion to the customer's email when passed the customer's access token  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-delete-account-with-email-confirmation/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var deleteUrl = "<deleteUrl>"; //Optional
var emailTemplate = "<emailTemplate>"; //Optional

 LoginRadiusSDK.authenticationApi.deleteAccountWithEmailConfirmation(accessToken, deleteUrl, emailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="RemoveEmail-delete-"> Auth Remove Email (DELETE)</h6>
 This API is used to remove additional emails from a user's account.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-remove-email)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var email = "<email>"; //Required

 LoginRadiusSDK.authenticationApi.removeEmail(accessToken, email, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="UnlinkSocialIdentities-delete-"> Auth Unlink Social Identities (DELETE)</h6>
 This API is used to unlink up a social provider account with the specified account based on the access token and the social providers user access token. The unlinked account will automatically get removed from your database.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-unlink-social-identities)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var provider = "<provider>"; //Required
var providerId = "<providerId>"; //Required

 LoginRadiusSDK.authenticationApi.unlinkSocialIdentities(accessToken, provider, providerId, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### Social API


List of APIs in this Section:<br>

* POST : [Post Message API](#PostMessage-post-)<br>
* POST : [Status Posting ](#StatusPosting-post-)<br>
* POST : [Trackable Status Posting](#TrackableStatusPosting-post-)<br>
* GET : [Album](#GetAlbums-get-)<br>
* GET : [Get Albums with cursor](#GetAlbumsWithCursor-get-)<br>
* GET : [Audio](#GetAudios-get-)<br>
* GET : [Get Audio With Cursor](#GetAudiosWithCursor-get-)<br>
* GET : [Check In](#GetCheckIns-get-)<br>
* GET : [Get CheckIns With Cursor](#GetCheckInsWithCursor-get-)<br>
* GET : [Contact](#GetContacts-get-)<br>
* GET : [Event](#GetEvents-get-)<br>
* GET : [Get Events With Cursor](#GetEventsWithCursor-get-)<br>
* GET : [Following](#GetFollowings-get-)<br>
* GET : [Get Followings With Cursor](#GetFollowingsWithCursor-get-)<br>
* GET : [Group](#GetGroups-get-)<br>
* GET : [Get Groups With Cursor](#GetGroupsWithCursor-get-)<br>
* GET : [Like](#GetLikes-get-)<br>
* GET : [Get Likes With Cursor](#GetLikesWithCursor-get-)<br>
* GET : [Mention](#GetMentions-get-)<br>
* GET : [Page](#GetPage-get-)<br>
* GET : [Photo](#GetPhotos-get-)<br>
* GET : [Get Post](#GetPosts-get-)<br>
* GET : [Get Trackable Status Stats](#GetTrackableStatusStats-get-)<br>
* GET : [User Profile](#GetSocialUserProfile-get-)<br>
* GET : [Refresh User Profile](#GetRefreshedSocialUserProfile-get-)<br>
* GET : [Video](#GetVideos-get-)<br>



<h6 id="PostMessage-post-"> Post Message API (POST)</h6>
 Post Message API is used to post messages to the user's contacts.<br><br><b>Supported Providers:</b> Twitter, LinkedIn <br><br>The Message API is used to post messages to the user?s contacts. This is one of the APIs that makes up the LoginRadius Friend Invite System. After using the Contact API, you can send messages to the retrieved contacts. This API requires setting permissions in your LoginRadius Dashboard.<br><br>GET & POST Message API work the same way except the API method is different  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/post-message-api)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var message = "<message>"; //Required
var subject = "<subject>"; //Required
var to = "<to>"; //Required

 LoginRadiusSDK.socialApi.postMessage(accessToken, message, subject, to, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="StatusPosting-post-"> Status Posting  (POST)</h6>
 The Status API is used to update the status on the user's wall.<br><br><b>Supported Providers:</b>  Facebook, Twitter, LinkedIn  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/status-posting/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var caption = "<caption>"; //Required
var description = "<description>"; //Required
var imageurl = "<imageurl>"; //Required
var status = "<status>"; //Required
var title = "<title>"; //Required
var url = "<url>"; //Required
var shorturl = "<shorturl>"; //Optional

 LoginRadiusSDK.socialApi.statusPosting(accessToken, caption, description, imageurl, status, title, url, shorturl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="TrackableStatusPosting-post-"> Trackable Status Posting (POST)</h6>
 The Trackable status API works very similar to the Status API but it returns a Post id that you can use to track the stats(shares, likes, comments) for a specific share/post/status update. This API requires setting permissions in your LoginRadius Dashboard.<br><br> The Trackable Status API is used to update the status on the user's wall and return an Post ID value. It is commonly referred to as Permission based sharing or Push notifications.<br><br> POST Input Parameter Format: application/x-www-form-urlencoded  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/trackable-status-posting/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var statusModel ={ 
"caption" : "<caption>",
"description" : "<description>",
"imageurl" : "<imageurl>",
"status" : "<status>",
"title" : "<title>",
"url" : "<url>"
};  //Required

 LoginRadiusSDK.socialApi.trackableStatusPosting(accessToken, statusModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAlbums-get-"> Album (GET)</h6>
 <b>Supported Providers:</b> Facebook, Google, Live, Vkontakte.<br><br> This API returns the photo albums associated with the passed in access tokens Social Profile.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/album/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.socialApi.getAlbums(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAlbumsWithCursor-get-"> Get Albums with cursor (GET)</h6>
 <b>Supported Providers:</b> Facebook, Google, Live, Vkontakte.<br><br> This API returns the photo albums associated with the passed in access tokens Social Profile.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/album/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var nextCursor = "<nextCursor>"; //Required

 LoginRadiusSDK.socialApi.getAlbumsWithCursor(accessToken, nextCursor, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAudios-get-"> Audio (GET)</h6>
 The Audio API is used to get audio files data from the user's social account.<br><br><b>Supported Providers:</b> Live, Vkontakte  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/audio)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.socialApi.getAudios(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAudiosWithCursor-get-"> Get Audio With Cursor (GET)</h6>
 The Audio API is used to get audio files data from the user's social account.<br><br><b>Supported Providers:</b> Live, Vkontakte  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/audio)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var nextCursor = "<nextCursor>"; //Required

 LoginRadiusSDK.socialApi.getAudiosWithCursor(accessToken, nextCursor, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetCheckIns-get-"> Check In (GET)</h6>
 The Check In API is used to get check Ins data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Foursquare, Vkontakte  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/check-in)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.socialApi.getCheckIns(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetCheckInsWithCursor-get-"> Get CheckIns With Cursor (GET)</h6>
 The Check In API is used to get check Ins data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Foursquare, Vkontakte  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/check-in)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var nextCursor = "<nextCursor>"; //Required

 LoginRadiusSDK.socialApi.getCheckInsWithCursor(accessToken, nextCursor, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetContacts-get-"> Contact (GET)</h6>
 The Contact API is used to get contacts/friends/connections data from the user's social account.This is one of the APIs that makes up the LoginRadius Friend Invite System. The data will normalized into LoginRadius' standard data format. This API requires setting permissions in your LoginRadius Dashboard. <br><br><b>Note:</b> Facebook restricts access to the list of friends that is returned. When using the Contacts API with Facebook you will only receive friends that have accepted some permissions with your app. <br><br><b>Supported Providers:</b> Facebook, Foursquare, Google, LinkedIn, Live, Twitter, Vkontakte, Yahoo  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/contact)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var nextCursor = "<nextCursor>"; //Optional

 LoginRadiusSDK.socialApi.getContacts(accessToken, nextCursor, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetEvents-get-"> Event (GET)</h6>
 The Event API is used to get the event data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Live  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/event)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.socialApi.getEvents(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetEventsWithCursor-get-"> Get Events With Cursor (GET)</h6>
 The Event API is used to get the event data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Live  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/event)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var nextCursor = "<nextCursor>"; //Required

 LoginRadiusSDK.socialApi.getEventsWithCursor(accessToken, nextCursor, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetFollowings-get-"> Following (GET)</h6>
 Get the following user list from the user's social account.<br><br><b>Supported Providers:</b> Twitter  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/following)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.socialApi.getFollowings(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetFollowingsWithCursor-get-"> Get Followings With Cursor (GET)</h6>
 Get the following user list from the user's social account.<br><br><b>Supported Providers:</b> Twitter  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/following)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var nextCursor = "<nextCursor>"; //Required

 LoginRadiusSDK.socialApi.getFollowingsWithCursor(accessToken, nextCursor, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetGroups-get-"> Group (GET)</h6>
 The Group API is used to get group data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Vkontakte  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/group)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.socialApi.getGroups(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetGroupsWithCursor-get-"> Get Groups With Cursor (GET)</h6>
 The Group API is used to get group data from the user's social account.<br><br><b>Supported Providers:</b> Facebook, Vkontakte  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/group)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var nextCursor = "<nextCursor>"; //Required

 LoginRadiusSDK.socialApi.getGroupsWithCursor(accessToken, nextCursor, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetLikes-get-"> Like (GET)</h6>
 The Like API is used to get likes data from the user's social account.<br><br><b>Supported Providers:</b> Facebook  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/like)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.socialApi.getLikes(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetLikesWithCursor-get-"> Get Likes With Cursor (GET)</h6>
 The Like API is used to get likes data from the user's social account.<br><br><b>Supported Providers:</b> Facebook  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/like)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var nextCursor = "<nextCursor>"; //Required

 LoginRadiusSDK.socialApi.getLikesWithCursor(accessToken, nextCursor, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetMentions-get-"> Mention (GET)</h6>
 The Mention API is used to get mentions data from the user's social account.<br><br><b>Supported Providers:</b> Twitter  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/mention)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.socialApi.getMentions(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetPage-get-"> Page (GET)</h6>
 The Page API is used to get the page data from the user's social account.<br><br><b>Supported Providers:</b>  Facebook, LinkedIn  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/page)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var pageName = "<pageName>"; //Required

 LoginRadiusSDK.socialApi.getPage(accessToken, pageName, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetPhotos-get-"> Photo (GET)</h6>
 The Photo API is used to get photo data from the user's social account.<br><br><b>Supported Providers:</b>  Facebook, Foursquare, Google, Live, Vkontakte  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/photo)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var albumId = "<albumId>"; //Required

 LoginRadiusSDK.socialApi.getPhotos(accessToken, albumId, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetPosts-get-"> Get Post (GET)</h6>
 The Post API is used to get post message data from the user's social account.<br><br><b>Supported Providers:</b>  Facebook  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/post)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.socialApi.getPosts(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetTrackableStatusStats-get-"> Get Trackable Status Stats (GET)</h6>
 The Trackable status API works very similar to the Status API but it returns a Post id that you can use to track the stats(shares, likes, comments) for a specific share/post/status update. This API requires setting permissions in your LoginRadius Dashboard.<br><br> The Trackable Status API is used to update the status on the user's wall and return an Post ID value. It is commonly referred to as Permission based sharing or Push notifications.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/get-trackable-status-stats/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var caption = "<caption>"; //Required
var description = "<description>"; //Required
var imageurl = "<imageurl>"; //Required
var status = "<status>"; //Required
var title = "<title>"; //Required
var url = "<url>"; //Required

 LoginRadiusSDK.socialApi.getTrackableStatusStats(accessToken, caption, description, imageurl, status, title, url, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetSocialUserProfile-get-"> User Profile (GET)</h6>
 The User Profile API is used to get social profile data from the user's social account after authentication.<br><br><b>Supported Providers:</b>  All  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/user-profile)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var fields = null; //Optional

 LoginRadiusSDK.socialApi.getSocialUserProfile(accessToken, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetRefreshedSocialUserProfile-get-"> Refresh User Profile (GET)</h6>
 The User Profile API is used to get the latest updated social profile data from the user's social account after authentication. The social profile will be retrieved via oAuth and OpenID protocols. The data is normalized into LoginRadius' standard data format. This API should be called using the access token retrieved from the refresh access token API.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/refresh-token/refresh-user-profile)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var fields = null; //Optional

 LoginRadiusSDK.socialApi.getRefreshedSocialUserProfile(accessToken, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetVideos-get-"> Video (GET)</h6>
 The Video API is used to get video files data from the user's social account.<br><br><b>Supported Providers:</b>   Facebook, Google, Live, Vkontakte  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/advanced-social-api/video)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var nextCursor = "<nextCursor>"; //Required

 LoginRadiusSDK.socialApi.getVideos(accessToken, nextCursor, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### CustomObject API


List of APIs in this Section:<br>

* PUT : [Custom Object Update by Access Token](#UpdateCustomObjectByToken-put-)<br>
* POST : [Create Custom Object by Token](#CreateCustomObjectByToken-post-)<br>
* GET : [Custom Object by Token](#GetCustomObjectByToken-get-)<br>
* GET : [Custom Object by ObjectRecordId and Token](#GetCustomObjectByRecordIDAndToken-get-)<br>
* DELETE : [Custom Object Delete by Record Id And Token](#DeleteCustomObjectByToken-delete-)<br>



<h6 id="UpdateCustomObjectByToken-put-"> Custom Object Update by Access Token (PUT)</h6>
 This API is used to update the specified custom object data of the specified account. If the value of updatetype is 'replace' then it will fully replace custom object with the new custom object and if the value of updatetype is 'partialreplace' then it will perform an upsert type operation  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/custom-object/custom-object-update-by-objectrecordid-and-token)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var objectName = "<objectName>"; //Required
var objectRecordId = "<objectRecordId>"; //Required

var object = { "customdata1": "Store my customdata1 value" };  //Required
var updateType = "<updateType>"; //Optional

 LoginRadiusSDK.customObjectApi.updateCustomObjectByToken(accessToken, objectName, objectRecordId, object, updateType, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="CreateCustomObjectByToken-post-"> Create Custom Object by Token (POST)</h6>
 This API is used to write information in JSON format to the custom object for the specified account.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/custom-object/create-custom-object-by-token)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var objectName = "<objectName>"; //Required

var object = { "customdata1": "Store my customdata1 value" };  //Required

 LoginRadiusSDK.customObjectApi.createCustomObjectByToken(accessToken, objectName, object, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetCustomObjectByToken-get-"> Custom Object by Token (GET)</h6>
 This API is used to retrieve the specified Custom Object data for the specified account.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/custom-object/custom-object-by-token)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var objectName = "<objectName>"; //Required

 LoginRadiusSDK.customObjectApi.getCustomObjectByToken(accessToken, objectName, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetCustomObjectByRecordIDAndToken-get-"> Custom Object by ObjectRecordId and Token (GET)</h6>
 This API is used to retrieve the Custom Object data for the specified account.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/custom-object/custom-object-by-objectrecordid-and-token)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var objectName = "<objectName>"; //Required
var objectRecordId = "<objectRecordId>"; //Required

 LoginRadiusSDK.customObjectApi.getCustomObjectByRecordIDAndToken(accessToken, objectName, objectRecordId, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="DeleteCustomObjectByToken-delete-"> Custom Object Delete by Record Id And Token (DELETE)</h6>
 This API is used to remove the specified Custom Object data using ObjectRecordId of a specified account.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/custom-object/custom-object-delete-by-objectrecordid-and-token)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var objectName = "<objectName>"; //Required
var objectRecordId = "<objectRecordId>"; //Required

 LoginRadiusSDK.customObjectApi.deleteCustomObjectByToken(accessToken, objectName, objectRecordId, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### PhoneAuthentication API


List of APIs in this Section:<br>

* PUT : [Phone Reset Password by OTP](#ResetPasswordByPhoneOTP-put-)<br>
* PUT : [Phone Verification OTP](#PhoneVerificationByOTP-put-)<br>
* PUT : [Phone Verification OTP by Token](#PhoneVerificationOTPByAccessToken-put-)<br>
* PUT : [Phone Number Update](#UpdatePhoneNumber-put-)<br>
* POST : [Phone Login](#LoginByPhone-post-)<br>
* POST : [Phone Forgot Password by OTP](#ForgotPasswordByPhoneOTP-post-)<br>
* POST : [Phone Resend Verification OTP](#PhoneResendVerificationOTP-post-)<br>
* POST : [Phone Resend Verification OTP By Token](#PhoneResendVerificationOTPByToken-post-)<br>
* POST : [Phone User Registration by SMS](#UserRegistrationByPhone-post-)<br>
* GET : [Phone Number Availability](#CheckPhoneNumberAvailability-get-)<br>
* DELETE : [Remove Phone ID by Access Token](#RemovePhoneIDByAccessToken-delete-)<br>



<h6 id="ResetPasswordByPhoneOTP-put-"> Phone Reset Password by OTP (PUT)</h6>
 This API is used to reset the password  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-reset-password-by-otp)

 
 

 ```


var resetPasswordByOTPModel ={ 
"otp" : "<otp>",
"password" : "<password>",
"phone" : "<phone>"
};  //Required

 LoginRadiusSDK.phoneAuthenticationApi.resetPasswordByPhoneOTP(resetPasswordByOTPModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="PhoneVerificationByOTP-put-"> Phone Verification OTP (PUT)</h6>
 This API is used to validate the verification code sent to verify a user's phone number  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-verify-otp)

 
 

 ```

var otp = "<otp>"; //Required
var phone = "<phone>"; //Required
var fields = null; //Optional
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.phoneAuthenticationApi.phoneVerificationByOTP(otp, phone, fields, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="PhoneVerificationOTPByAccessToken-put-"> Phone Verification OTP by Token (PUT)</h6>
 This API is used to consume the verification code sent to verify a user's phone number. Use this call for front-end purposes in cases where the user is already logged in by passing the user's access token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-verify-otp-by-token)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var otp = "<otp>"; //Required
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.phoneAuthenticationApi.phoneVerificationOTPByAccessToken(accessToken, otp, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="UpdatePhoneNumber-put-"> Phone Number Update (PUT)</h6>
 This API is used to update the login Phone Number of users  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-number-update)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var phone = "<phone>"; //Required
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.phoneAuthenticationApi.updatePhoneNumber(accessToken, phone, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="LoginByPhone-post-"> Phone Login (POST)</h6>
 This API retrieves a copy of the user data based on the Phone  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-login)

 
 

 ```


var phoneAuthenticationModel ={ 
"password" : "<password>",
"phone" : "<phone>"
};  //Required
var fields = null; //Optional
var loginUrl = "<loginUrl>"; //Optional
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.phoneAuthenticationApi.loginByPhone(phoneAuthenticationModel, fields, loginUrl, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ForgotPasswordByPhoneOTP-post-"> Phone Forgot Password by OTP (POST)</h6>
 This API is used to send the OTP to reset the account password.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-forgot-password-by-otp)

 
 

 ```

var phone = "<phone>"; //Required
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.phoneAuthenticationApi.forgotPasswordByPhoneOTP(phone, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="PhoneResendVerificationOTP-post-"> Phone Resend Verification OTP (POST)</h6>
 This API is used to resend a verification OTP to verify a user's Phone Number. The user will receive a verification code that they will need to input  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-resend-otp)

 
 

 ```

var phone = "<phone>"; //Required
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.phoneAuthenticationApi.phoneResendVerificationOTP(phone, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="PhoneResendVerificationOTPByToken-post-"> Phone Resend Verification OTP By Token (POST)</h6>
 This API is used to resend a verification OTP to verify a user's Phone Number in cases in which an active token already exists  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-resend-otp-by-token)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var phone = "<phone>"; //Required
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.phoneAuthenticationApi.phoneResendVerificationOTPByToken(accessToken, phone, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="UserRegistrationByPhone-post-"> Phone User Registration by SMS (POST)</h6>
 This API registers the new users into your Cloud Storage and triggers the phone verification process.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-user-registration-by-sms)

 
 

 ```


var authUserRegistrationModel ={ 
"firstName" : "<firstName>",
"lastName" : "<lastName>",
"password" : "<password>",
"phoneId" : "<phoneId>"
};  //Required
var sott = "<sott>"; //Required
var fields = null; //Optional
var options = "<options>"; //Optional
var smsTemplate = "<smsTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.phoneAuthenticationApi.userRegistrationByPhone(authUserRegistrationModel, sott, fields, options, smsTemplate, verificationUrl, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="CheckPhoneNumberAvailability-get-"> Phone Number Availability (GET)</h6>
 This API is used to check the Phone Number exists or not on your site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-number-availability)

 
 

 ```

var phone = "<phone>"; //Required

 LoginRadiusSDK.phoneAuthenticationApi.checkPhoneNumberAvailability(phone, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="RemovePhoneIDByAccessToken-delete-"> Remove Phone ID by Access Token (DELETE)</h6>
 This API is used to delete the Phone ID on a user's account via the access token  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/remove-phone-id-by-access-token)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.phoneAuthenticationApi.removePhoneIDByAccessToken(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### MultiFactorAuthentication API


List of APIs in this Section:<br>

* PUT : [Update MFA Setting](#MFAUpdateSetting-put-)<br>
* PUT : [Update MFA by Access Token](#MFAUpdateByAccessToken-put-)<br>
* PUT : [MFA Update Phone Number by Token](#MFAUpdatePhoneNumberByToken-put-)<br>
* PUT : [MFA Validate OTP](#MFAValidateOTPByPhone-put-)<br>
* PUT : [MFA Validate Google Auth Code](#MFAValidateGoogleAuthCode-put-)<br>
* PUT : [MFA Validate Backup code](#MFAValidateBackupCode-put-)<br>
* PUT : [MFA Update Phone Number](#MFAUpdatePhoneNumber-put-)<br>
* POST : [MFA Email Login](#MFALoginByEmail-post-)<br>
* POST : [MFA UserName Login](#MFALoginByUserName-post-)<br>
* POST : [MFA Phone Login](#MFALoginByPhone-post-)<br>
* GET : [MFA Validate Access Token](#MFAConfigureByAccessToken-get-)<br>
* GET : [MFA Backup Code by Access Token](#MFABackupCodeByAccessToken-get-)<br>
* GET : [Reset Backup Code by Access Token](#MFAResetBackupCodeByAccessToken-get-)<br>
* GET : [MFA Resend Otp](#MFAResendOTP-get-)<br>
* DELETE : [MFA Reset Google Authenticator by Token](#MFAResetGoogleAuthByToken-delete-)<br>
* DELETE : [MFA Reset SMS Authenticator by Token](#MFAResetSMSAuthByToken-delete-)<br>



<h6 id="MFAUpdateSetting-put-"> Update MFA Setting (PUT)</h6>
 This API is used to trigger the Multi-factor authentication settings after login for secure actions  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/sms-authenticator/update-mfa-setting/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var multiFactorAuthModelWithLockout ={ 
"otp" : "<otp>"
};  //Required
var fields = null; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaUpdateSetting(accessToken, multiFactorAuthModelWithLockout, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAUpdateByAccessToken-put-"> Update MFA by Access Token (PUT)</h6>
 This API is used to Enable Multi-factor authentication by access token on user login  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/google-authenticator/update-mfa-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var multiFactorAuthModelByGoogleAuthenticatorCode ={ 
"googleAuthenticatorCode" : "<googleAuthenticatorCode>"
};  //Required
var fields = null; //Optional
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaUpdateByAccessToken(accessToken, multiFactorAuthModelByGoogleAuthenticatorCode, fields, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAUpdatePhoneNumberByToken-put-"> MFA Update Phone Number by Token (PUT)</h6>
 This API is used to update the Multi-factor authentication phone number by sending the verification OTP to the provided phone number  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/sms-authenticator/mfa-update-phone-number-by-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var phoneNo2FA = "<phoneNo2FA>"; //Required
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaUpdatePhoneNumberByToken(accessToken, phoneNo2FA, smsTemplate2FA, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAValidateOTPByPhone-put-"> MFA Validate OTP (PUT)</h6>
 This API is used to login via Multi-factor authentication by passing the One Time Password received via SMS  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/sms-authenticator/mfa-validate-otp/)

 
 

 ```


var multiFactorAuthModelWithLockout ={ 
"otp" : "<otp>"
};  //Required
var secondFactorAuthenticationToken = "<secondFactorAuthenticationToken>"; //Required
var fields = null; //Optional
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaValidateOTPByPhone(multiFactorAuthModelWithLockout, secondFactorAuthenticationToken, fields, smsTemplate2FA, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAValidateGoogleAuthCode-put-"> MFA Validate Google Auth Code (PUT)</h6>
 This API is used to login via Multi-factor-authentication by passing the google authenticator code.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/google-authenticator/mfa-validate-google-auth-code/)

 
 

 ```

var googleAuthenticatorCode = "<googleAuthenticatorCode>"; //Required
var secondFactorAuthenticationToken = "<secondFactorAuthenticationToken>"; //Required
var fields = null; //Optional
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaValidateGoogleAuthCode(googleAuthenticatorCode, secondFactorAuthenticationToken, fields, smsTemplate2FA, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAValidateBackupCode-put-"> MFA Validate Backup code (PUT)</h6>
 This API is used to validate the backup code provided by the user and if valid, we return an access token allowing the user to login incases where Multi-factor authentication (MFA) is enabled and the secondary factor is unavailable. When a user initially downloads the Backup codes, We generate 10 codes, each code can only be consumed once. if any user attempts to go over the number of invalid login attempts configured in the Dashboard then the account gets blocked automatically  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/backup-codes/mfa-validate-backup-code/)

 
 

 ```


var multiFactorAuthModelByBackupCode ={ 
"backupCode" : "<backupCode>"
};  //Required
var secondFactorAuthenticationToken = "<secondFactorAuthenticationToken>"; //Required
var fields = null; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaValidateBackupCode(multiFactorAuthModelByBackupCode, secondFactorAuthenticationToken, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAUpdatePhoneNumber-put-"> MFA Update Phone Number (PUT)</h6>
 This API is used to update (if configured) the phone number used for Multi-factor authentication by sending the verification OTP to the provided phone number  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/sms-authenticator/mfa-update-phone-number/)

 
 

 ```

var phoneNo2FA = "<phoneNo2FA>"; //Required
var secondFactorAuthenticationToken = "<secondFactorAuthenticationToken>"; //Required
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaUpdatePhoneNumber(phoneNo2FA, secondFactorAuthenticationToken, smsTemplate2FA, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFALoginByEmail-post-"> MFA Email Login (POST)</h6>
 This API can be used to login by emailid on a Multi-factor authentication enabled LoginRadius site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/mfa-email-login)

 
 

 ```

var email = "<email>"; //Required
var password = "<password>"; //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var loginUrl = "<loginUrl>"; //Optional
var smsTemplate = "<smsTemplate>"; //Optional
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaLoginByEmail(email, password, emailTemplate, fields, loginUrl, smsTemplate, smsTemplate2FA, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFALoginByUserName-post-"> MFA UserName Login (POST)</h6>
 This API can be used to login by username on a Multi-factor authentication enabled LoginRadius site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/mfa-user-name-login)

 
 

 ```

var password = "<password>"; //Required
var username = "<username>"; //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var loginUrl = "<loginUrl>"; //Optional
var smsTemplate = "<smsTemplate>"; //Optional
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaLoginByUserName(password, username, emailTemplate, fields, loginUrl, smsTemplate, smsTemplate2FA, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFALoginByPhone-post-"> MFA Phone Login (POST)</h6>
 This API can be used to login by Phone on a Multi-factor authentication enabled LoginRadius site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/mfa-phone-login)

 
 

 ```

var password = "<password>"; //Required
var phone = "<phone>"; //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var loginUrl = "<loginUrl>"; //Optional
var smsTemplate = "<smsTemplate>"; //Optional
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaLoginByPhone(password, phone, emailTemplate, fields, loginUrl, smsTemplate, smsTemplate2FA, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAConfigureByAccessToken-get-"> MFA Validate Access Token (GET)</h6>
 This API is used to configure the Multi-factor authentication after login by using the access token when MFA is set as optional on the LoginRadius site.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/mfa-validate-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaConfigureByAccessToken(accessToken, smsTemplate2FA, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFABackupCodeByAccessToken-get-"> MFA Backup Code by Access Token (GET)</h6>
 This API is used to get a set of backup codes via access token to allow the user login on a site that has Multi-factor Authentication enabled in the event that the user does not have a secondary factor available. We generate 10 codes, each code can only be consumed once. If any user attempts to go over the number of invalid login attempts configured in the Dashboard then the account gets blocked automatically  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/backup-codes/mfa-backup-code-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaBackupCodeByAccessToken(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAResetBackupCodeByAccessToken-get-"> Reset Backup Code by Access Token (GET)</h6>
 API is used to reset the backup codes on a given account via the access token. This API call will generate 10 new codes, each code can only be consumed once  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/backup-codes/mfa-reset-backup-code-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaResetBackupCodeByAccessToken(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAResendOTP-get-"> MFA Resend Otp (GET)</h6>
 This API is used to resending the verification OTP to the provided phone number  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/resend-twofactorauthentication-otp/)

 
 

 ```

var secondFactorAuthenticationToken = "<secondFactorAuthenticationToken>"; //Required
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaResendOTP(secondFactorAuthenticationToken, smsTemplate2FA, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAResetGoogleAuthByToken-delete-"> MFA Reset Google Authenticator by Token (DELETE)</h6>
 This API Resets the Google Authenticator configurations on a given account via the access token  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/google-authenticator/mfa-reset-google-authenticator-by-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var googleauthenticator = true; //Required

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaResetGoogleAuthByToken(accessToken, googleauthenticator, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAResetSMSAuthByToken-delete-"> MFA Reset SMS Authenticator by Token (DELETE)</h6>
 This API resets the SMS Authenticator configurations on a given account via the access token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/sms-authenticator/mfa-reset-sms-authenticator-by-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var otpauthenticator = true; //Required

 LoginRadiusSDK.multiFactorAuthenticationApi.mfaResetSMSAuthByToken(accessToken, otpauthenticator, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### PINAuthentication API


List of APIs in this Section:<br>

* PUT : [Reset PIN By ResetToken](#ResetPINByResetToken-put-)<br>
* PUT : [Reset PIN By SecurityAnswer And Email](#ResetPINByEmailAndSecurityAnswer-put-)<br>
* PUT : [Reset PIN By SecurityAnswer And Username](#ResetPINByUsernameAndSecurityAnswer-put-)<br>
* PUT : [Reset PIN By SecurityAnswer And Phone](#ResetPINByPhoneAndSecurityAnswer-put-)<br>
* PUT : [Change PIN By Token](#ChangePINByAccessToken-put-)<br>
* PUT : [Reset PIN by Phone and OTP](#ResetPINByPhoneAndOtp-put-)<br>
* PUT : [Reset PIN by Email and OTP](#ResetPINByEmailAndOtp-put-)<br>
* PUT : [Reset PIN by Username and OTP](#ResetPINByUsernameAndOtp-put-)<br>
* POST : [PIN Login](#PINLogin-post-)<br>
* POST : [Forgot PIN By Email](#SendForgotPINEmailByEmail-post-)<br>
* POST : [Forgot PIN By UserName](#SendForgotPINEmailByUsername-post-)<br>
* POST : [Forgot PIN By Phone](#SendForgotPINSMSByPhone-post-)<br>
* POST : [Set PIN By PinAuthToken](#SetPINByPinAuthToken-post-)<br>
* GET : [Invalidate PIN Session Token](#InValidatePinSessionToken-get-)<br>



<h6 id="ResetPINByResetToken-put-"> Reset PIN By ResetToken (PUT)</h6>
 This API is used to reset pin using reset token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/reset-pin-by-resettoken/)

 
 

 ```


var resetPINByResetToken ={ 
"pin" : "<pin>",
"resetToken" : "<resetToken>"
};  //Required

 LoginRadiusSDK.pinAuthenticationApi.resetPINByResetToken(resetPINByResetToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPINByEmailAndSecurityAnswer-put-"> Reset PIN By SecurityAnswer And Email (PUT)</h6>
 This API is used to reset pin using security question answer and email.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/reset-pin-by-securityanswer-and-email/)

 
 

 ```


var resetPINBySecurityQuestionAnswerAndEmailModel ={ 
"email" : "<email>",
"pin" : "<pin>",
"securityAnswer" : {"QuestionID":"Answer"}
};  //Required

 LoginRadiusSDK.pinAuthenticationApi.resetPINByEmailAndSecurityAnswer(resetPINBySecurityQuestionAnswerAndEmailModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPINByUsernameAndSecurityAnswer-put-"> Reset PIN By SecurityAnswer And Username (PUT)</h6>
 This API is used to reset pin using security question answer and username.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/reset-pin-by-securityanswer-and-username/)

 
 

 ```


var resetPINBySecurityQuestionAnswerAndUsernameModel ={ 
"pin" : "<pin>",
"securityAnswer" : {"QuestionID":"Answer"},
"username" : "<username>"
};  //Required

 LoginRadiusSDK.pinAuthenticationApi.resetPINByUsernameAndSecurityAnswer(resetPINBySecurityQuestionAnswerAndUsernameModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPINByPhoneAndSecurityAnswer-put-"> Reset PIN By SecurityAnswer And Phone (PUT)</h6>
 This API is used to reset pin using security question answer and phone.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/reset-pin-by-securityanswer-and-phone/)

 
 

 ```


var resetPINBySecurityQuestionAnswerAndPhoneModel ={ 
"phone" : "<phone>",
"pin" : "<pin>",
"securityAnswer" : {"QuestionID":"Answer"}
};  //Required

 LoginRadiusSDK.pinAuthenticationApi.resetPINByPhoneAndSecurityAnswer(resetPINBySecurityQuestionAnswerAndPhoneModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ChangePINByAccessToken-put-"> Change PIN By Token (PUT)</h6>
 This API is used to change a user's PIN using access token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/change-pin-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var changePINModel ={ 
"newPIN" : "<newPIN>",
"oldPIN" : "<oldPIN>"
};  //Required

 LoginRadiusSDK.pinAuthenticationApi.changePINByAccessToken(accessToken, changePINModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPINByPhoneAndOtp-put-"> Reset PIN by Phone and OTP (PUT)</h6>
 This API is used to reset pin using phoneId and OTP.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/reset-pin-by-phone-and-otp/)

 
 

 ```


var resetPINByPhoneAndOTPModel ={ 
"otp" : "<otp>",
"phone" : "<phone>",
"pin" : "<pin>"
};  //Required

 LoginRadiusSDK.pinAuthenticationApi.resetPINByPhoneAndOtp(resetPINByPhoneAndOTPModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPINByEmailAndOtp-put-"> Reset PIN by Email and OTP (PUT)</h6>
 This API is used to reset pin using email and OTP.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/reset-pin-by-email-and-otp/)

 
 

 ```


var resetPINByEmailAndOtpModel ={ 
"email" : "<email>",
"otp" : "<otp>",
"pin" : "<pin>"
};  //Required

 LoginRadiusSDK.pinAuthenticationApi.resetPINByEmailAndOtp(resetPINByEmailAndOtpModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="ResetPINByUsernameAndOtp-put-"> Reset PIN by Username and OTP (PUT)</h6>
 This API is used to reset pin using username and OTP.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/reset-pin-by-username-and-otp/)

 
 

 ```


var resetPINByUsernameAndOtpModel ={ 
"otp" : "<otp>",
"pin" : "<pin>",
"username" : "<username>"
};  //Required

 LoginRadiusSDK.pinAuthenticationApi.resetPINByUsernameAndOtp(resetPINByUsernameAndOtpModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="PINLogin-post-"> PIN Login (POST)</h6>
 This API is used to login a user by pin and session token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/login-by-pin/)

 
 

 ```


var loginByPINModel ={ 
"pin" : "<pin>"
};  //Required
var sessionToken = "<sessionToken>"; //Required

 LoginRadiusSDK.pinAuthenticationApi.pinLogin(loginByPINModel, sessionToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SendForgotPINEmailByEmail-post-"> Forgot PIN By Email (POST)</h6>
 This API sends the reset pin email to specified email address.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/forgot-pin-by-email/)

 
 

 ```


var forgotPINLinkByEmailModel ={ 
"email" : "<email>"
};  //Required
var emailTemplate = "<emailTemplate>"; //Optional
var resetPINUrl = "<resetPINUrl>"; //Optional

 LoginRadiusSDK.pinAuthenticationApi.sendForgotPINEmailByEmail(forgotPINLinkByEmailModel, emailTemplate, resetPINUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SendForgotPINEmailByUsername-post-"> Forgot PIN By UserName (POST)</h6>
 This API sends the reset pin email using username.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/forgot-pin-by-username/)

 
 

 ```


var forgotPINLinkByUserNameModel ={ 
"userName" : "<userName>"
};  //Required
var emailTemplate = "<emailTemplate>"; //Optional
var resetPINUrl = "<resetPINUrl>"; //Optional

 LoginRadiusSDK.pinAuthenticationApi.sendForgotPINEmailByUsername(forgotPINLinkByUserNameModel, emailTemplate, resetPINUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SendForgotPINSMSByPhone-post-"> Forgot PIN By Phone (POST)</h6>
 This API sends the OTP to specified phone number  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/forgot-pin-by-phone/)

 
 

 ```


var forgotPINOtpByPhoneModel ={ 
"phone" : "<phone>"
};  //Required
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.pinAuthenticationApi.sendForgotPINSMSByPhone(forgotPINOtpByPhoneModel, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SetPINByPinAuthToken-post-"> Set PIN By PinAuthToken (POST)</h6>
 This API is used to change a user's PIN using Pin Auth token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/set-pin-by-pinauthtoken/)

 
 

 ```


var pinRequiredModel ={ 
"pin" : "<pin>"
};  //Required
var pinAuthToken = "<pinAuthToken>"; //Required

 LoginRadiusSDK.pinAuthenticationApi.setPINByPinAuthToken(pinRequiredModel, pinAuthToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="InValidatePinSessionToken-get-"> Invalidate PIN Session Token (GET)</h6>
 This API is used to invalidate pin session token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/invalidate-pin-session-token/)

 
 

 ```

var sessionToken = "<sessionToken>"; //Required

 LoginRadiusSDK.pinAuthenticationApi.inValidatePinSessionToken(sessionToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### ReAuthentication API


List of APIs in this Section:<br>

* PUT : [Validate MFA by OTP](#MFAReAuthenticateByOTP-put-)<br>
* PUT : [Validate MFA by Backup Code](#MFAReAuthenticateByBackupCode-put-)<br>
* PUT : [Validate MFA by Google Authenticator Code](#MFAReAuthenticateByGoogleAuth-put-)<br>
* PUT : [Validate MFA by Password](#MFAReAuthenticateByPassword-put-)<br>
* PUT : [MFA Re-authentication by PIN](#VerifyPINAuthentication-put-)<br>
* GET : [Multi Factor Re-Authenticate](#MFAReAuthenticate-get-)<br>



<h6 id="MFAReAuthenticateByOTP-put-"> Validate MFA by OTP (PUT)</h6>
 This API is used to re-authenticate via Multi-factor authentication by passing the One Time Password received via SMS  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/re-authentication/mfa/re-auth-by-otp/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var reauthByOtpModel ={ 
"otp" : "<otp>"
};  //Required

 LoginRadiusSDK.reAuthenticationApi.mfaReAuthenticateByOTP(accessToken, reauthByOtpModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAReAuthenticateByBackupCode-put-"> Validate MFA by Backup Code (PUT)</h6>
 This API is used to re-authenticate by set of backup codes via access token on the site that has Multi-factor authentication enabled in re-authentication for the user that does not have the device  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/re-authentication/mfa/re-auth-by-backup-code/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var reauthByBackupCodeModel ={ 
"backupCode" : "<backupCode>"
};  //Required

 LoginRadiusSDK.reAuthenticationApi.mfaReAuthenticateByBackupCode(accessToken, reauthByBackupCodeModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAReAuthenticateByGoogleAuth-put-"> Validate MFA by Google Authenticator Code (PUT)</h6>
 This API is used to re-authenticate via Multi-factor-authentication by passing the google authenticator code  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/re-authentication/re-auth-by-google-authenticator-code)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var reauthByGoogleAuthenticatorCodeModel ={ 
"googleAuthenticatorCode" : "<googleAuthenticatorCode>"
};  //Required

 LoginRadiusSDK.reAuthenticationApi.mfaReAuthenticateByGoogleAuth(accessToken, reauthByGoogleAuthenticatorCodeModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAReAuthenticateByPassword-put-"> Validate MFA by Password (PUT)</h6>
 This API is used to re-authenticate via Multi-factor-authentication by passing the password  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/re-authentication/re-auth-by-password)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var passwordEventBasedAuthModelWithLockout ={ 
"password" : "<password>"
};  //Required
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional

 LoginRadiusSDK.reAuthenticationApi.mfaReAuthenticateByPassword(accessToken, passwordEventBasedAuthModelWithLockout, smsTemplate2FA, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="VerifyPINAuthentication-put-"> MFA Re-authentication by PIN (PUT)</h6>
 This API is used to validate the triggered MFA authentication flow with a password.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/re-authentication/pin/re-auth-by-pin/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var pinAuthEventBasedAuthModelWithLockout ={ 
"pin" : "<pin>"
};  //Required
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional

 LoginRadiusSDK.reAuthenticationApi.verifyPINAuthentication(accessToken, pinAuthEventBasedAuthModelWithLockout, smsTemplate2FA, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="MFAReAuthenticate-get-"> Multi Factor Re-Authenticate (GET)</h6>
 This API is used to trigger the Multi-Factor Autentication workflow for the provided access token  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/re-authentication/re-auth-trigger/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var smsTemplate2FA = "<smsTemplate2FA>"; //Optional

 LoginRadiusSDK.reAuthenticationApi.mfaReAuthenticate(accessToken, smsTemplate2FA, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### ConsentManagement API


List of APIs in this Section:<br>

* PUT : [Update Consent By Access Token](#UpdateConsentProfileByAccessToken-put-)<br>
* POST : [Consent By ConsentToken](#SubmitConsentByConsentToken-post-)<br>
* POST : [Post Consent By Access Token](#SubmitConsentByAccessToken-post-)<br>
* GET : [Get Consent Log by Access Token](#GetConsentLogs-get-)<br>
* GET : [Get Verify Consent By Access Token](#VerifyConsentByAccessToken-get-)<br>



<h6 id="UpdateConsentProfileByAccessToken-put-"> Update Consent By Access Token (PUT)</h6>
 This API is to update consents using access token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/consent-management/update-consent-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var consentUpdateModel ={ 
"consents" : [   { 
 "consentOptionId" : "<consentOptionId>"  ,
"isAccepted" : true  
}  ] 
};  //Required

 LoginRadiusSDK.consentManagementApi.updateConsentProfileByAccessToken(accessToken, consentUpdateModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SubmitConsentByConsentToken-post-"> Consent By ConsentToken (POST)</h6>
 This API is to submit consent form using consent token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/consent-management/consent-by-consent-token/)

 
 

 ```

var consentToken = "<consentToken>"; //Required

var consentSubmitModel ={ 
"data" : [   { 
 "consentOptionId" : "<consentOptionId>"  ,
"isAccepted" : true  
}  ] ,
"events" : [   { 
 "event" : "<event>"  ,
"isCustom" : true  
}  ] 
};  //Required

 LoginRadiusSDK.consentManagementApi.submitConsentByConsentToken(consentToken, consentSubmitModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SubmitConsentByAccessToken-post-"> Post Consent By Access Token (POST)</h6>
 API to provide a way to end user to submit a consent form for particular event type.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/consent-management/consent-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

var consentSubmitModel ={ 
"data" : [   { 
 "consentOptionId" : "<consentOptionId>"  ,
"isAccepted" : true  
}  ] ,
"events" : [   { 
 "event" : "<event>"  ,
"isCustom" : true  
}  ] 
};  //Required

 LoginRadiusSDK.consentManagementApi.submitConsentByAccessToken(accessToken, consentSubmitModel, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetConsentLogs-get-"> Get Consent Log by Access Token (GET)</h6>
 This API is used to fetch consent logs.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/consent-management/consent-log-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required

 LoginRadiusSDK.consentManagementApi.getConsentLogs(accessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="VerifyConsentByAccessToken-get-"> Get Verify Consent By Access Token (GET)</h6>
 This API is used to check if consent is submitted for a particular event or not.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/consent-management/verify-consent-by-access-token/)

 
 

 ```

var accessToken = "<accessToken>"; //Required
var event = "<event>"; //Required
var isCustom = true; //Required

 LoginRadiusSDK.consentManagementApi.verifyConsentByAccessToken(accessToken, event, isCustom, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### SmartLogin API


List of APIs in this Section:<br>

* GET : [Smart Login Verify Token](#SmartLoginTokenVerification-get-)<br>
* GET : [Smart Login By Email](#SmartLoginByEmail-get-)<br>
* GET : [Smart Login By Username](#SmartLoginByUserName-get-)<br>
* GET : [Smart Login Ping](#SmartLoginPing-get-)<br>



<h6 id="SmartLoginTokenVerification-get-"> Smart Login Verify Token (GET)</h6>
 This API verifies the provided token for Smart Login  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/smart-login/smart-login-verify-token/)

 
 

 ```

var verificationToken = "<verificationToken>"; //Required
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.smartLoginApi.smartLoginTokenVerification(verificationToken, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SmartLoginByEmail-get-"> Smart Login By Email (GET)</h6>
 This API sends a Smart Login link to the user's Email Id.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/smart-login/smart-login-by-email)

 
 

 ```

var clientGuid = "<clientGuid>"; //Required
var email = "<email>"; //Required
var redirectUrl = "<redirectUrl>"; //Optional
var smartLoginEmailTemplate = "<smartLoginEmailTemplate>"; //Optional
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.smartLoginApi.smartLoginByEmail(clientGuid, email, redirectUrl, smartLoginEmailTemplate, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SmartLoginByUserName-get-"> Smart Login By Username (GET)</h6>
 This API sends a Smart Login link to the user's Email Id.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/smart-login/smart-login-by-username)

 
 

 ```

var clientGuid = "<clientGuid>"; //Required
var username = "<username>"; //Required
var redirectUrl = "<redirectUrl>"; //Optional
var smartLoginEmailTemplate = "<smartLoginEmailTemplate>"; //Optional
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.smartLoginApi.smartLoginByUserName(clientGuid, username, redirectUrl, smartLoginEmailTemplate, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="SmartLoginPing-get-"> Smart Login Ping (GET)</h6>
 This API is used to check if the Smart Login link has been clicked or not  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/smart-login/smart-login-ping)

 
 

 ```

var clientGuid = "<clientGuid>"; //Required
var fields = null; //Optional

 LoginRadiusSDK.smartLoginApi.smartLoginPing(clientGuid, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### OneTouchLogin API


List of APIs in this Section:<br>

* PUT : [One Touch OTP Verification](#OneTouchLoginOTPVerification-put-)<br>
* POST : [One Touch Login by Email](#OneTouchLoginByEmail-post-)<br>
* POST : [One Touch Login by Phone](#OneTouchLoginByPhone-post-)<br>
* GET : [One Touch Email Verification](#OneTouchEmailVerification-get-)<br>
* GET : [One Touch Login Ping](#OneTouchLoginPing-get-)<br>



<h6 id="OneTouchLoginOTPVerification-put-"> One Touch OTP Verification (PUT)</h6>
 This API is used to verify the otp for One Touch Login.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/one-touch-login/one-touch-otp-verification/)

 
 

 ```

var otp = "<otp>"; //Required
var phone = "<phone>"; //Required
var fields = null; //Optional
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.oneTouchLoginApi.oneTouchLoginOTPVerification(otp, phone, fields, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="OneTouchLoginByEmail-post-"> One Touch Login by Email (POST)</h6>
 This API is used to send a link to a specified email for a frictionless login/registration  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/one-touch-login/one-touch-login-by-email-captcha/)

 
 

 ```


var oneTouchLoginByEmailModel ={ 
"clientguid" : "<clientguid>",
"email" : "<email>",
"g-recaptcha-response" : "<g-recaptcha-response>"
};  //Required
var oneTouchLoginEmailTemplate = "<oneTouchLoginEmailTemplate>"; //Optional
var redirecturl = "<redirecturl>"; //Optional
var welcomeemailtemplate = "<welcomeemailtemplate>"; //Optional

 LoginRadiusSDK.oneTouchLoginApi.oneTouchLoginByEmail(oneTouchLoginByEmailModel, oneTouchLoginEmailTemplate, redirecturl, welcomeemailtemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="OneTouchLoginByPhone-post-"> One Touch Login by Phone (POST)</h6>
 This API is used to send one time password to a given phone number for a frictionless login/registration.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/one-touch-login/one-touch-login-by-phone-captcha/)

 
 

 ```


var oneTouchLoginByPhoneModel ={ 
"g-recaptcha-response" : "<g-recaptcha-response>",
"phone" : "<phone>"
};  //Required
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.oneTouchLoginApi.oneTouchLoginByPhone(oneTouchLoginByPhoneModel, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="OneTouchEmailVerification-get-"> One Touch Email Verification (GET)</h6>
 This API verifies the provided token for One Touch Login  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/one-touch-login/one-touch-email-verification)

 
 

 ```

var verificationToken = "<verificationToken>"; //Required
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.oneTouchLoginApi.oneTouchEmailVerification(verificationToken, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="OneTouchLoginPing-get-"> One Touch Login Ping (GET)</h6>
 This API is used to check if the One Touch Login link has been clicked or not.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/one-touch-login/one-touch-login-ping/)

 
 

 ```

var clientGuid = "<clientGuid>"; //Required
var fields = null; //Optional

 LoginRadiusSDK.oneTouchLoginApi.oneTouchLoginPing(clientGuid, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### PasswordLessLogin API


List of APIs in this Section:<br>

* PUT : [Passwordless Login Phone Verification](#PasswordlessLoginPhoneVerification-put-)<br>
* POST : [Passwordless Login Verification By Email And OTP](#PasswordlessLoginVerificationByEmailAndOTP-post-)<br>
* POST : [Passwordless Login Verification By User Name And OTP](#PasswordlessLoginVerificationByUserNameAndOTP-post-)<br>
* GET : [Passwordless Login by Phone](#PasswordlessLoginByPhone-get-)<br>
* GET : [Passwordless Login By Email](#PasswordlessLoginByEmail-get-)<br>
* GET : [Passwordless Login By UserName](#PasswordlessLoginByUserName-get-)<br>
* GET : [Passwordless Login Verification](#PasswordlessLoginVerification-get-)<br>



<h6 id="PasswordlessLoginPhoneVerification-put-"> Passwordless Login Phone Verification (PUT)</h6>
 This API verifies an account by OTP and allows the customer to login.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/passwordless-login/passwordless-login-phone-verification)

 
 

 ```


var passwordLessLoginOtpModel ={ 
"otp" : "<otp>",
"phone" : "<phone>"
};  //Required
var fields = null; //Optional
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.passwordLessLoginApi.passwordlessLoginPhoneVerification(passwordLessLoginOtpModel, fields, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
<h6 id="PasswordlessLoginVerificationByEmailAndOTP-post-">Passwordless Login Verification By Email And OTP (POST)</h6>
This API is used to verify the otp sent to the email when doing a passwordless login. [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/passwordless-login/passwordless-login-verify-by-email-and-otp/)

 
 

 ```


var passwordLessLoginByEmailAndOtpModel ={ 
 "email": "<email>",
 "otp": "<otp>",
 "welcomeemailtemplate": "<welcome_email_template>"
  };  //Required

var fields = null; //Optional

 LoginRadiusSDK.passwordLessLoginApi.passwordlessLoginVerificationByEmailAndOTP(passwordLessLoginByEmailAndOtpModel, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ``` 
  
<h6 id="PasswordlessLoginVerificationByUserNameAndOTP-post-">Passwordless Login Verification By User Name And OTP (POST)</h6>
This API is used to verify the otp sent to the email when doing a passwordless   [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/passwordless-login/passwordless-login-verify-by-username-and-otp/)

 
 

 ```

var passwordLessLoginByUserNameAndOtpModel ={ 
 "username": "<email>",
 "otp": "<otp>",
 "welcomeemailtemplate": "<welcome_email_template>"
  };  //Required
var fields = null; //Optional

 LoginRadiusSDK.passwordLessLoginApi.passwordlessLoginVerificationByUserNameAndOTP(passwordLessLoginByUserNameAndOtpModel, fields, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```

<h6 id="PasswordlessLoginByPhone-get-"> Passwordless Login by Phone (GET)</h6>
 API can be used to send a One-time Passcode (OTP) provided that the account has a verified PhoneID  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/passwordless-login/passwordless-login-by-phone)

 
 

 ```

var phone = "<phone>"; //Required
var smsTemplate = "<smsTemplate>"; //Optional

 LoginRadiusSDK.passwordLessLoginApi.passwordlessLoginByPhone(phone, smsTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="PasswordlessLoginByEmail-get-"> Passwordless Login By Email (GET)</h6>
 This API is used to send a Passwordless Login verification link to the provided Email ID  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/passwordless-login/passwordless-login-by-email)

 
 

 ```

var email = "<email>"; //Required
var passwordLessLoginTemplate = "<passwordLessLoginTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.passwordLessLoginApi.passwordlessLoginByEmail(email, passwordLessLoginTemplate, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="PasswordlessLoginByUserName-get-"> Passwordless Login By UserName (GET)</h6>
 This API is used to send a Passwordless Login Verification Link to a customer by providing their UserName  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/passwordless-login/passwordless-login-by-username)

 
 

 ```

var username = "<username>"; //Required
var passwordLessLoginTemplate = "<passwordLessLoginTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.passwordLessLoginApi.passwordlessLoginByUserName(username, passwordLessLoginTemplate, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="PasswordlessLoginVerification-get-"> Passwordless Login Verification (GET)</h6>
 This API is used to verify the Passwordless Login verification link. Note: If you are using Passwordless Login by Phone you will need to use the Passwordless Login Phone Verification API  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/passwordless-login/passwordless-login-verification)

 
 

 ```

var verificationToken = "<verificationToken>"; //Required
var fields = null; //Optional
var welcomeEmailTemplate = "<welcomeEmailTemplate>"; //Optional

 LoginRadiusSDK.passwordLessLoginApi.passwordlessLoginVerification(verificationToken, fields, welcomeEmailTemplate, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### Configuration API


List of APIs in this Section:<br>

* GET : [Get Server Time](#GetServerInfo-get-)<br>
* GET : [Get Configurations](#getConfigurations-get-)<br>


<h6 id="GetServerInfo-get-"> Get Server Time (GET)</h6>
 This API allows you to query your LoginRadius account for basic server information and server time information which is useful when generating an SOTT token.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/configuration/get-server-time/)

 
 

 ```

var timeDifference = 0; //Optional

 LoginRadiusSDK.configurationApi.getServerInfo(timeDifference, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 <h6 id="getConfigurations-get-"> Get Configuration (GET)</h6>
 This API is used to get the configurations which are set in the LoginRadius Admin Console for a particular LoginRadius site/environment. [More info](https://www.loginradius.com/docs/api/v2/customer-identity-api/configuration/get-configurations)
  
  ```
  LoginRadiusSDK.configurationApi.getConfigurations(function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
  });
```
 
 

### CustomRegistrationData API


List of APIs in this Section:<br>

* POST : [Validate secret code](#ValidateRegistrationDataCode-post-)<br>
* GET : [Auth Get Registration Data Server](#AuthGetRegistrationData-get-)<br>



<h6 id="ValidateRegistrationDataCode-post-"> Validate secret code (POST)</h6>
 This API allows you to validate code for a particular dropdown member.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/custom-registration-data/validate-code)

 
 

 ```

var code = "<code>"; //Required
var recordId = "<recordId>"; //Required

 LoginRadiusSDK.customRegistrationDataApi.validateRegistrationDataCode(code, recordId, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="AuthGetRegistrationData-get-"> Auth Get Registration Data Server (GET)</h6>
 This API is used to retrieve dropdown data.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/custom-registration-data/auth-get-registration-data)

 
 

 ```

var type = "<type>"; //Required
var limit = 0; //Optional
var parentId = "<parentId>"; //Optional
var skip = 0; //Optional

 LoginRadiusSDK.customRegistrationDataApi.authGetRegistrationData(type, limit, parentId, skip, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### RiskBasedAuthentication API


List of APIs in this Section:<br>

* POST : [Risk Based Authentication Login by Email](#RBALoginByEmail-post-)<br>
* POST : [Risk Based Authentication Login by Username](#RBALoginByUserName-post-)<br>
* POST : [Risk Based Authentication Phone Login](#RBALoginByPhone-post-)<br>



<h6 id="RBALoginByEmail-post-"> Risk Based Authentication Login by Email (POST)</h6>
 This API retrieves a copy of the user data based on the Email  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-login-by-email)

 
 

 ```


var emailAuthenticationModel ={ 
"email" : "<email>",
"password" : "<password>"
};  //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var loginUrl = "<loginUrl>"; //Optional
var passwordDelegation = true; //Optional
var passwordDelegationApp = "<passwordDelegationApp>"; //Optional
var rbaBrowserEmailTemplate = "<rbaBrowserEmailTemplate>"; //Optional
var rbaBrowserSmsTemplate = "<rbaBrowserSmsTemplate>"; //Optional
var rbaCityEmailTemplate = "<rbaCityEmailTemplate>"; //Optional
var rbaCitySmsTemplate = "<rbaCitySmsTemplate>"; //Optional
var rbaCountryEmailTemplate = "<rbaCountryEmailTemplate>"; //Optional
var rbaCountrySmsTemplate = "<rbaCountrySmsTemplate>"; //Optional
var rbaIpEmailTemplate = "<rbaIpEmailTemplate>"; //Optional
var rbaIpSmsTemplate = "<rbaIpSmsTemplate>"; //Optional
var rbaOneclickEmailTemplate = "<rbaOneclickEmailTemplate>"; //Optional
var rbaOTPSmsTemplate = "<rbaOTPSmsTemplate>"; //Optional
var smsTemplate = "<smsTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.riskBasedAuthenticationApi.rbaLoginByEmail(emailAuthenticationModel, emailTemplate, fields, loginUrl, passwordDelegation, passwordDelegationApp, rbaBrowserEmailTemplate, rbaBrowserSmsTemplate, rbaCityEmailTemplate, rbaCitySmsTemplate, rbaCountryEmailTemplate, rbaCountrySmsTemplate, rbaIpEmailTemplate, rbaIpSmsTemplate, rbaOneclickEmailTemplate, rbaOTPSmsTemplate, smsTemplate, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="RBALoginByUserName-post-"> Risk Based Authentication Login by Username (POST)</h6>
 This API retrieves a copy of the user data based on the Username  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/auth-login-by-username)

 
 

 ```


var userNameAuthenticationModel ={ 
"password" : "<password>",
"username" : "<username>"
};  //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var loginUrl = "<loginUrl>"; //Optional
var passwordDelegation = true; //Optional
var passwordDelegationApp = "<passwordDelegationApp>"; //Optional
var rbaBrowserEmailTemplate = "<rbaBrowserEmailTemplate>"; //Optional
var rbaBrowserSmsTemplate = "<rbaBrowserSmsTemplate>"; //Optional
var rbaCityEmailTemplate = "<rbaCityEmailTemplate>"; //Optional
var rbaCitySmsTemplate = "<rbaCitySmsTemplate>"; //Optional
var rbaCountryEmailTemplate = "<rbaCountryEmailTemplate>"; //Optional
var rbaCountrySmsTemplate = "<rbaCountrySmsTemplate>"; //Optional
var rbaIpEmailTemplate = "<rbaIpEmailTemplate>"; //Optional
var rbaIpSmsTemplate = "<rbaIpSmsTemplate>"; //Optional
var rbaOneclickEmailTemplate = "<rbaOneclickEmailTemplate>"; //Optional
var rbaOTPSmsTemplate = "<rbaOTPSmsTemplate>"; //Optional
var smsTemplate = "<smsTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.riskBasedAuthenticationApi.rbaLoginByUserName(userNameAuthenticationModel, emailTemplate, fields, loginUrl, passwordDelegation, passwordDelegationApp, rbaBrowserEmailTemplate, rbaBrowserSmsTemplate, rbaCityEmailTemplate, rbaCitySmsTemplate, rbaCountryEmailTemplate, rbaCountrySmsTemplate, rbaIpEmailTemplate, rbaIpSmsTemplate, rbaOneclickEmailTemplate, rbaOTPSmsTemplate, smsTemplate, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="RBALoginByPhone-post-"> Risk Based Authentication Phone Login (POST)</h6>
 This API retrieves a copy of the user data based on the Phone  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/phone-authentication/phone-login)

 
 

 ```


var phoneAuthenticationModel ={ 
"password" : "<password>",
"phone" : "<phone>"
};  //Required
var emailTemplate = "<emailTemplate>"; //Optional
var fields = null; //Optional
var loginUrl = "<loginUrl>"; //Optional
var passwordDelegation = true; //Optional
var passwordDelegationApp = "<passwordDelegationApp>"; //Optional
var rbaBrowserEmailTemplate = "<rbaBrowserEmailTemplate>"; //Optional
var rbaBrowserSmsTemplate = "<rbaBrowserSmsTemplate>"; //Optional
var rbaCityEmailTemplate = "<rbaCityEmailTemplate>"; //Optional
var rbaCitySmsTemplate = "<rbaCitySmsTemplate>"; //Optional
var rbaCountryEmailTemplate = "<rbaCountryEmailTemplate>"; //Optional
var rbaCountrySmsTemplate = "<rbaCountrySmsTemplate>"; //Optional
var rbaIpEmailTemplate = "<rbaIpEmailTemplate>"; //Optional
var rbaIpSmsTemplate = "<rbaIpSmsTemplate>"; //Optional
var rbaOneclickEmailTemplate = "<rbaOneclickEmailTemplate>"; //Optional
var rbaOTPSmsTemplate = "<rbaOTPSmsTemplate>"; //Optional
var smsTemplate = "<smsTemplate>"; //Optional
var verificationUrl = "<verificationUrl>"; //Optional

 LoginRadiusSDK.riskBasedAuthenticationApi.rbaLoginByPhone(phoneAuthenticationModel, emailTemplate, fields, loginUrl, passwordDelegation, passwordDelegationApp, rbaBrowserEmailTemplate, rbaBrowserSmsTemplate, rbaCityEmailTemplate, rbaCitySmsTemplate, rbaCountryEmailTemplate, rbaCountrySmsTemplate, rbaIpEmailTemplate, rbaIpSmsTemplate, rbaOneclickEmailTemplate, rbaOTPSmsTemplate, smsTemplate, verificationUrl, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### NativeSocial API


List of APIs in this Section:<br>

* GET : [Access Token via Facebook Token](#GetAccessTokenByFacebookAccessToken-get-)<br>
* GET : [Access Token via Twitter Token](#GetAccessTokenByTwitterAccessToken-get-)<br>
* GET : [Access Token via Google Token](#GetAccessTokenByGoogleAccessToken-get-)<br>
* GET : [Access Token using google JWT token for Native Mobile Login](#GetAccessTokenByGoogleJWTAccessToken-get-)<br>
* GET : [Access Token via Linkedin Token](#GetAccessTokenByLinkedinAccessToken-get-)<br>
* GET : [Get Access Token By Foursquare Access Token](#GetAccessTokenByFoursquareAccessToken-get-)<br>
* GET : [Access Token via Apple Id Code](#GetAccessTokenByAppleIdCode-get-)<br>
* GET : [Access Token via WeChat Code](#GetAccessTokenByWeChatCode-get-)<br>
* GET : [Access Token via Vkontakte Token](#GetAccessTokenByVkontakteAccessToken-get-)<br>
* GET : [Access Token via Google AuthCode](#GetAccessTokenByGoogleAuthCode-get-)<br>



<h6 id="GetAccessTokenByFacebookAccessToken-get-"> Access Token via Facebook Token (GET)</h6>
 The API is used to get LoginRadius access token by sending Facebook's access token. It will be valid for the specific duration of time specified in the response.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-facebook-token/)

 
 

 ```

var fbAccessToken = "<fbAccessToken>"; //Required
var socialAppName = "<socialAppName>"; //Optional

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByFacebookAccessToken(fbAccessToken, socialAppName, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenByTwitterAccessToken-get-"> Access Token via Twitter Token (GET)</h6>
 The API is used to get LoginRadius access token by sending Twitter's access token. It will be valid for the specific duration of time specified in the response.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-twitter-token)

 
 

 ```

var twAccessToken = "<twAccessToken>"; //Required
var twTokenSecret = "<twTokenSecret>"; //Required
var socialAppName = "<socialAppName>"; //Optional

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByTwitterAccessToken(twAccessToken, twTokenSecret, socialAppName, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenByGoogleAccessToken-get-"> Access Token via Google Token (GET)</h6>
 The API is used to get LoginRadius access token by sending Google's access token. It will be valid for the specific duration of time specified in the response.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-google-token)

 
 

 ```

var googleAccessToken = "<googleAccessToken>"; //Required
var clientId = "<clientId>"; //Optional
var refreshToken = "<refreshToken>"; //Optional
var socialAppName = "<socialAppName>"; //Optional

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByGoogleAccessToken(googleAccessToken, clientId, refreshToken, socialAppName, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenByGoogleJWTAccessToken-get-"> Access Token using google JWT token for Native Mobile Login (GET)</h6>
 This API is used to Get LoginRadius Access Token using google jwt id token for google native mobile login/registration.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-googlejwt)

 
 

 ```

var idToken = "<idToken>"; //Required

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByGoogleJWTAccessToken(idToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenByLinkedinAccessToken-get-"> Access Token via Linkedin Token (GET)</h6>
 The API is used to get LoginRadius access token by sending Linkedin's access token. It will be valid for the specific duration of time specified in the response.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-linkedin-token/)

 
 

 ```

var lnAccessToken = "<lnAccessToken>"; //Required
var socialAppName = "<socialAppName>"; //Optional

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByLinkedinAccessToken(lnAccessToken, socialAppName, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenByFoursquareAccessToken-get-"> Get Access Token By Foursquare Access Token (GET)</h6>
 The API is used to get LoginRadius access token by sending Foursquare's access token. It will be valid for the specific duration of time specified in the response.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-foursquare-token/)

 
 

 ```

var fsAccessToken = "<fsAccessToken>"; //Required

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByFoursquareAccessToken(fsAccessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenByAppleIdCode-get-"> Access Token via Apple Id Code (GET)</h6>
 The API is used to get LoginRadius access token by sending a valid Apple ID OAuth Code. It will be valid for the specific duration of time specified in the response.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-apple-id-code)

 
 

 ```

var code = "<code>"; //Required
var socialAppName = "<socialAppName>"; //Optional

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByAppleIdCode(code, socialAppName, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenByWeChatCode-get-"> Access Token via WeChat Code (GET)</h6>
 This API is used to retrieve a LoginRadius access token by passing in a valid WeChat OAuth Code.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-wechat-code)

 
 

 ```

var code = "<code>"; //Required

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByWeChatCode(code, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenByVkontakteAccessToken-get-"> Access Token via Vkontakte Token (GET)</h6>
 The API is used to get LoginRadius access token by sending Vkontakte's access token. It will be valid for the specific duration of time specified in the response.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-vkontakte-token)

 
 

 ```

var vkAccessToken = "<vkAccessToken>"; //Required

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByVkontakteAccessToken(vkAccessToken, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
<h6 id="GetAccessTokenByGoogleAuthCode-get-"> Access Token via Google AuthCode (GET)</h6>
 The API is used to get LoginRadius access token by sending Google's AuthCode. It will be valid for the specific duration of time specified in the response.  [More Info](https://www.loginradius.com/docs/api/v2/customer-identity-api/social-login/native-social-login-api/access-token-via-google-auth-code)

 
 

 ```

var googleAuthcode = "<googleAuthcode>"; //Required
var socialAppName = "<socialAppName>"; //Optional

 LoginRadiusSDK.nativeSocialApi.getAccessTokenByGoogleAuthCode(googleAuthcode, socialAppName, function(error, data){
    if(error){
      console.log(error);
	  return;
	}
	console.log(data);
 });

 ```
 
  
  
 
 

### Demo <br/>
We have a demo web application using the HTML 5 SDK, which includes the following features:
* Traditional email login
* Multi-Factor login
* Passwordless login
* Social login
* Register
* Email verification
* Forgot password
* Reset password
* Change password
* Update account
* Account Linking
* Custom object management <br/>


You can get a copy of our demo project at [Github](https://github.com/LoginRadius/html5-sdk) .


### Demo Configuration

1. Set your LoginRadius ApiKey & other credential in `demo/assets/js/options.js`