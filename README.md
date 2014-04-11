LoginRadius library for HTML5
=====================


HTML5 SDK Version 2 Implementation Steps

----------
Set Up
----------
- Add social login interface code from your LoginRadius user account to your webpage.
- Copy SDK file to your project directory and follow the instructions to implement the SDK into your page from the “**Implementation**” section below.

----------

Installation and Use
----------
 - Include SDK file in your code.
> < script src=”LoginRadiusSDK.2.0.0.js” type=”text/javascript”></script>

 - Set callback by passing Successfullylogin function in setLoginCallback function:-
  > < script type=”text/javascript”>
LoginRadiusSDK.setLoginCallback(Successfullylogin);
function Successfullylogin(){
// implement LoginRadius SDK API functions in this function
}
</script>

    Call all LoginRadiusSDK API functions after calling of Successfullylogin function only. And be careful all API functions including  LoginRadiusCallback are asynchronous. 

 - **Userprofile API**: Call function getUserprofile() to get user profile data:-
 
 > // get user profile data
LoginRadiusSDK.getUserprofile( function( data) {  
//here use data object
 });

  Above data is normalized into LoginRadius' standard data format. 
  
  
 -  **Album API**: Call function getPhotos() with Album ID as argument to get user’s photo data for that album. :-
 > LoginRadiusSDK.getPhotos(albumid , function (photos){
//here use photo data object
});


 In the above code:-
**albumid** is a valid album id, it return album photos.

  Above data is normalized into LoginRadius' standard data format. 
  
 - 	**Checkin API**: Call function getCheckins() to get user’s check-in data:-
  >LoginRadiusSDK.getCheckins( function ( checkins ){
//here use checkins data object
});

 Above data is normalized into LoginRadius' standard data format. 
 
 - **Audio API**:	Call function getAudios() to get user’s audio files data:-
  	 >LoginRadiusSDK.getAudios( function ( audios){
//here use audio data object
});


 Above data is normalized into LoginRadius' standard data format. 
 
 
 -  **Post Message API**: Call function postMessage()to send direct messages to user’s contacts:-
  	 >LoginRadiusSDK.postMessage(to , subject , message,  function( postmessage){
//here use success status
});

 In the above code:-
**to** is the Social Id of the receiver.
**subject** is the subject of the message.
**message** is the message content.

  Above data is normalized into LoginRadius' standard data format.
 -  **Contacts API**:	Call function getContacts() to get user’s contacts data:-
  	 >LoginRadiusSDK.getContacts(cursor , function( contacts){
//here use contacts object
});

 In the above code:-
**cursor** is Cursor value for getting next records set( by default pass 0 value).


  Above data is normalized into LoginRadius' standard data format.

 -   **Mentions  API**:	Call function getMentions() to get user’s Twitter mention data:-
 >LoginRadiusSDK.getMentions( function( mentions){
//here use mentions object
});

 Above data is normalized into LoginRadius' standard data format.

 -    **Following API**:  	Call function getFollowings() to get the information of the people, user is following on Twitter:-
      >LoginRadiusSDK.getFollowings( function( followings){
//here use followings object
});


 Above data is normalized into LoginRadius' standard data format.
 - **Event API**: 	Call function getEvents() to get the event data:-
     	    >LoginRadiusSDK.getEvents( function ( events){
//here use events object
});



 Above data is normalized into LoginRadius' standard data format.
 
 - 	 **Get Post API**:Call function getPosts() to get the posts data:-
     	    >LoginRadiusSDK.getPosts( function ( posts){
//here use posts object
});




 Above data is normalized into LoginRadius' standard data format.
 - 	**Company API**:	Call function getCompanies() to get the companies followed by user:-
     	    >LoginRadiusSDK.getCompanies( function ( companies) {
//here use companies object
});





 Above data is normalized into LoginRadius' standard data format.
 - 		 **Status API**:	Call function getStatuses() to get the status data:-
     	    >LoginRadiusSDK.getStatuses( function( statuses){
//here use statuses object
});

 Above data is normalized into LoginRadius' standard data format.
 
 - 	**Update Status API**:Call function postStatus() to post status message on user’s social profile:-

 >LoginRadiusSDK.postStatus(title, url, imageUrl, status, caption, description, function( poststatus) {
 //here use success status object
 });

 In the above code:-
**title** is the title of the message (Optional)
**url** is the web link of the status message (Optional)
**imageUrl** is the image URL of the status message (Optional)
**status** The status message text (Required)
**caption** Caption of the status message (Optional)
**description** Description of the status message (Optional)

 Above data is normalized into LoginRadius' standard data format.

 -     **Video API**:     Call function getVideos() to get the video files data:-
         >LoginRadiusSDK.getVideos( function ( videos){
//here use videos object
});


 Above data is normalized into LoginRadius' standard data format.
 
 -      **Like API**:       	Call function getLikes() to get the likes data:-
   >LoginRadiusSDK.getLikes( function ( likes){
//here use likes object
});


 Above data is normalized into LoginRadius' standard data format.



----------










