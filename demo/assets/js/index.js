var stringVariable = window.location.href;
domainName = stringVariable.substring(0, stringVariable.lastIndexOf('/'));
$(function () {
    var accesstoken = localStorage.getItem("LRTokenKey");
    var lruid= localStorage.getItem("LRUserID");
    if (accesstoken != "" && accesstoken != null && lruid != "" && lruid != null) {
        window.location.href = domainName + "/profile.html";
    }
    handleLogin();
    handleMFALogin();
    handlePwLessLogin();
    handleSignup();
    handleForgotPassword();
    handleResetPassword();

    var vtype = getUrlParameter("vtype");
    if (vtype == 'reset') {
        jQuery('.lrforgotpassword').hide();
        jQuery('.lrrestpassword').show();
    }
    $("#lr-loading").click(function () {
        $("#lr-loading").hide();
    });
});

function getProfile(access_token, profile_uid) {
    localStorage.setItem('LRTokenKey', access_token);
    localStorage.setItem('LRUserID', profile_uid);

    $("#lr-loading").show();
    LoginRadiusSDK.authenticationApi.getProfileByAccessToken(access_token, null,
        null, null, null, function (error, data) {
        $("#lr-loading").hide();
        if(error){
            $("#minimal-login-errorMsg").text(error.Message);
        }

        if (data) {
            localStorage.setItem('EmailId', data.Email[0].Value);
            if (typeof (data.FullName) != "undefined" && data.FullName !== null) {
                localStorage.setItem('UserName', data.FullName);
            }
            localStorage.setItem('ImageUrl', data.ImageUrl);
            localStorage.setItem('LastLoginTime', data.LastLoginDate);
            window.location.href = domainName + "/profile.html";
        }
    });
}

function handleLogin() {
    $('#btn-minimal-login').on('click', function () {
        $("#minimal-login-errorMsg").text("");
        if ($('#minimal-login-email').val().trim() == '') {
            $("#minimal-login-errorMsg").text("The Email Id field is required.");
            return;
        } else if ($('#minimal-login-password').val().trim() == '') {
            $("#minimal-login-errorMsg").text("The Password field is required.");
            return;
        }
        $("#lr-loading").show();
        var emailAuthenticationModel = {
            email: $("#minimal-login-email").val(),
            password: $("#minimal-login-password").val(),
            action: "loginByEmail"
        };
        var emailTemplate = "";
        var fields = "";
        var loginUrl = window.location.href;
        var verificationUrl = "";

        LoginRadiusSDK.authenticationApi.loginByEmail(emailAuthenticationModel, emailTemplate, fields, loginUrl, verificationUrl, function(error, data){
            $("#lr-loading").hide();
            if(error){
                $("#minimal-login-errorMsg").text(error.Message);
            }
            if (data) {
                $("#minimal-login-email").val("");
                $("#minimal-login-password").val("");
                getProfile(data.access_token, data.Profile.Uid);
            }
        });
    });
}

function handlePwLessLogin() {
    $('#btn-minimal-pwless').on('click', function () {
        $("#minimal-pwless-successMsg").text("");
        $("#minimal-pwless-errorMsg").text("");
        if ($('#minimal-pwless-email').val().trim() == '') {
            $("#minimal-pwless-errorMsg").text("The Email Id field is required.");
            return;
        }
        $("#lr-loading").show();
        var email = $('#minimal-pwless-email').val();
        var passwordLessLoginTemplate = "";
        var verificationUrl = window.location.href;
        LoginRadiusSDK.passwordLessLoginApi.passwordlessLoginByEmail(email, passwordLessLoginTemplate, verificationUrl, function(error, data){
            $("#lr-loading").hide();
            if (error) {           
                $("#minimal-pwless-errorMsg").text(error.Message);
                return;
            } 
            if (data.IsPosted) {
                $("#minimal-pwless-email").val("");
                $("#minimal-pwless-successMsg").text('One time login link has been sent to your provided email id, check email for further instruction.');
            }
        })
    });
}

function handleMFALogin() {
    $('#btn-minimal-mfalogin-next').on('click', function () {
        $("#minimal-mfalogin-successMsg").text("");
        $("#minimal-mfalogin-errorMsg").text("");
        if ($('#minimal-mfalogin-email').val().trim() == '') {
            $("#minimal-mfalogin-errorMsg").text("The Email Id field is required.");
            return;
        } else if ($('#minimal-mfalogin-password').val().trim() == '') {
            $("#minimal-mfalogin-errorMsg").text("The Password field is required.");
            return;
        }
        $("#lr-loading").show();
        var email = $("#minimal-mfalogin-email").val();
        var password = $("#minimal-mfalogin-password").val();
        var emailTemplate = "";
        var fields = "";
        var emailTemplate2FA="";
        var loginUrl = "";
        var smsTemplate = "";
        var smsTemplate2FA = "";
        var verificationUrl = "";

        LoginRadiusSDK.multiFactorAuthenticationApi.mfaLoginByEmail(email, password, emailTemplate, emailTemplate2FA, fields, loginUrl, smsTemplate, smsTemplate2FA, verificationUrl, function(error, data){
            $("#lr-loading").hide();
            if(error){                
                $("#minimal-mfalogin-errorMsg").text(error.Message);
                return;
            }
            if(data){
                $("#minimal-mfalogin-email").val("");
                $("#minimal-mfalogin-password").val("");
                if (typeof (data.SecondFactorAuthentication) != "undefined" && data.SecondFactorAuthentication!= null) {

                var secondFactorAuthenticationToken = data.SecondFactorAuthentication.SecondFactorAuthenticationToken;

                var qrHtml = '';
                var qrCode = data.SecondFactorAuthentication.QRCode;
                if (!data.SecondFactorAuthentication.IsGoogleAuthenticatorVerified) {
                    qrHtml = '<img src=' + qrCode + '><br/>';
                } else {
                    qrHtml = '';
                }
                $('#minimal-mfalogin-login').html(qrHtml + "Google Auth Code: <input type='text' id='minimal-mfalogin-googlecode'/><br/><button id='btn-minimal-mfalogin-login'>Login</button><br/>");

                $('#btn-minimal-mfalogin-login').on('click', function () {
                    if ($('#minimal-mfalogin-googlecode').val().trim() == '') {
                        $("#minimal-mfalogin-errorMsg").text("Google code required.");
                        return;
                    }
                    validateGoogleCode(secondFactorAuthenticationToken);
                });
            } else {
                $("#minimal-mfalogin-email").val("");
                $("#minimal-mfalogin-password").val("");
                getProfile(data.access_token, data.Profile.Uid);
            }
         }
        });
    });
}

function validateGoogleCode(secondFactorAuthenticationToken) {
    $("#lr-loading").show();
    var googleAuthenticatorCode = $("#minimal-mfalogin-googlecode").val();
    var fields = "";
    var rbaBrowserEmailTemplate = "";
    var rbaCityEmailTemplate = "";
    var rbaCountryEmailTemplate = "";
    var rbaIpEmailTemplate = "";
    LoginRadiusSDK.multiFactorAuthenticationApi.mfaValidateGoogleAuthCode(googleAuthenticatorCode, secondFactorAuthenticationToken, fields, rbaBrowserEmailTemplate, rbaCityEmailTemplate, rbaCountryEmailTemplate, rbaIpEmailTemplate, function (error, data) {
          $("#lr-loading").hide();
        $("#minimal-mfalogin-errorMsg").text("");

        if (error) {
            $("#minimal-mfalogin-errorMsg").text(error.Message);
            return;
        }
        if (data) {
            getProfile(data.access_token, data.Profile.Uid);
        }
    });
}

function handleSignup() {
    $('#btn-minimal-signup').on('click', function () {        
        $("#minimal-signup-successMsg").text("");
        $("#minimal-signup-errorMsg").text("");
        if ($('#minimal-signup-email').val().trim() == '') {
            $("#minimal-signup-errorMsg").text("The Email Id field is required.");
            return;
        } else if ($('#minimal-signup-password').val().trim() == '') {
            $("#minimal-signup-errorMsg").text("The Password field is required.");
            return;
        } else if ($('#minimal-signup-password').val().trim().length < '6') {
            $("#minimal-signup-errorMsg").text("The Password field must be at least 6 characters in length.");
            return;
        } else if ($("#minimal-signup-password").val() != $("#minimal-signup-confirmpassword").val()) {
            $("#minimal-signup-errorMsg").text("Passwords do not match.");
            return;
        }
        $("#lr-loading").show();

        var authUserRegistrationModel = {
            email: [{
                'Type': 'Primary',
                'Value': $("#minimal-signup-email").val()
              }],
            password: $("#minimal-signup-password").val()
        };
        var sott = commonOptions.sott;
        var emailTemplate = "";
        var fields = "";
        var options = "";
        var verificationUrl = domainName;
        var welcomeEmailTemplate = "";

        LoginRadiusSDK.authenticationApi.userRegistrationByEmail(authUserRegistrationModel, sott, emailTemplate, fields, options, verificationUrl, welcomeEmailTemplate, function(error, data){

            $("#lr-loading").hide();
            if (error) {             
                $("#minimal-signup-errorMsg").text(error.Message);
                return;
            }
            if (data.EmailVerified) {
                $("#minimal-signup-email").val('');
                $("#minimal-signup-password").val('');
                $("#minimal-signup-confirmpassword").val('');
                getProfile(data.Data.access_token, data.Data.Profile.Uid);
            } else {
                $("#minimal-signup-successMsg").text('You have successfully registered, Please check your email.');
                $("#minimal-signup-email").val('');
                $("#minimal-signup-password").val('');
                $("#minimal-signup-confirmpassword").val('');
            }
        });
    });
}

function handleForgotPassword() {
    $('#btn-minimal-forgotpassword').on('click', function () {
        $("#minimal-forgotpassword-successMsg").text("");
        $("#minimal-forgotpassword-errorMsg").text("");
        if ($('#minimal-forgotpassword-email').val().trim() == '') {
            $("#minimal-forgotpassword-errorMsg").text("The Email Id field is required.");
            return;
        }
        $("#lr-loading").show();
        
        var email = $('#minimal-forgotpassword-email').val();
        var resetPasswordUrl = window.location.href;
        var emailTemplate = "";

        LoginRadiusSDK.authenticationApi.forgotPassword(email, resetPasswordUrl, emailTemplate, function(error, data){
            $("#lr-loading").hide();
            if (error) {             
                $("#minimal-forgotpassword-errorMsg").text(error.Message);
                return;
            }
            if (data) { 
                $("#minimal-forgotpassword-email").val("");
                $("#minimal-forgotpassword-successMsg").text("We'll email you an instruction on how to reset your password");
            }            
        });
    });
}

function handleResetPassword() {
    $('#btn-minimal-resetpassword').on('click', function () {
        $("#minimal-resetpassword-successMsg").text("");
        $("#minimal-resetpassword-errorMsg").text("");
        if ($('#minimal-resetpassword-password').val().trim() == '') {
            $("#minimal-resetpassword-errorMsg").text("The Password field is required.");
            return;
        }else if ($('#minimal-resetpassword-password').val().trim().length < '6') {
            $("#minimal-resetpassword-errorMsg").text("The Password field must be at least 6 characters in length.");
            return;
        }
        else if ($('#minimal-resetpassword-password').val() != $('#minimal-resetpassword-confirmpassword').val()) {
            $("#minimal-resetpassword-errorMsg").text("Passwords do not match.");
            return;
        } 
        $("#lr-loading").show();
        var resetPasswordByResetTokenModel = {
            'resettoken': getUrlParameter("vtoken"),
            'password': $('#minimal-resetpassword-password').val(),
            'welcomeEmailTemplate': '',
            'resetPasswordEmailTemplate': ''
          };
        LoginRadiusSDK.authenticationApi.resetPasswordByResetToken(resetPasswordByResetTokenModel, function(error, data){
            $("#lr-loading").hide();
            if (error) {             
                $("#minimal-resetpassword-errorMsg").text(error.Message);
                return;
            }
            if (data) { 
                $("#minimal-resetpassword-password").val("");
                $("#minimal-resetpassword-confirmpassword").val("");
                $("#minimal-resetpassword-successMsg").text("We'll email you an instruction on how to reset your password");
            }
            
        });
    });
}

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