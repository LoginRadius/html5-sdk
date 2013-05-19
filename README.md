JS/HTML5 SDK for LoginRadius API
==
Description: LoginRadius's JS SDK is a development kit that lets you integrate Social Login through providers such as Facebook, Google, Twitter, and over 20 more. The SDK also fetches user profile data and can be customized from your LoginRadius user account. Ex: social login interface, provider settings, etc.


This SDK supports authentication as well as user profile data. To implement it on a website please follow these quick steps:

1. Download the LoginRadius JS SDK and add it to your web project.
2. Add the below script under body section of the page and login from social login. After successful authentication, you will get user profile data of the user.

			<script type="text/javascript">
			    LoginRadiusSDK.onlogin = Successfullylogin;
			
			    function Successfullylogin() {
			        LoginRadiusSDK.getUserprofile(function (data) {
			            document.getElementById("profile").innerHTML = JSON.stringify(data);
			        });
			        return false;
			    };    
			</script>
