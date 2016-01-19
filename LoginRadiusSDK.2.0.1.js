var LoginRadiusSDK = (function () {
    //for cross browser communication
    (function (a, b) {"use strict";var c = function () {var b = function () {var b = a.location.hash ? a.location.hash.substr(1).split("&") : [], c = {};for (var d = 0; d < b.length; d++) {var e = b[d].split("=");c[e[0]] = decodeURIComponent(e[1])}return c};var c = function (b) {var c = [];for (var d in b) {c.push(d + "=" + encodeURIComponent(b[d]))}a.location.hash = c.join("&")};return {get: function (a) {var c = b();if (a) {return c[a]} else {return c}}, add: function (a) {var d = b();for (var e in a) {d[e] = a[e]}c(d)}, remove: function (a) {a = typeof a == "string" ? [a] : a;var d = b();for (var e = 0; e < a.length; e++) {delete d[a[e]]}c(d)}, clear: function () {c({})}}}();a.hash = c})(window)

    var apiDomain = "https://api.loginradius.com/api/v2/";
    var token = 'LRTokenKey';
    var util = {};

    // store all about loginradius module
    var module = {};
    var onlogin = function () {
    };

    module.isauthenticated = false;

    /**
     * function is used to set Callback Handler to login
     * 
     * @function
     * @public
     * @param fn {function}
     */
    module.setLoginCallback = function (fn) {
        module.onlogin = fn;
    };


    /**
     * The User Profile API is used to get social profile data from the user’s social account after authentication. The social profile will be retrieved via oAuth and OpenID protocols. The data is normalized into LoginRadius' standard data format.
     * 
     * @function
     * @public
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.getUserprofile = function (handle) {
        util.jsonpCall("userprofile", function (data) {
            handle(data);
        });
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
        util.jsonpCall("photo?albumid=" + albumId, function (data) {
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
        util.jsonpCall("checkin", function (data) {
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
        util.jsonpCall("album", function (data) {
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
        util.jsonpCall("audio", function (data) {
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
        util.jsonpCall("mention", function (data) {
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
        util.jsonpCall("following", function (data) {
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
        util.jsonpCall("event", function (data) {
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
        util.jsonpCall("post", function (data) {
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
        util.jsonpCall("company", function (data) {
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
        util.jsonpCall("group", function (data) {
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
        util.jsonpCall("status", function (data) {
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
        util.jsonpCall("contact?nextcursor=" + cursor, function (data) {
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
        util.jsonpCall("video", function (data) {
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
        util.jsonpCall("like", function (data) {
            handle(data);
        });
    };

    /**
     * This API is used to update the status on the user’s wall.
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
        util.jsonpCall("status/js?title=" + title + "&url=" + url + "&imageurl=" + imageurl + "&status=" + status + "&caption=" + caption + "&description=" + description, function (data) {
            handle(data);
        });
    };


    /**
     * The Message API is used to post messages to the user’s contacts. After using the Contact API, you can send messages to the retrieved contacts.
     * 
     * @function
     * @public
     * @param A valid friend id to send the message, it would be fetched from the contacts list
     * @param The subject of the message to be send
     * @param The details of the message to be send
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */
    module.postMessage = function (to, subject, message, handle) {
        util.jsonpCall("message/js?to=" + to + "&subject=" + subject + "&message=" + message, function (data) {
            handle(data);
        });
    };

    /**
     * The Page API is used to get the page data from the user’s social account.
     * 
     * @function
     * @public
     * @param pagename Name of the page you want to retrieve info from
     * @param handle {CallbackHandler} callback handler, invoke after getting Responce from LoginRadius
     */

    module.getPage = function (pagename, handle) {
        util.jsonpCall("page?pagename=" + pagename, function (data) {
            handle(data);
        });
    };

    /**
     * The Access Token API is used to get the LoginRadius access token after authentication. It will be valid for the specific duration of time specified in the response.
     * 
     * @function
     * @public
     */
    module.getToken = function () {
        return sessionStorage.getItem(token);
    };

    /**
     * The Function is used to Handle All API Request on Server.
     * 
     * @param path
     * @param handle
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
        js.src = apiDomain + path + (path.indexOf('?') != -1 ? '&' : '?') + 'access_token=' + module.getToken() + '&callback=' + func;
        js.type = "text/javascript";
        document.body.appendChild(js);
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

    return module;
})();
