LoginRadius library for HTML5
=====
HTML5 library for the LoginRadius API. Get social authentication, user profile data and send messages using many social network and email clients such as Facebook, Google, Twitter, Yahoo, LinkedIn, etc.

Installation
----
 1. **Font-end interface:** Add social login interface code from your LoginRadius user account to your webpage.
 3. **Library set-up and installation:** Add the LoginRadius HTML5 SDK file into your project and follow the instructions to implement the SDK.

**Steps to call the library:**

 1. Add js file library onto your page
 2. `onlogin` delegate call your login function
 3. in your login function call, `getUserprofile` method to get user's profile data. visit the link for more information to get list of data: https://www.loginradius.com/product/user-profile-data


**Sample code for authentication and get basic profile data**

    <script src="LoginRadiusSDK.1.0.0.js" type="text/javascript"></script>
    <script type="text/javascript">
         LoginRadiusSDK.onlogin = Successfullylogin;
    
         function Successfullylogin() {
             LoginRadiusSDK.getUserprofile(function (data) {
                    //just display to a html element 
                    document.getElementById("profile").innerHTML = JSON.stringify(data);
             });
             return false;
            };    
    </script>

Advance features(for Paid customers only)
====

LoginRaidus Contacts API
----

You can use this API to fetch contacts from users social networks/email clients - Facebook, Twitter, LinkedIn, Google, Yahoo.

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.

    LoginRadiusSDK.getUsercontact(function (contacts) {
        //just display to a html element, it return JSON array
        document.getElementById("contacts").innerHTML = JSON.stringify(contacts);
    });

LoginRadius Direct Message API
---
You can use this API to send direct message to your contacts from users social networks - Twitter/LinkedIn.

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.


    LoginRadiusSDK.senddirectmessage (to, subject, message, function (isposted) {
       //just display to a html element, it return true/false
        document.getElementById("isposted").innerHTML = JSON.stringify(isposted);
    });

LoginRadius Post API
----

You can use this API to Post data to users social networks/email - Facebook, Twitter, LinkedIn.

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.

    LoginRadiusSDK.updatestatus (to, title, url, imageurl, status, caption, description, function (isposted) {
        //just display to a html element, it return true/false
        document.getElementById("isposted").innerHTML = JSON.stringify(isposted);
    });

Get Posts
----

You can use this API to get posts from users social network - Facebook

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.

    LoginRadiusSDK.getPosts(function (posts) {
        //just display to a html element, it return JSON array
        document.getElementById("posts").innerHTML = JSON.stringify(posts);
    });

Get Twitter Mentions
----

You can use this API to get mentions from users social network - Twitter.

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.

    LoginRadiusSDK.getMentions(function (mentions) {
        //just display to a html element, it return JSON array
        document.getElementById("mentions").innerHTML = JSON.stringify(mentions);
    });

Facebook Groups
----

You can use this API to get groups from users social network - Facebook.

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.

    LoginRadiusSDK.getGroups(function (groups) {
        //just display to a html element, it return JSON array
        document.getElementById("groups").innerHTML = JSON.stringify(groups);
    });


Get LinkedIn follow companies
----

You can use this API to get followed companies list from users social network - LinkedIn.

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.

    LoginRadiusSDK.getCompanies(function (companies) {
        //just display to a html element, it return JSON array
        document.getElementById("companies").innerHTML = JSON.stringify(companies);
    });


Get Facebook events
----

You can use this API to get events from users social network - Facebook.

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.

    LoginRadiusSDK.getEvents(function (events) {
        //just display to a html element, it return JSON array
        document.getElementById("events").innerHTML = JSON.stringify(events);
    });



Get Status
----

You can use this API to get status messages from users social network - Facebook, Twitter, Linkedin.

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.

    LoginRadiusSDK.getsStatus(function (statuses) {
        //just display to a html element, it return JSON array
        document.getElementById("statuses").innerHTML = JSON.stringify(statuses);
    });



Get TimeLine
----

You can use this API to get timeline feeds from users social network - Facebook.

> LoginRadius generate a unique session token, when user logs in with
> any of social network. The lifetime of LoginRadius token is 15 mins,
> this token automatically save into `sessionStorage`.

    LoginRadiusSDK.getTimelineFeeds(function (timelinefeeds) {
        //just display to a html element, it return JSON array
        document.getElementById("timelinefeeds").innerHTML = JSON.stringify(timelinefeeds);
    });
