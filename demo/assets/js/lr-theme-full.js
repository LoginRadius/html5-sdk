//customization
$(document).ready(function () {
    $('.loginradius-raas-birthdate').datepicker("option", "dateFormat", 'mm-dd-yyyy');
    $("#fade").click(function () {
        $('#fade').hide();
    });

});
function show_birthdate_date_block() {
    var maxYear = new Date().getFullYear();
    var minYear = maxYear - 100;
    $('body').on('focus', ".loginradius-raas-birthdate", function () {
        $('.loginradius-raas-birthdate').datepicker({
            dateFormat: 'mm-dd-yy',
            maxDate: new Date(),
            minDate: "-100y",
            changeMonth: true,
            changeYear: true,
            yearRange: (minYear + ":" + maxYear)
        });
    });
}

var commonOptions = {};
commonOptions.apiKey = lrThemeSettings.raasoption.apikey;
commonOptions.appName = lrThemeSettings.raasoption.appname;
commonOptions.verificationUrl = lrThemeSettings.raasoption.verificationUrl;
commonOptions.forgotPasswordUrl = lrThemeSettings.raasoption.forgotPasswordUrl;
commonOptions.sott = lrThemeSettings.raasoption.sott;

commonOptions.hashTemplate = true;
commonOptions.V2Recaptcha = true;
commonOptions.accessTokenResponse = true;

var LRObject = new LoginRadiusV2(commonOptions);


LRObject.$hooks.register('startProcess',function () {
    lrThemeSettings.form_render_submit_hook.start();
});
LRObject.$hooks.register('endProcess',function () {
    lrThemeSettings.form_render_submit_hook.end();
});

var LrRaasTheme = {
    init: function (body) {
        this.createParent();
        this.appendOverlayDiv();
        this.createPopup('register');
        this.createPopup('login');
        this.createPopup('forgot');
        this.raasFormInject();
        this.appendFooter();

    },
    appendOverlayDiv: function () {
        var div = document.createElement('div');
        div.id = 'lr-overlay';
        document.getElementById('lr-pop-group').appendChild(div);
    },
    createParent: function () {
        var group = document.createElement('div');
        group.id = 'lr-pop-group';
        document.body.appendChild(group);
    },
    createPopup: function (action) {
        var div = document.createElement('div');
        var header_div;
        var body_div;
        var footer_div;

        switch (action) {
            case 'register':
                div.id = 'lr-register-container';
                div.className = 'lr-popup-container';
                header_div = this.createHeader(lrThemeSettings.caption_message.register);

                break;

            case 'login':
                div.id = 'lr-login-container';
                div.className = 'lr-popup-container';
                header_div = this.createHeader(lrThemeSettings.caption_message.login);

                break;

            case 'forgot':
                div.id = 'lr-fp-container';
                div.className = 'lr-popup-container';
                header_div = this.createHeader(lrThemeSettings.caption_message.forgot_password);

                break;

            case 'reset':
                div.id = 'lr-rp-container';
                div.className = 'lr-popup-container';
                header_div = this.createHeader(lrThemeSettings.caption_message.reset_password);

                break;

            case 'social':
                div.id = 'lr-social-container';
                div.className = 'lr-popup-container';
                header_div = this.createHeader(lrThemeSettings.caption_message.fields_missing);

                break;

            default:
                break;
        }

        body_div = this.createBody(action);
        div.appendChild(header_div);
        div.appendChild(body_div);

        document.getElementById('lr-pop-group').appendChild(div);
    },
    createHeader: function (message) {
        var div = document.createElement('div');
        div.className = 'lr-popup-header';
        //the close btn
        var closeSpan = document.createElement('span');
        closeSpan.className = 'lr-popup-close-span';
        closeSpan.innerHTML = '<a class="lr-popup-close-btn" onclick="LrRaasTheme.closeAllPopups()">&#215</a>';
        div.appendChild(closeSpan);
        //customizable logo section
        var logo_div = document.createElement('div');
        logo_div.className = 'lr-header-logo';
        logo_div.innerHTML = '<img src="' + lrThemeSettings.logo.logo_image_path + '" alt="Logo" class="lr-header-logo-img" />';
        logo_div.innerHTML += '<p class="lr-header-caption">' + message + '</p>';
        div.appendChild(logo_div);

        return div;
    },
    createBody: function (action) {
        var div = document.createElement('div');
        div.id = 'lr-popup-body-container';

        var message_header = document.createElement('div');
        message_header.id = 'lr-' + action + '-popup-message';
        message_header.className = 'lr-popup-message';

        div.appendChild(message_header);

        switch (action) {
            case 'register':
                var social_div = document.createElement('div');
                social_div.className = 'interfacecontainerdiv lr-sl-shaded-brick-frame lr-column';
                var reg_div = document.createElement('div');
                reg_div.id = 'register-div';
                reg_div.className = 'lr-column';

                div.appendChild(social_div);
                div.appendChild(reg_div);

                break;
            case 'login':
                var social_div = document.createElement('div');
                social_div.className = 'interfacecontainerdiv lr-sl-shaded-brick-frame lr-column';
                var reg_div = document.createElement('div');
                reg_div.id = 'login-div';
                reg_div.className = 'lr-column';

                div.appendChild(social_div);
                div.appendChild(reg_div);

                break;

            case 'forgot':
                var fp_div = document.createElement('div');
                fp_div.id = 'forgotpassword-div';
                div.appendChild(fp_div);

                break;

            case 'reset':
                var rp_div = document.createElement('div');
                rp_div.id = 'resetpassword-div';
                div.appendChild(rp_div);

                break;

            case 'social':
                var social_div = document.createElement('div');
                social_div.id = 'sociallogin-container';
                div.appendChild(social_div);
                break;

            default:
                break;
        }

        return div;
    },
    createFooter: function (action) {
        var div = document.createElement('div');
        div.id = 'lr-popup-footer';
        div.className = 'lr-popup-footer';
        switch (action) {

            case 'register':
                div.innerHTML = "<a class='lr-raas-theme-fp'>Forgot Password</a>&nbsp;&nbsp;<a class='lr-raas-theme-login'>Login</a>";
                break;
            case 'login':
                div.innerHTML = "<a class='lr-raas-theme-fp'>Forgot Password</a><a class='lr-raas-theme-register'>Register</a>";
                break;
            case 'forgot':
                div.innerHTML = "<a class='lr-raas-theme-login'>Login</a>";
                break;
            case 'reset':
                div.innerHTML = "<a class='lr-raas-theme-login'>Login</a>";
                break;
            default:
                break;
        }

        return div;
    },
    raasFormInject: function () {
        var registration_options = {};
        registration_options.container = 'register-div';
        registration_options.onSuccess = function(response) {
            var message_header = document.getElementById('lr-register-popup-message');
            message_header.innerHTML = lrThemeSettings.success_message.register;
            LrRaasTheme.hideShowMessage('block');
            $('input[type=text],input[type=password],select,textarea').val('');
        };
        registration_options.onError = function(errors) {
            var message_header = document.getElementById('lr-register-popup-message');
            message_header.innerHTML = (typeof errors[0].Message != "undefined")?errors[0].Message:errors[0].Message;
            LrRaasTheme.hideShowMessage('block');
        };

        var login_options = {};
        login_options.container = 'login-div';
        login_options.onSuccess = function (response) {
            var message_header = document.getElementById('lr-login-popup-message');
            message_header.innerHTML = lrThemeSettings.success_message.login;
            LrRaasTheme.hideShowMessage('block');
            $('input[type=text],input[type=password],select,textarea').val('');
            lrThemeSettings.allowUserLogin(response);
        };
        login_options.onError = function(errors) {
            console.log(errors);
            var message_header = document.getElementById('lr-login-popup-message');
            message_header.innerHTML = (typeof errors[0].Message != "undefined")?errors[0].Message:errors[0].Message;
            LrRaasTheme.hideShowMessage('block');
        };

        var sociallogin_options = {};


        if (navigator.userAgent.match('CriOS')) {
            sociallogin_options.templateName = "loginradiuscustom_tmpl_IOS";
        } else {
            sociallogin_options.templateName = "loginradiuscustom_tmpl";
        }

        sociallogin_options.onSuccess = function(response) {
            var social_message_header = document.getElementById('lr-social-popup-message');
            if (document.getElementById('loginradius-raas-social-registration-emailid')) {
                if (social_message_header) {
                    social_message_header.innerHTML = lrThemeSettings.success_message.register;
                    LrRaasTheme.hideShowMessage('block');
                }
            } else {
                if (social_message_header) {
                    social_message_header.innerHTML = lrThemeSettings.success_message.social_login;
                    LrRaasTheme.hideShowMessage('block');
                }
            }
            $('input[type=text],input[type=password],select,textarea').val('');
            lrThemeSettings.allowUserLogin(response);
        };

        sociallogin_options.onError = function(errors) {
            var social_message_header = document.getElementById('lr-login-popup-message');
            social_message_header.innerHTML = (typeof errors[0].Message != "undefined")?errors[0].Message:errors[0].Message;
            var social_message_header = document.getElementById('lr-register-popup-message');
            social_message_header.innerHTML = (typeof errors[0].Message != "undefined")?errors[0].Message:errors[0].Message;
            LrRaasTheme.hideShowMessage('block');
        };

        sociallogin_options.container = "sociallogin-container";

        var forgotpassword_options = {};
        forgotpassword_options.container = "forgotpassword-div";
        forgotpassword_options.onSuccess = function(response) {
            var message_header = document.getElementById('lr-forgot-popup-message');
            message_header.innerHTML = lrThemeSettings.success_message.forgot_password;
            LrRaasTheme.hideShowMessage('block');
            $('input[type=text],input[type=password],select,textarea').val('');
        };

        forgotpassword_options.onError = function(errors){
            var message_header = document.getElementById('lr-forgot-popup-message');
            message_header.innerHTML = (typeof errors[0].Message != "undefined")?errors[0].Message:errors[0].Message;
            LrRaasTheme.hideShowMessage('block');
        };

        var verifyemail_options = {};
        verifyemail_options.onSuccess = function(response) {
            LrRaasTheme.showPopup('lr-login-container');
            var message_header = document.getElementById('lr-login-popup-message');
            message_header.innerHTML = lrThemeSettings.success_message.verify_email;
            LrRaasTheme.hideShowMessage('block');
            $('input[type=text],input[type=password],select,textarea').val('');
        };
        verifyemail_options.onError = function(errors) {
            LrRaasTheme.showPopup('lr-login-container');
            var message_header = document.getElementById('lr-login-popup-message');
            message_header.innerHTML = (typeof errors[0].Message != "undefined")?errors[0].Message:errors[0].Message;
            LrRaasTheme.hideShowMessage('block');
        };

        var reset_options = {};
        reset_options.container = 'resetpassword-div';
        reset_options.onSuccess = function(response) {
            LrRaasTheme.showPopup('lr-login-container');
            var message_header = document.getElementById('lr-login-popup-message');
            message_header.innerHTML = lrThemeSettings.success_message.reset_password;
            LrRaasTheme.hideShowMessage('block');
        };

        reset_options.onError = function(errors) {
            var message_header = document.getElementById('lr-reset-popup-message');
            message_header.innerHTML = (typeof errors[0].Message != "undefined")?errors[0].Message:errors[0].Message;
            LrRaasTheme.hideShowMessage('block');
        };




        LRObject.util.ready(function () {
            LRObject.init('registration', registration_options);

            LRObject.init('login', login_options);

            LRObject.customInterface(".interfacecontainerdiv", sociallogin_options);

            LRObject.init('socialLogin', sociallogin_options);


            LRObject.$hooks.register('socialLoginFormRender',function () {
                LrRaasTheme.createPopup('social');
                LrRaasTheme.showPopup('lr-social-container');
            });

            LRObject.init('forgotPassword', forgotpassword_options);

            show_birthdate_date_block();
            var params = LrRaasTheme.getUrlParameters();
            for (var key in params) {
                if ('emailverification' === params[key]) {
                    LRObject.init('verifyEmail', verifyemail_options);
                } else if ('reset' === params[key]) {
                    LrRaasTheme.createPopup('reset');
                    LRObject.init('resetPassword', reset_options);

                    LrRaasTheme.showPopup('lr-rp-container');
                } else {
                    return true;
                }
            }

        });
    },
    appendFooter: function () {
        var reg_form = document.getElementsByName('loginradius-registration');
        var login_form = document.getElementsByName('loginradius-login');
        var forgot_form = document.getElementsByName('loginradius-forgotpassword');
        var reset_form = document.getElementsByName('loginradius-resetpassword');

        var registration_form_interval = setInterval(function () {
            if (document.readyState !== 'complete')
                return;
            if(reg_form[0]){
                clearInterval(registration_form_interval);
                reg_form[0].appendChild(LrRaasTheme.createFooter('register'));
                LrRaasTheme.addClassListener();
            }
        }, 100);

        var login_form_interval = setInterval(function () {
            if (document.readyState !== 'complete')
                return;
            if(login_form[0]){
                clearInterval(login_form_interval);
                login_form[0].appendChild(LrRaasTheme.createFooter('login'));
                LrRaasTheme.addClassListener();
            }
        }, 100);

        var forgot_form_interval = setInterval(function () {
            if (document.readyState !== 'complete')
                return;
            if(forgot_form[0]){
                clearInterval(forgot_form_interval);
                forgot_form[0].appendChild(LrRaasTheme.createFooter('forgot'));
                LrRaasTheme.addClassListener();
            }
        }, 100);

        var reset_form_interval = setInterval(function () {
            if (document.readyState !== 'complete')
                return;
            if(reset_form[0]){
                clearInterval(reset_form_interval);
                reset_form[0].appendChild(LrRaasTheme.createFooter('reset'));
                LrRaasTheme.addClassListener();
            }
        }, 100);
    },
    hideShowMessage: function (display){
    var elements = document.getElementsByClassName('lr-popup-message');
    for(var i = 0, length = elements.length; i < length; i++) {
          elements[i].style.display = display;
    }
  },
    showPopup: function (popup_id) {
        console.log(popup_id);
        LrRaasTheme.hideShowMessage('none');
        this.closeAllPopups();
        this.clearAllMessages();
        this.showOverlay();

        var pop = document.getElementById(popup_id);
        pop.className = pop.className + " lr-show";
    },
    hideOverlay: function () {
        document.getElementById('lr-overlay').className = '';
        document.getElementById('lr-pop-group').className = '';
    },
    showOverlay: function () {
        document.getElementById('lr-overlay').className = 'lr-show-layover';
        document.getElementById('lr-pop-group').className = 'lr-show-layover';
    },
    resetAllPopups: function () {
        var form_list = ['loginradius-registration', 'loginradius-login', 'loginradius-forgotpassword'];
        for (var i = 0; i < form_list.length; i++) {
            var form = document.getElementsByName(form_list[i]);
            form[0].reset();
        }
    },
    closeAllPopups: function () {
        if (lrThemeSettings.reset_form_after_close_popup) {
            this.resetAllPopups;
        }
        this.hideOverlay();
        var popups = document.getElementsByClassName("lr-popup-container");
        for (var i = 0; i < popups.length; i++) {
            popups[i].className = "lr-popup-container";
        }
    },
    clearAllMessages: function () {
        var message_headers = document.getElementsByClassName('lr-popup-message');
        for (var i = 0; i < message_headers.length; i++)
        {
            message_headers[i].innerHTML = "";
        }
        LrRaasTheme.hideShowMessage('none');
    },
    addClassListener: function () {
        document.getElementById('lr-overlay').addEventListener("click", function () {
            LrRaasTheme.closeAllPopups();
        });

        var closeBtnClass = document.getElementsByClassName("lr-popup-close-btn");
        for (var i = 0; i < closeBtnClass.length; i++) {
            closeBtnClass[i].addEventListener("click", function (event) {
                LrRaasTheme.closeAllPopups();
                return false;
            });
        }

        var lrSignupClass = document.getElementsByClassName("lr-raas-theme-register");
        for (var i = 0; i < lrSignupClass.length; i++) {
            lrSignupClass[i].addEventListener("click", function (event) {
                LrRaasTheme.showPopup('lr-register-container');
                return false;
            });
        }

        var lrLoginClass = document.getElementsByClassName("lr-raas-theme-login");
        for (var i = 0; i < lrLoginClass.length; i++) {
            lrLoginClass[i].addEventListener("click", function (event) {
                LrRaasTheme.showPopup('lr-login-container');
                return false;
            });
        }

        var fpClass = document.getElementsByClassName("lr-raas-theme-fp");
        for (var i = 0; i < fpClass.length; i++) {
            fpClass[i].addEventListener("click", function (event) {
                LrRaasTheme.showPopup('lr-fp-container');
                return false;
            });
        }

        var logoutClass = document.getElementsByClassName("lr-raas-theme-logout");
        for (var i = 0; i < logoutClass.length; i++) {
            logoutClass[i].addEventListener("click", function (event) {
                LrRaasTheme.closeAllPopups();
                console.log("Hello");
                var logout_options = {};
                logout_options.onSuccess = function() {
                    console.log("loggedout")
                };
                LRObject.init("logout", logout_options);
                document.getElementById('logoutaction').style.display = "none";
                document.getElementById('loginaction').style.display = "block";
                document.getElementById("profileinformation").style.display = "none";
                document.getElementById("homeinformation").style.display = "block";
                return false;
            });
        }
    },
    getUrlParameters: function () {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? this.transformToAssocArray(prmstr) : {};
    },
    transformToAssocArray: function (prmstr) {
        var params = {};
        var prm_array = prmstr.split("&");
        for (var i = 0; i < prm_array.length; i++) {
            var tmp_array = prm_array[i].split("=");
            params[tmp_array[0]] = tmp_array[1];
        }

        return params;
    }
}
$(document).ready(function () {

    LrRaasTheme.init();
    $('.lr-menu-buttons .lr-buttons').click(function () {

        var dataTab = $(this).attr("data-tab");

        $('.lr-menu-buttons .lr-buttons').removeClass('lr-tab-active');
        $('.lr-profile-frame .lr-frame').removeClass('lr-tab-active');

        $(this).addClass('lr-tab-active');
        $("#" + dataTab).addClass('lr-tab-active');
    });

    // this makes the first element with that class visible.. if you don't want this.. add that class manually
    $('.lr-menu-buttons .lr-buttons:eq(0)').addClass('lr-tab-active');
    $('.lr-profile-frame .lr-frame:eq(0)').addClass('lr-tab-active');
    $('.lr-show-pw').click(function () {
        var dataTab = $('.lr-tab-active').attr("data-tab");
        var placeholder = '';
        var showPass = function () {
            $('.' + dataTab).find('input:password').each(function () {

                $("<input type='text' class='showPass' />").attr({name: this.name, value: this.value}).insertBefore(this);
            }).remove();
        };
        var hidePass = function () {
            $('.' + dataTab).find('input.showPass').each(function () {
                $("<input type='Password' />").attr({name: this.name, value: this.value}).insertBefore(this);
            }).remove();
        };

        if ($('.' + dataTab + ' input:password').is(':visible')) {
            showPass();
            $('.lr-show-pw').addClass('lr-toggle');
        } else {
            hidePass();
            $('.lr-show-pw').removeClass('lr-toggle');
        }
    });
});
