LoginRadius
==========
-----------------------------------------------
LoginRadius HTML5 provides access to LoginRadius.

LoginRadius is a unified **Customer Identity Management** API platform that combines 30 major social platforms into a single simplified and maintenance-free API With LoginRadius API, websites and mobile apps can implement capture user profile data, enable social login, enable social sharing, add single sign-on and many more.

LoginRadius helps businesses boost user engagement on their web/mobile platform, manage online identities, utilize social media for marketing, capture accurate consumer data and get unique social insight into their customer base.

Please visit http://apidocs.loginradius.com/docs/html5-js for more information.

------

HTML5 Library
--------------

This document contains information and examples regarding the LoginRadius HTML5 Library. It provides guidance for working with social authentication, enable social login, user profile data and sending messages with a variety of social networks such as Facebook, Google, Twitter, Yahoo, LinkedIn and more.

----

##Installation
In order to utilize the HTML5/JS Library you will either need to select HTML5 as your web technology on your LoginRadius dashboard or include $ui.is_access_token=true; in your interface script.

----

##Importing Required Libraries

 - Download the SDK from Github.
 - Include the SDK javascript file on your website.

```bush
<script src="LoginRadiusSDK.2.0.1.js" type="text/javascript"></script>
```

----

##Getting the Access Token
Set a callback by passing a function into the setLoginCallback function.
```bush
LoginRadiusSDK.onlogin = successLogin;
function successLogin() {
 //implement LoginRadius SDK API functions in this function
}
```
If the request is a LoginRadius callback and the user has successfully logged in with the provider.

> Call all LoginRadiusSDK API functions after invoking the callback function. Also, please make sure that all the API functions, including LoginRadiusCallback, are asynchronous.

------
##APIs
With the access token, we can now invoke any of these functions to grab data. However, this is dependent on the provider and permissions for each.

###Album
Fetch the user's photo albums.

```bush
LoginRadiusSDK.getAlbums( function (albums) {
  // process returned albums object
});
```
###Audio
Load the user’s audio files.
```bush
LoginRadiusSDK.getAudios( function ( audios){
  // process returned audios object
});
```

###Check In
Load the user’s checked in data.

```bush
LoginRadiusSDK.getCheckins( function ( checkins ){
  // process returned checkins object
});
```
###Company
Load the user’s companies they’ve worked for or are working for.

```bush
LoginRadiusSDK.getCompanies( function ( companies) {
  // process returned companies object
});
```
###Contact
Load the user’s contacts.

```bush
LoginRadiusSDK.getContacts(cursor , function( contacts){
  // process returned contacts object
});
```
###Event
Load the user’s event data.

```bush
LoginRadiusSDK.getEvents( function ( events){
// process returned events object
});
```
###Following
Load the user’s following.

```bush
LoginRadiusSDK.getFollowings( function( followings){
  // process returned followings object
});
```
###Group
Load the user’s groups.

```bush
LoginRadiusSDK.getGroups( function( groups){
  // process returned groups object
});
```
###Like
Load the user’s like data.

```bush
LoginRadiusSDK.getLikes( function ( likes){
  // process returned likes object
});
```
###Mention
Load the user’s mentions.

```bush
LoginRadiusSDK.getMentions( function( mentions){
// process returned mentions object
});
```
###Message
Send a Direct Message to a user.

```bush
LoginRadiusSDK.postMessage(to, subject, message,  function( postmessage){
  // process returned postmessage object
});
```
###Page
Retrieve a liked Page based on PageID

```bush
LoginRadiusSDK.getPage( pagename, function(pages){
// process returned pages object
});
```
###Post
Load the user’s posts.

```bush
LoginRadiusSDK.getPosts( function ( posts){
  // process returned posts object
});
```
###Photo
Load the user’s photos from an album.

```bush
LoginRadiusSDK.getPhotos(albumid , function (photos){
  // process returned photos object
});
```
###Status
Status API can extract the user’s status updates. This API is much more specific to the provider being used in that it works with Facebook or Twitter, but wouldn’t work if the user logged in with Github. The API will check the provider being used against those available and will return an error if it is not supported.

Fetching
Retrieving a list of status updates.

```bush
LoginRadiusSDK.getStatuses( function( statuses){
  // process returned photos object
});
```
###Posting
Posting a new status update to the user’s profile.

```bush
//All arguments are optional except for the status argument.
LoginRadiusSDK.postStatus(title, url, imageUrl, status, caption, description, function( poststatus) {
  // process returned poststatus object
});
```
###User Profile
The User Profile API pulls all available user data. In this example, we just pull all fields that are Strings and not null. The LoginRadius User Profile object contains a large number of fields, and they can be manually retrieved like any JavaScript object.

```bush
LoginRadiusSDK.getUserprofile( function( profile) {
  // process returned profile object
});
```
###Video
Load the user’s video files.

```bush
LoginRadiusSDK.getVideos( function (videos){
  // process returned videos object
});
```
-----
##Full Example
This example includes the login script and the SDK to grab user profile data and then populates the profile div. Feel free to copy and paste the example to your own website!

```bush
<!DOCTYPE html>
<html>
    <head>
        <title>LoginRadius HTML5 Demo</title>
        <!-- Scripts for LoginRadius can be placed before the closing body tag. -->
        <script src="//hub.loginradius.com/include/js/LoginRadius.js"></script>
        <script src="LoginRadiusSDK.2.0.1.js"></script>
        <!-- We have to initialize the login interface. You will need to supply your API key. -->
        <script type="text/javascript">
            var options = {};
            options.login = true;
            LoginRadius_SocialLogin.util.ready(function () {
                $ui = LoginRadius_SocialLogin.lr_login_settings;
                $ui.interfacesize = "";
                $ui.apikey = "{YOUR API KEY HERE}";
                $ui.is_access_token = true;
                $ui.callback = window.location.href;
                $ui.lrinterfacecontainer = "interfacecontainerdiv";
                LoginRadius_SocialLogin.init(options);
            });
        </script>
        <!-- We can register a callback on a successful login and then perform any API calls. -->
        <script type="text/javascript">
            LoginRadiusSDK.onlogin = SuccessLogin;
            function SuccessLogin() {
                LoginRadiusSDK.getUserprofile(function (data) {
                    document.getElementById("profile").innerHTML = '<pre>'+JSON.stringify(data, null, 4)+'</pre>';
                });
                LoginRadiusSDK.getPage('facebook', function (data) {
                    document.getElementById("page").innerHTML = '<pre>'+JSON.stringify(data, null, 4)+'</pre>';
                });
            }
            ;
        </script>
    </head>
    <body>
        <!-- Profile div to be filled with user profile data -->
        <div id="profile"></div>
        <div id="page"></div>
        <!-- Place the div that contains the login interface somewhere on your page. -->
        <div id="interfacecontainerdiv" class="interfacecontainerdiv"></div>
    </body> 
</html>
```