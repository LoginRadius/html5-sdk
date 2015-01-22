LoginRadius SDK library for HTML5/JS
=====================
Get social authentication, user profile data and social invite using 30+ social networks and email clients such as Facebook, Google, Twitter, Yahoo, LinkedIn, etc.

----------
Implementation of SDK
----------
 - In order to utilize the HTML5/JS SDK you will either need to select HTML as your web technology on your Loginradius dashboard or include $ui.is_access_token=true; in your interface script.  
 - Add social login interface code (from your LoginRadius user account) to your webpage.
 - Copy the SDK file to your project directory.
 - Include SDK file in your code.
 
        < script src="LoginRadiusSDK.2.0.0.js" type="text/javascript"></script>

 - Set callback by passing 'Successfullylogin' function in setLoginCallback function:
 
        <script type="text/javascript">
            LoginRadiusSDK.setLoginCallback(Successfullylogin);
            function Successfullylogin(){
            // implement LoginRadius SDK API functions in this function
            }
        </script>

Note: Call all LoginRadiusSDK API functions after calling of Successfullylogin function. Also, please make sure that all the API functions including LoginRadiusCallback are asynchronous. 

- Get the user's social profile data after login using UserProfile API
    
    Call function getUserprofile() to get user profile data:
 
        // get user profile data
        LoginRadiusSDK.getUserprofile(function(data) {  
        //here use data object
        });

  Tip: Profile data points will be normalized data as per <a href="https://github.com/guptadeepak/LoginRadius/blob/master/ReadMe-DataFeeds.md#loginradius-unified-social-api">LoginRadius' standard data format</a>.
 
- Pass the callback parameter ($ui.callback) to LoginRadius login interface script
 
        var options = {}; 
        options.login = true; 
        LoginRadius_SocialLogin.util.ready(function () { 
             $ui = LoginRadius_SocialLogin.lr_login_settings; 
             $ui.interfacesize = ""; 
             $ui.apikey = " ​<YOUR API KEY>"; 
             $ui.callback = window.location.href;  //Callback URL should be window.location.href
             $ui.lrinterfacecontainer = "interfacecontainerdiv"; 
             LoginRadius_SocialLogin.init(options); 
        });


 ----------
 Advance APIs
 ----------
 These APIs are part of our subscription. Please check your account <a href="http://www.loginradius.com/packages"> subscription </a> before using these APIs.
-  **Album API**: Call function getPhotos() with Album ID as argument to get user's photo data for that album:
 
			LoginRadiusSDK.getPhotos(albumid , function (photos){
			//here use photo data object
			});

    Tip: **albumid** is a valid album id, it return album photos.
  
- **Checkin API**: Call function getCheckins() to get user's check-in data:

			LoginRadiusSDK.getCheckins(function (checkins){
			//here use checkins data object
			});
 
- **Audio API**:	Call function getAudios() to get user's audio files data:
 
			LoginRadiusSDK.getAudios(function (audios){
			//here use audio data object
			});

- **Post Message API**: Call function postMessage()to send direct messages to user's contacts:
 
			LoginRadiusSDK.postMessage(to , subject , message,  function( postmessage){
			//here use success status
			});

    Tip:
    - **to** is the Social Id of the receiver.
    - **subject** is the subject of the message.
    - **message** is the message content.

-  **Contacts API**:	Call function getContacts() to get user's contacts data:

				LoginRadiusSDK.getContacts(cursor , function(contacts){
				//here use contacts object
				});

    Tip: **cursor** is the value for getting next records set (by default pass 0 value).

- **Mentions  API**: Call function getMentions() to get user's Twitter mention data:

				LoginRadiusSDK.getMentions(function (mentions){
				//here use mentions object
				});

- **Following API**: Call function getFollowings() to get the information of the people, user is following on Twitter:
 
				LoginRadiusSDK.getFollowings(function (followings){
				//here use followings object
				});

- **Event API**: Call function getEvents() to get the event data:

				LoginRadiusSDK.getEvents(function (events){
				//here use events object
				});

- **Get Post API**:Call function getPosts() to get the posts data:

				LoginRadiusSDK.getPosts(function (posts){
				//here use posts object
				});

- **Company API**: Call function getCompanies() to get the companies followed by user:
 
				LoginRadiusSDK.getCompanies(function (companies) {
				//here use companies object
				});

- **Status API**: Call function getStatuses() to get the status data:

				LoginRadiusSDK.getStatuses(function(statuses){
				//here use statuses object
				});

- **Update Status API**: Call function postStatus() to post status message on user's social profile:
				
				LoginRadiusSDK.postStatus(title, url, imageUrl, status, caption, description, function(poststatus) {
				//here use success status object
				});

    Tip:
    - **title** is the title of the message (Optional)
    - **url** is the web link of the status message (Optional)
    - **imageUrl** is the image URL of the status message (Optional)
    - **status** The status message text (Required)
    - **caption** Caption of the status message (Optional)
    - **description** Description of the status message (Optional)
    
    
- **Video API**: Call function getVideos() to get the video files data:
				
				LoginRadiusSDK.getVideos(function (videos){
				//here use videos object
				});
 
- **Like API**: Call function getLikes() to get the likes data:
				
				LoginRadiusSDK.getLikes(function (likes){
				//here use likes object
				})


 - **Assistance/help:** If you have any questions or need assistance with the SDK, please contact our team at support@loginradius.com.
