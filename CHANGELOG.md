# LoginRadius HTML5 SDK Change Log

# Version 11.3.0
Release on **March 29, 2025**

## Removed (Deprecated) APIs:
- `authGetRegistrationData`
- `validateRegistrationDataCode`
- `getAccessTokenByVkontakteAccessToken`
- `getAlbums`
- `getAlbumsWithCursor`
- `getAudios`
- `getAudiosWithCursor`
- `getCheckIns`
- `getCheckInsWithCursor`
- `getContacts`
- `getEvents`
- `getEventsWithCursor`
- `getFollowings`
- `getFollowingsWithCursor`
- `getGroups`
- `getGroupsWithCursor`
- `getLikes`
- `getLikesWithCursor`
- `getMentions`
- `postMessage`
- `getPage`
- `getPhotos`
- `getPosts`
- `statusPosting`
- `trackableStatusPosting`
- `getTrackableStatusStats`
- `getVideos`
- `getRefreshedSocialUserProfile`


# Version 11.2.0
Release on **September 15, 2021**

## Enhancements

- Updated Jquery with latest version(3.6.0) in SDK Demo


## Added new multiple APIs for better user experience

- MFAEmailOtpByAccessToken
- MFAValidateEmailOtpByAccessToken
- MFAResetEmailOtpAuthenticatorByAccessToken
- MFASecurityQuestionAnswerByAccessToken
- MFAResetSecurityQuestionAuthenticatorByAccessToken
- MFAEmailOTP
- MFAValidateEmailOtp
- MFASecurityQuestionAnswer
- MFASecurityQuestionAnswerVerification
- ReAuthValidateEmailOtp
- ReAuthSendEmailOtp
- ReAuthBySecurityQuestion

## Removed APIs:

- GetSocialUserProfile

Added `EmailTemplate2FA` parameter in the following API

- MFALoginByEmail
- MFALoginByUserName
- MFALoginByPhone


Added `RbaBrowserEmailTemplate`, `RbaCityEmailTemplate` ,`RbaCountryEmailTemplate` , `RbaIpEmailTemplate` parameter in the following API

- MFAValidateOTPByPhone
- MFAValidateGoogleAuthCode
- MFAValidateBackupCode

Added `emailTemplate`, `verificationUrl` ,`welcomeEmailTemplate`  parameter in the following API

- GetProfileByAccessToken

# Version 11.1.1
Released on **June 11, 2021**

## Bug Fixed
- fixed API Key Validation issue


# Version 11.1.0
Released on **March 30, 2021**

## Enhancements:
- Added X-Origin-IP header support.
- Added 429 error code handling for "Too Many Request in a particular time frame".
- Fixed Delete API issue


## Added new multiple APIs for better user experience:
- Get Profile By Ping.
- Passwordless Login Verification By Email And OTP.
- Passwordless Login Verification By User Name And OTP.


# Version 11.0.0
Released on **July 28, 2020**

## Enhancements:
- Added a parameter isWeb in "RefreshAccessToken" API.
- Added a parameter SocialAppName in "getAccessTokenByFacebookAccessToken,  getAccessTokenByTwitterAccessToken,
  getAccessTokenByGoogleAccessToken, getAccessTokenByLinkedinAccessToken, getAccessTokenByAppleIdCode, 
  getAccessTokenByGoogleAuthCode" Native Social login APIs.

## Added new multiple APIs for better user experience:
- Added linkSocialIdentites(POST) API.
- Added linkSocialIdentitiesByPing(POST) API.
- Added getAccessTokenByAppleIdCode API.
- Added getAccessTokenByWeChatCode API.

## Removed APIs:
 - linkSocialIdentity API(PUT)
 - getSocialIdentity API(GET)


# Version 10.0.0
Released on **Dec 20, 2019**

## Enhancements
This full version release includes major changes with several improvements and optimizations
 - Enhanced the coding standards of SDK to follow industry programming styles and best practices.
 - Enhanced security standards of SDK.
 - Added internal parameter validations in the API function.
 - Improved the naming conventions of API functions for better readability.
 - Better Error and Exception Handling for LoginRadius API Response in SDK.
 - Revamped complete SDK and restructured it with latest API function names and parameters.
 - Added detailed description to API functions and parameters for better understanding.
 - Updated the demo according to latest SDK changes.
 - Added PIN Authentication feature APIs.
 - Added Consent Management feature APIs.


## Added new multiple APIs for better user experience

 - MFA Resend OTP
 - User Registration By Captcha
 - Get Access Token via Linkedin Token
 - Get Access Token By Foursquare Access Token
 - MFA Re-authentication by PIN
 - PIN Login
 - Forgot PIN By Email
 - Forgot PIN By UserName
 - Reset PIN By ResetToken
 - Reset PIN By SecurityAnswer And Email
 - Reset PIN By SecurityAnswer And Username
 - Reset PIN By SecurityAnswer And Phone
 - Forgot PIN By Phone
 - Change PIN By Token
 - Reset PIN by Phone and OTP
 - Reset PIN by Email and OTP
 - Reset PIN by Username and OTP
 - Set PIN By PinAuthToken
 - Invalidate PIN Session Token
 - Submit Consent By ConsentToken
 - Get Consent Logs
 - Submit Consent By AccessToken
 - Verify Consent By AccessToken
 - Update Consent Profile By AccessToken
 - Album With Cursor
 - Audio With Cursor
 - Check In With Cursor
 - Event With Cursor
 - Following With Cursor
 - Group With Cursor
 - Like With Cursor


# Version 4.5.0
# 1.1.1
## Enhancements 
Released on **September 19, 2018**
  - Added Access Token required check for functions that call API Endpoints that consume an Access Token. 
  - Added API Key required check for all SDK functions. 
