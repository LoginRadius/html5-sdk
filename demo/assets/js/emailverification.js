var stringVariable = window.location.href;
domainName = stringVariable.substring(0, stringVariable.lastIndexOf('/'));
$(function() {
	if (getUrlParameter("vtype") == "oneclicksignin") {
                $("#lr-loading").show();
                $("#emailverification-message").text("");
                var verificationToken = getUrlParameter('vtoken');
                var fields = "";
                var welcomeEmailTemplate = "";
                LoginRadiusSDK.passwordLessLoginApi.passwordlessLoginVerification(verificationToken, fields, welcomeEmailTemplate, function(error, data){
                        $("#lr-loading").hide();
                        if(error){
                                $("#emailverification-message").attr('style', 'color:red');    
                                $("#emailverification-message").text(error.Message);
                        }
                        if (data) {
                                getProfile(data.access_token, data.Profile.Uid);
                                
                        }
                        
                });
	} else if (getUrlParameter("vtype") == "emailverification") {
                $("#lr-loading").show();
                $("#emailverification-message").text("");
                var fields = '';
                var url = window.location.href;
                var welcomeEmailTemplate = '';
                var verificationToken = getUrlParameter('vtoken');
                LoginRadiusSDK.authenticationApi.verifyEmail(verificationToken, fields, url, welcomeEmailTemplate,function (error, data) {
                        $("#lr-loading").hide();  
                        if (error) {
                                $("#emailverification-message").attr('style', 'color:red');                      
                                $("#emailverification-message").text(error.Message);
                        } 

                        if (data.IsPosted) {
                                $("#emailverification-message").attr('style', 'color:green');  
                                $("#emailverification-message").text('Your email has been verified successfully.');
                        }
                });
	}
});

function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}