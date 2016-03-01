var lrThemeSettings = {
    raasoption: {
        apikey: loginRadiusConfig.apikey,
        appname: loginRadiusConfig.sitename,
        forgotPasswordUrl: window.location.href.split("?")[0].split("#")[0],
        emailVerificationUrl: window.location.href.split("?")[0].split("#")[0]
    },
    logo: {
        logo_image_path: "", /* Your logo image path, must be 28px * 28px */
        logo_alt_text: "" /* Alternative text for Image */
    },
    caption_message: {
        register: "Register",
        login: "Login",
        forgot_password: "Forgot Password",
        reset_password: "Reset Password",
        fields_missing: "One Step Left"
    },
    success_message: {
        register: "Succeed, a verification email has been sent to your email address",
        login: "Login succeed",
        social_login: "Social login succeed", /* Or maybe go check your emails to verify for Twitter */
        email_verified: "Email verified successfully, you can login now",
        forgot_password: "A reset link has been sent to your email address, click to reset your email",
        reset_password: "Your password has been reset",
        verify_email:"Email verified successfully, you can login now",
        unverified_email:"The email is not verified, please verify the link in your email"
    },
    allowUserLogin: function (response) {
        document.getElementById('fade').style.display = "block";
        LoginRadiusSDK.getUserprofile(function (data) {
            if(data.EmailVerified == true){
                document.getElementById('profiledata').innerHTML = getTable(data);
                document.getElementById("profileinformation").style.display = "block";
                document.getElementById("homeinformation").style.display = "none";                
                document.getElementById('logoutaction').style.display = "block";
                document.getElementById('loginaction').style.display = "none";
                LrRaasTheme.closeAllPopups();
            }else{
                document.getElementById("profileinformation").style.display = "none";
                document.getElementById("homeinformation").style.display = "block";
                document.getElementById('logoutaction').style.display = "none";
                document.getElementById('loginaction').style.display = "block";
                LrRaasTheme.showPopup('lr-login-container');
                var message_header = document.getElementById('lr-login-popup-message');
                message_header.innerHTML = lrThemeSettings.success_message.unverified_email;
                LrRaasTheme.hideShowMessage('block');
            }
            document.getElementById('fade').style.display = "none";            
        });
    },
    form_render_submit_hook: {
        start: function () {
            //document.getElementById('fade').style.display = "block";
        },
        end: function () {
            //document.getElementById('fade').style.display = "none";
        }
    },
    reset_form_after_close_popup: false
}

function getTable(profile) {
    var data = '<table>';
    for (var key in profile) {
        data += '<tr><td class="profileLabel">' + key + '</td>';
        var value = (profile[key] != null) ? profile[key] : '';
        if (typeof value == "object") {
            data += '<td class="profileValue">' + createHorizontalTable(value) + '</td>';
        } else {
            data += '<td class="profileValue">' + value + '</td>';
        }
        data += '</tr>';
    }
    data += '</table>';
    return data;
}

function createHorizontalTable(profile, count, table) {
    var data = '';
    if (typeof count == "undefined") {
        count = 0
    }
    if (count == '0') {
        data += '<table><tr>';
        for (var key in profile) {
            var value = (profile[key] != null) ? profile[key] : '';
            if (typeof value == "object") {
                data = '';
                return createHorizontalTable(value);
            }
            data += '<td class="profileLabel">' + key + '</td>';
        }
        data += '</tr>';
    }
    data += '<tr>';
    if (table == 'albums') {
        data += '<td><a onclick="photoProfile(&quot;' + profile['ID'] + '&quot;)">View Photos</a></td>';
    }
    for (var key in profile) {
        var value = (profile[key] != null) ? profile[key] : '';
        if (typeof value == "object") {
            data += '<td>' + createHorizontalTable(value) + '</td>';
        } else {
            if (key == 'ImageUrl' || key == 'Small' || key == 'Square' || key == 'Large' || key == 'Profile' || key == 'Image' || key == 'Picture') {
                data += '<td><img style="width:70px;" src="' + value + '"/></td>';
            } else {
                data += '<td>' + value + '</td>';
            }
        }
    }

    data += '</tr>';
    if (count == '0') {
        data += '</table>';
    }
    return data;
}