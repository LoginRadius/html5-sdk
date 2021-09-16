var stringVariable = window.location.href;
domainName = stringVariable.substring(0, stringVariable.lastIndexOf('/'));
$(function () {
    getProfileByUid();
    handleUpdateAccount();   
});

function getProfileByUid() {
    $("#lr-loading").show();
    var token = LoginRadiusSDK.getToken();
    LoginRadiusSDK.authenticationApi.getProfileByAccessToken(token, null,
        null, null, null, function (error, data) {
        $("#lr-loading").hide();
        if(error){
            console.log(error);
            return;
        }
        if (typeof (data.FirstName) != "undefined" && data.FirstName !== null) {
            $("#user-updateaccount-firstname").val(data.FirstName);  
            localStorage.setItem('UserName', data.FullName);
        }
        if (typeof (data.LastName) != "undefined" && data.LastName !== null) {
            $("#user-updateaccount-lastname").val(data.LastName);   
            localStorage.setItem('UserName', data.FullName);
        }
        if (typeof (data.About) != "undefined" && data.About !== null) {
            $("#user-updateaccount-about").val(data.About);                
        }
        
    })
}

function handleUpdateAccount() {
    $('#btn-user-updateaccount').on('click', function () {
        $("#user-updateaccount-errorMsg").text("");
        $("#user-updateaccount-successMsg").text("");

        $("#lr-loading").show();
        var userProfileUpdateModel = {
            firstname: $("#user-updateaccount-firstname").val(),
            lastname: $("#user-updateaccount-lastname").val(),
            about: $("#user-updateaccount-about").val()
        };
        var emailTemplate = "";
        var fields = "";
        var nullSupport = "";
        var smsTemplate = "";
        var verificationUrl = "";

        var lrToken = LoginRadiusSDK.getToken();
        LoginRadiusSDK.authenticationApi.updateProfileByAccessToken(lrToken,userProfileUpdateModel,
            emailTemplate, fields, nullSupport, smsTemplate, verificationUrl, function (error, data) {
            
            $("#lr-loading").hide();
            if(error){
                console.log(error);
                $("#user-updateaccount-errorMsg").text("Something went wrong.");
                return;
            }
			if (typeof (data.Data.FullName) != "undefined" && data.Data.FullName !== null) {
                localStorage.setItem('UserName', data.Data.FullName);
            }else{
				localStorage.setItem('UserName', '');
			}
            $("#user-updateaccount-successMsg").html("Account has been updated.");
        })
    });
}