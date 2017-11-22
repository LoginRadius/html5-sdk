var LoginRadiusSDK = (function () {
    //for cross browser communication
    (function (a, b) {"use strict";var c = function () {var b = function () {var b = a.location.hash ? a.location.hash.substr(1).split("&") : [], c = {};for (var d = 0; d < b.length; d++) {var e = b[d].split("=");c[e[0]] = decodeURIComponent(e[1])}return c};var c = function (b) {var c = [];for (var d in b) {c.push(d + "=" + encodeURIComponent(b[d]))}a.location.hash = c.join("&")};return {get: function (a) {var c = b();if (a) {return c[a]} else {return c}}, add: function (a) {var d = b();for (var e in a) {d[e] = a[e]}c(d)}, remove: function (a) {a = typeof a == "string" ? [a] : a;var d = b();for (var e = 0; e < a.length; e++) {delete d[a[e]]}c(d)}, clear: function () {c({})}}}();a.hash = c})(window)

    var apiDomain = "https://api.loginradius.com";
    var token = 'LRTokenKey';
    var util = {};

    // store all about loginradius module
    var module = {};
    var onlogin = function () {
    };

    module.isauthenticated = false;


     /* function is used to set Callback Handler to login
     *
     * @function
     * @public
     * @param fn {function}
     */
    module.setLoginCallback = function (fn) {
        module.onlogin = fn;
    };

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
	};


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
	};

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
	};

    documentCookies = {
            getItem: function (sKey) {
                if (!sKey) {
                    return null;
                }
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            },
            setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                    return false;
                }
                var sExpires = "";
                var vExpiryDate = {
                    getInStringFormat: function (nMaxAge) { //"max-age" in second
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
            removeItem: function (sKey, sPath, sDomain) {
                if (!this.hasItem(sKey)) {
                    return false;
                }
                document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
                return true;
            },
            hasItem: function (sKey) {
                if (!sKey) {
                    return false;
                }
                return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            },
            keys: function () {
                var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
                for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
                    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
                }
                return aKeys;

            }
        };




    /**
     * The photo API is used to get photo data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param A valid albumId, it return album photos
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getPhotos = function (albumId, handle) {
        util.jsonpCall("/api/v2/photo?albumid=" + albumId + "&access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };

    /**
     * The Check In API is used to get check-ins data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getCheckins = function (handle) {
        util.jsonpCall("/api/v2/checkin?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };

    /**
     * The Albums API is used to get the Albums data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getAlbums = function (handle) {
        util.jsonpCall("/api/v2/album?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Audio API is used to get audio files data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getAudios = function (handle) {
        util.jsonpCall("/api/v2/audio?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Mention API is used to get mention data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getMentions = function (handle) {
        util.jsonpCall("/api/v2/mention?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Following API is used to get the followers’ information from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getFollowings = function (handle) {
        util.jsonpCall("/api/v2/following?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Event API is used to get the event data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getEvents = function (handle) {
        util.jsonpCall("/api/v2/event?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Post API is used to get posted messages from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getPosts = function (handle) {
        util.jsonpCall("/api/v2/post?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Company API is used to get the followed company’s data in the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getCompanies = function (handle) {
        util.jsonpCall("/api/v2/company?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Group API is used to get group data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getGroups = function (handle) {
        util.jsonpCall("/api/v2/group?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };

    /**
     * The Status API is used to get the status messages from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getStatuses = function (handle) {
        util.jsonpCall("/api/v2/status?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };

    /**
     * The Contact API is used to get contacts/friends/connections data from the user’s social account. The data will normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param cursor value for getting next records set
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getContacts = function (cursor, handle) {
        util.jsonpCall("/api/v2/contact?nextcursor=" + cursor + "&access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Video API is used to get videos data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getVideos = function (handle) {
        util.jsonpCall("/api/v2/video?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Likes API is used to get likes data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getLikes = function (handle) {
        util.jsonpCall("/api/v2/like?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };

    /**
     * This API is used to update the user's status.
     *
     * @function
     * @public
     * @param title for status message.
     * @param A web link of the status message
     * @param An image URL of the status message
     * @param The status message text
     * @param A caption of the status message
     * @param A description of the status message
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.postStatus = function (title, url, status, imageurl, caption, description, handle) {
        util.jsonpCall("/api/v2/status/js?title=" + title + "&url=" + url + "&imageurl=" + imageurl + "&status=" + status + "&caption=" + caption + "&description=" + description + "&access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The User Profile API is used to get the profile data from the user’s social account. The data will be normalized into LoginRadius' data format.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getUserProfile = function (handle) {
        util.jsonpCall("/api/v2/userprofile?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };



    /**
     * POST Message API (POST Method)
     *
     * @function
     * @public
     * @param Recipient's social provider's id
     * @param The subject field is for the subject
     * @param The contained message
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.postMessagePOST = function (to, subject, message, handle) {
        util.xhttpCall("POST", {}, "/api/v2/message?to=" + to + "&subject=" + subject + "&message=" + message + "&access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };

    /**
     * Status Posting (POST Method)
     *
     * @function
     * @public
     * @param The resetpasswordurl you would like to the user to be presented when receiving the email.
     * @param Title of Linked URL
     * @param URL to be included when clicking on the share.
     * @param Imageurl to be displayed in the share(Requires URL).
     * @param Main body of the Status update. [REQUIRED]
     * @param Message displayed below the description(Requires URL, Under 70 Characters).
     * @param Description of the displayed URL and Image(Requires URL)
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.postStatusPOST = function (title, url, status, imageurl, caption, description, handle) {
        util.xhttpCall("POST", {}, "/api/v2/status?title=" + title + "&url=" + url + "&imageurl=" + imageurl + "&status=" + status + "&caption=" + caption + "&description=" + description + "&access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * The Message API is used to post messages to the user’s contacts. After using the Contact API, you can send messages to the retrieved contacts.
     *
     * @function
     * @public
     * @param Recipient's social provider's id
     * @param The subject of the message to be sent
     * @param The message to be sent
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.postMessage = function (to, subject, message, handle) {
        util.jsonpCall("/api/v2/message/js?to=" + to + "&subject=" + subject + "&message=" + message + "&access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };








    /**
     * The Page API is used to get the page data from the user’s social account.
     *
     * @function
     * @public
     * @param Name of the page you want to retrieve info from
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.getPage = function (pagename, handle) {
        util.jsonpCall("/api/v2/page?pagename=" + pagename + "&access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };



    /**
     * The Check Email Availability API is used to check the email exists or not on your site.
     *
     * @function
     * @public
     * @param the email of the user you want to retrieve info from
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.checkEmailAvailability = function (email, handle) {
        util.jsonpCall("/identity/v2/auth/email?email=" + email + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };
    /**
     * Check The Availability of a UserName
     *
     * @function
     * @public
     * @param Username of the user you want to retrieve info from
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.checkUserNameAvailability = function (username, handle) {
        util.jsonpCall("/identity/v2/auth/username?username=" + username + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };
    /**
     * The Login By Email API is used to login a user via their Email (GET) METHOD
     *
     * @function
     * @public
     * @param Email of the user you want to retrieve info from
     * @param Password of the user you want to retrieve info from
     * @param verificationurl to be used.
     * @param loginurl to be used.
     * @param emailtemplate to be used.
     * @param g-recaptcha-response when required.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.loginByEmail = function (email, password, verificationurl, loginurl, emailtemplate, grecaptcharesponse, handle) {
        util.jsonpCall("/identity/v2/auth/login?email=" + email + "&password=" + password + "&verificationurl=" + verificationurl + "&loginurl=" + loginurl + "&emailtemplate=" + emailtemplate + "&g-recaptcha-response=" + grecaptcharesponse + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };
    /**
     * The Login By UserName API is used to login a user via their UserName
     *
     * @function
     * @public
     * @param UserName of the user you want to retrieve info from
     * @param Password of the user you want to retrieve info from
     * @param verificationurl to be used.
     * @param loginurl to be used.
     * @param emailtemplate to be used.
     * @param g-recaptcha-response when required.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.loginByUserName = function (username, password, verificationurl, loginurl, emailtemplate, grecaptcharesponse, handle) {
        util.jsonpCall("/identity/v2/auth/login?username=" + username + "&password=" + password + "&verificationurl=" + verificationurl + "&loginurl=" + loginurl + "&emailtemplate=" + emailtemplate + "&g-recaptcha-response=" + grecaptcharesponse + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };
    /**
     * The Read all Profiles by Token API is used to Read all of the profiles provided by a user.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.readAllProfilesByToken = function (handle) {
        util.jsonpCall("/identity/v2/auth/account?access_token=" + module.getToken() + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };

    /**
     * This API is called just after account linking API and it prevents the raas profile of the second account from getting created.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.socialIdentity = function (handle) {
        util.jsonpCall("/identity/v2/auth/socialidentity?access_token=" + module.getToken() + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };
    /**
     * this API is used to validate the access token.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.validateAccessToken = function (handle) {
        util.jsonpCall("/identity/v2/auth/access_token/validate?access_token=" + module.getToken() + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };

    /**
     * The Verify Email API Call consumes the validation token from the email sent to the user.
     *
     * @function
     * @public
     * @param verificationtoken of the email sent to the user
     * @param url received in the email sent to the user
     * @param optional welcome email template
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.verifyEmail = function (verificationtoken, url, welcomeemailtemplate, handle) {
        util.jsonpCall("/identity/v2/auth/email?verificationtoken=" + verificationtoken + "&url=" + encodeURIComponent(url) + "&welcomeemailtemplate=" + welcomeemailtemplate + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };


    /**
     * The Delete Account API call deletes the user profile based on the delete token provided to the user.
     *
     * @function
     * @public
     * @param deletetoken received in the email
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.deleteAccount = function (deletetoken, handle) {
        util.jsonpCall("/identity/v2/auth/account/delete?deletetoken=" + deletetoken + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };


    /**
     * The Access Token Invalidate API Call invalidates a current Access Token.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.accessTokenInvalidate = function (handle) {
        util.jsonpCall("/identity/v2/auth/access_token/invalidate?access_token=" + module.getToken() + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };

    /**
     * Get Security Questions By Access Token
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.getSecurityQuestionsByAccessToken = function (handle) {
        util.jsonpCall("/identity/v2/auth/securityquestion/accesstoken?access_token=" + module.getToken() + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };
    /**
     * Get Security Questions By Email
     *
     * @function
     * @public
     * @param email of the user you want to retrieve security questions for.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.getSecurityQuestionsByEmail = function (email, handle) {
        util.jsonpCall("/identity/v2/auth/securityquestion/email?email=" + email + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };
    /**
     * Get Security Questions By User Name
     *
     * @function
     * @public
     * @param UserName of the user you want to retrieve security questions for.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.getSecurityQuestionsByUserName = function (username, handle) {
        util.jsonpCall("/identity/v2/auth/securityquestion/username?username=" + username + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };
    /**
     * Get Security Questions By Phone
     *
     * @function
     * @public
     * @param phone of the user you want to retrieve security questions for.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.getSecurityQuestionsByPhone = function (phone, handle) {
        util.jsonpCall("/identity/v2/auth/securityquestion/phone?phone=" + encodeURIComponent(phone) + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };

    /**
     * Custom Object by Token - Retrieves the Custom Object Data for the account.
     *
     * @function
     * @public
     * @param objectname you would like to target.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.getCustomObjectByToken = function (objectname, handle) {
        util.jsonpCall("/identity/v2/auth/customobject?access_token=" + module.getToken() + "&objectname=" + objectname + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };


    /**
     * Custom Object by ObjectRecordId and Token
     *
     * @function
     * @public
     * @param objectname you would like to target.
     * @param objectrecordid you would like to target.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.getCustomObjectByRecordIdAndToken = function (objectname, objectrecordid, handle) {
        util.jsonpCall("/identity/v2/auth/customobject/" + objectrecordid + "?access_token=" + module.getToken() + "&objectname=" + objectname + "&apikey=" + module.getApiKey(), function (data) {
            handle(data);
        });
    };


    /**
      * The Google JWT API Call is used to retrieve an access_token via Google's idToken.
      *
      * @function
      * @public
      * @param The idToken provided by Google's API.
      * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
      */
    module.GoogleJWT = function (id_token, handle) {
        util.jsonpCall("/api/v2/access_token/googlejwt?key=" + module.getApiKey() + "&id_token=" + id_token, function (data) {
             setBrowserStorage("LRTokenKey",data.access_token);
             handle(data);
         });
     };




    /**
     * The Access Token API is used to get the LoginRadius access token after authentication. It will be valid for the specific duration of time specified in the response.
     *
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getToken = function () {
        return sessionStorage.getItem(token);
    };



    /**
     * Checks if the API Key is available in the browser's storage for API Calls that require it
     *
     */


    module.getApiKey = function () {
      if (getBrowserStorage("lrApiKey")) {
        apikey = getBrowserStorage("lrApiKey");
        return getBrowserStorage("lrApiKey");

      }

      else {
        console.log("API Key not found, The API Key needs to be initialized for this API Call");
      }

    };


    /*******XHR Calls - All calls below require the xhttpcall method *******/


    /**
     * Add additional email to user profile
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param The verification url to be sent to the user.
     * @param The email template to be used.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

     module.addEmail = function (jsObject, verificationurl, emailtemplate, handle) {
         util.xhttpCall("POST", jsObject, "/identity/v2/auth/email?access_token=" + module.getToken() + "&verificationurl=" + encodeURIComponent(verificationurl) + "&emailtemplate=" + emailtemplate, function (data) {
             handle(data);
         });
     };



    /**
     * Send the Forgot Password Email
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param The reset password url you would like to the user to be presented when receiving the email.
     * @param The email template to be used.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.sendForgotPassword = function (jsObject, resetpasswordurl, emailtemplate, handle) {
        util.xhttpCall("POST", jsObject,"/identity/v2/auth/password?resetpasswordurl=" + encodeURIComponent(resetpasswordurl) + "&emailtemplate=" + emailtemplate, function (data) {
            handle(data);
        });
    };


    /**
     * Register User by Email
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param SOTT - Secured One Time Token,
     * @param The verification url you would like to the user to be presented when receiving the email.
     * @param The email template to be used.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.userRegistrationByEmail = function (jsObject, sott, verificationurl, emailtemplate, handle) {
        util.xhttpCall("POST", jsObject,"/identity/v2/auth/register?sott=" + sott + "&verificationurl=" + encodeURIComponent(verificationurl) + "&emailtemplate=" + emailtemplate, function (data) {
            handle(data);
        });
    };

    /**
     * Login User By Email or UserName
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param The verification url you would like to the user to be presented when receiving the email.
     * @param The login url here the user is logging from
     * @param The email template to be used.
     * @param g-recaptcha-response to be used when the account get locked.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.loginByEmailPOST = function (jsObject, verificationurl, loginurl, emailtemplate, grecaptcharesponse, handle) {
        util.xhttpCall("POST", jsObject,"/identity/v2/auth/login?verificationurl=" + encodeURIComponent(verificationurl) + "&loginurl=" + loginurl + "&emailtemplate=" + emailtemplate + "&g-recaptcha-response=" + grecaptcharesponse, function (data) {
            handle(data);
        });
    };



    /**
     * Login User By Email or UserName
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param The verification url you would like to the user to be presented when receiving the email.
     * @param The login url here the user is logging from
     * @param The email template to be used.
     * @param g-recaptcha-response to be used when the account get locked.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.loginByUserNamePOST = function (jsObject, verificationurl, loginurl, emailtemplate, grecaptcharesponse, handle) {
        util.xhttpCall("POST", jsObject,"/identity/v2/auth/login?verificationurl=" + encodeURIComponent(verificationurl) + "&loginurl=" + loginurl + "&emailtemplate=" + emailtemplate + "&g-recaptcha-response=" + grecaptcharesponse, function (data) {
            handle(data);
        });
    };


    /**
     * Create Custom Object By Token
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param The objectname you would like to target.
     * @param The email template to be used.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.createCustomObjectByToken = function (jsObject, objectname, emailtemplate, handle) {
        util.xhttpCall("POST", jsObject,"/identity/v2/auth/customobject?access_token=" + module.getToken() + "&objectname=" + objectname, function (data) {
            handle(data);
        });
    };




    /**
     * Change Password
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.changePassword = function (jsObject, handle) {
        util.xhttpCall("PUT", jsObject,"/identity/v2/auth/password?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * Link Social Identities
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.linkSocialIdentities = function (jsObject, handle) {
        util.xhttpCall("PUT", jsObject,"/identity/v2/auth/socialidentity?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * Resend Email Verification
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param The verification url you would like to the user to be presented when receiving the email.
     * @param The emailtemplate to be used.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.resendEmailVerification = function (jsObject, verificationurl, emailtemplate, handle) {
        util.xhttpCall("PUT", jsObject,"/identity/v2/auth/register?verificationurl=" + verificationurl + "&emailtemplate=" + emailtemplate, function (data) {
            handle(data);
        });
    };

    /**
     * Reset Password by Reset Token
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.resetPasswordByResetToken = function (jsObject, handle) {
        util.xhttpCall("PUT", jsObject,"/identity/v2/auth/password", function (data) {
            handle(data);
        });
    };


    /**
     * Reset Password by Security Question
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.resetPasswordBySecurityQuestion = function (jsObject, handle) {
        util.xhttpCall("PUT", jsObject, "/identity/v2/auth/password/securityanswer", function (data) {
            handle(data);
        });
    };





    /**
     * Set or Change UserName
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.setUserName = function (jsObject, handle) {
        util.xhttpCall("PUT", jsObject,"/identity/v2/auth/username?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };





    /**
     * Update Profile by Token
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param The verification url you would like to the user to be presented when receiving the email.
     * @param The emailtemplate to be used
     * @param The smstemplate to be used
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.updateProfileByToken = function (jsObject, verificationurl, emailtemplate, smstemplate, handle) {
        util.xhttpCall("PUT", jsObject,"/identity/v2/auth/account?access_token=" + module.getToken() + "&verificationurl=" + verificationurl + "&emailtemplate=" + emailtemplate + "&smstemplate=" + smstemplate, function (data) {
            handle(data);
        });
    };


    /**
     * Update Security Question by Access token
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.updateSecurityQuestionByToken = function (jsObject, handle) {
        util.xhttpCall("PUT", jsObject,"/identity/v2/auth/account?access_token=" + module.getToken(), function (data) {
            handle(data);
        });
    };


    /**
     * Update Custom Object By Access Token
     *
     * @function
     * @public
     * @param JavaScript Object containing the POST body parameters
     * @param The objectname you would like to target.
     * @param The updatetype to be used
     * @param The objectrecordid you would like to target.
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.updateCustomObjectByObjectRecordIdAndToken = function (jsObject, objectname, updatetype, objectrecordid, handle) {
        util.xhttpCall("PUT", jsObject,"/identity/v2/auth/customobject/" + objectrecordid + "?access_token=" + module.getToken() + "&objectname=" + objectname + "&updatetype=" + updatetype, function (data) {
            handle(data);
        });
    };





    /**
     * Delete Account with Email Confirmation
     *
     * @function
     * @public
     * @param The deleteurl you would like to the user to be presented when receiving the email.
     * @param The email template to be used
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

     module.deleteAccountWithEmailConfirmation = function (deleteurl, emailtemplate, handle) {
         util.xhttpCall("DELETE", {},"/identity/v2/auth/account?access_token=" + module.getToken() + "&deleteurl=" + deleteurl + "&emailtemplate=" + emailtemplate, function (data) {
             handle(data);
         });
     };



     /**
      * Remove Email API Call
      *
      * @function
      * @public
      * @param JavaScript Object containing the POST body parameters
      * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
      */

     module.removeEmail = function (jsObject, handle) {
         util.xhttpCall("DELETE", jsObject,"/identity/v2/auth/email?access_token=" + module.getToken(), function (data) {
             handle(data);
         });
     };


     /**
      * Unlink Social Identities
      *
      * @function
      * @public
      * @param JavaScript Object containing the POST body parameters
      * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
      */

     module.unlinkSocialIdentity = function (jsObject, handle) {
         util.xhttpCall("DELETE", jsObject,"/identity/v2/auth/socialidentity?access_token=" + module.getToken(), function (data) {
             handle(data);
         });
     };


     /**
      * Custom Object Delete by Record Id And Token
      *
      * @function
      * @public
      * @param The objectname you would like to target.
      * @param The objectrecordid you would like to target.
      * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
      */

     module.deleteCustomObjectByRecordIdAndToken = function (objectname, objectrecordid, handle) {
         util.xhttpCall("DELETE", {},"/identity/v2/auth/customobject/" + objectrecordid + "?access_token=" + module.getToken() + "&objectname=" + objectname, function (data) {
             handle(data);
         });
     };

     /**
      * This area assigns deprecated function names to renamed functions to ensure backwards compatiblity.
      *
      */

     module.postMessageAPI = module.postMessagePOST
     module.statusPostingPOST = module.postStatusPOST
     module.getLoginByEmail = module.loginByEmail
     module.LoginByEmail =  module.loginByEmailPOST
     module.getLoginByUserName = module.loginByUserName
     module.LoginByUserName = module.loginByUserNamePOST
 


    /**
     * The Function is used to Handle All GET API Request on Server.
     *
     * @param path
`    * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    util.jsonpCall = function (path, handle) {
        var func = 'Loginradius' + Math.floor((Math.random() * 1000000000000000000) + 1);
        window[func] = function (data) {
            handle(data);
            try {
                delete window[func];
            }
            catch (e) {
                window[func] = undefined;
            }
            document.body.removeChild(js);
        };
        var js = document.createElement('script');
        js.src = apiDomain + path + (path.indexOf('?') != -1 ? '&' : '?') + 'callback=' + func;
        js.type = "text/javascript";
        document.body.appendChild(js);
    };


    /**
     * The Function is used to Handle All POST, PUT and DELETE API Request on Server.
     *
     * @param path
     * @param handle
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

     util.xhttpCall = function (method, jsObject, path, handle) {
     var xhttpcall = new XMLHttpRequest();
     	 xhttpcall.onreadystatechange = function()
            {
     	 if (this.readyState == 4 && this.status == 200)
                {
     	    handle(xhttpcall.responseText);
     	   }
             else if (this.readyState == 4)
               {
     	   console.log("Error making API call");
     	  }
            };
     	 xhttpcall.open(method,  apiDomain + path + (path.indexOf('?') != -1 ? '&' : '?') + "apikey=" + module.getApiKey());
     	 xhttpcall.setRequestHeader("Content-type", "application/json");
     	 xhttpcall.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
       xhttpcall.onerror = function () {console.log("Error with XMLHttpRequest")};
     	 xhttpcall.send(JSON.stringify(jsObject));
     };



    /**
     * Add event Listener when we get LoginRadius Token
     *
     * @param type
     * @param element
     * @param handle
     */
    util.addEvent = function (type, element, handle) {
        var elements = [];
        if (element instanceof Array) {
            elements = element;
        } else {
            elements.push(element);
        }
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].attachEvent) {
                elements[i].attachEvent("on" + type, function (e) {
                    handle(e);
                });
            } else if (elements[i].addEventListener) {
                elements[i].addEventListener(type, handle, false);
            }
        }
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

    // window event handler
    util.addEvent("message", window, receiveToken);

    window.loginradiushtml5passToken = function (tok) {
        sessionStorage.setItem(token, tok);
        module.isauthenticated = true;

        var intVal = setInterval(function () {
            if (module.onlogin) {
                module.onlogin();
                clearInterval(intVal);
            }
        }, 100);

    };

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
	module.initSDK=function(settings){
		setBrowserStorage("lrApiKey",settings.key);

	}
    return module;
})();
