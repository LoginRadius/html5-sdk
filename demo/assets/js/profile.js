var stringVariable = window.location.href;
domainName = stringVariable.substring(0, stringVariable.lastIndexOf('/'));
$(function () {
    handleChangePassword();

    createCustomObjects();
    getCustomObjects();
    updateCustomObjects();
    deleteCustomObjects();
});

function handleChangePassword() {
    $('#btn-user-changepassword').on('click', function () {
        $("#user-changepassword-errorMsg").text("");
        $("#user-changepassword-successMsg").text("");
        if ($('#user-changepassword-oldpassword').val().trim() == '' || $('#user-changepassword-newpassword').val().trim() == '') {
            $("#user-changepassword-errorMsg").text("The password field is required.");
            return;
        } else if ($('#user-changepassword-newpassword').val().trim().length < '6') {
            $("#user-changepassword-errorMsg").text("The New Password field must be at least 6 characters in length.");
            return;
        }
        $("#lr-loading").show();
        var accessToken = LoginRadiusSDK.getToken();
        LoginRadiusSDK.authenticationApi.changePassword(accessToken, $("#user-changepassword-newpassword").val(), $("#user-changepassword-oldpassword").val(), function(error, data){
            $("#lr-loading").hide();
            if (error) {
                $("#user-changepassword-errorMsg").text(error.Message);
                return;
            } 
            if (data) {
                $("#user-changepassword-oldpassword").val("");
                $("#user-changepassword-newpassword").val("");
                $("#user-changepassword-successMsg").text('Password has been changed');
            }
        });
    });
}

function createCustomObjects() {
    $('#btn-user-createcustomobj').on('click', function () {
        $("#user-createcustomobj-successMsg").text("");
        $("#user-createcustomobj-errorMsg").text("");
        var input = $("#user-createcustomobj-data").val();
        if ($('#user-createcustomobj-objectname').val().trim() == '') {
            $("#user-createcustomobj-errorMsg").text("The Object Name field is required.");
            return;
        } else if ($('#user-createcustomobj-data').val().trim() == '') {
            $("#user-createcustomobj-errorMsg").text("The Data field is required.");
            return;
        } else if (!IsJsonString(input)) {
            $("#user-createcustomobj-errorMsg").text("Invalid json in Data field.");
            return;
        }
      
        var accessToken = LoginRadiusSDK.getToken();
        var objectName = $("#user-createcustomobj-objectname").val();
        var payload = JSON.parse($("#user-createcustomobj-data").val());
        $("#lr-loading").show();
        LoginRadiusSDK.customObjectApi.createCustomObjectByToken(accessToken, objectName, payload, function(error, data){
            $("#lr-loading").hide();
            console.log(error);
            if (error) {
                $("#user-createcustomobj-errorMsg").html(error.Message);
                return;
            } 
            if (data) {
                $("#user-createcustomobj-objectname").val("");              
                $("#user-createcustomobj-data").val("");
                $("#user-createcustomobj-successMsg").text("Custom object created successfully.");
            }
        });
    });
}

function getCustomObjects() {
    $('#btn-user-getcustomobj').on('click', function () {
        $("#user-getcustomobj-errorMsg").text("");
        $("#user-getcustomobj-successMsg").text("");
        if ($("#user-getcustomobj-objectname").val().trim() == ''){
            $("#user-getcustomobj-errorMsg").text("The Object Name field is required.");
            return;
        }
        $("#lr-loading").show();
        var accessToken = LoginRadiusSDK.getToken();
        var objectName = $("#user-getcustomobj-objectname").val();
        LoginRadiusSDK.customObjectApi.getCustomObjectByToken(accessToken, objectName, function(error, response){
            
            $("#lr-loading").hide();
            $("#user-getcustomobj-errorMsg").text("");
            if (error) {
                $("#user-getcustomobj-errorMsg").text(error.Message);
                $('#customobj-table').html('');
                return;
            } 
            if (response) {
                $("#user-getcustomobj-objectname").val("");       
                
                $('#customobj-table').html('');
                $('#customobj-table').append('<tr><th>Object ID</th><th>Custom Object</th></tr>');
                for (var i = 0; i < response.data.length; i++) {
                    var id = response.data[i].Id;
                    var custobj = response.data[i].CustomObject;
                    $('#customobj-table').append('<tr><td>' + id + '</td><td>' + JSON.stringify(custobj) + '</td></tr>');
                }
            }
        })
    });
}

function updateCustomObjects() {
    $('#btn-user-updatecustomobj').on('click', function () {       
        $("#user-updatecustomobj-errorMsg").text("");
        $("#user-updatecustomobj-successMsg").text("");
        var input = $("#user-updatecustomobj-data").val();
        if ($('#user-updatecustomobj-objectname').val().trim() == '') {
            $("#user-updatecustomobj-errorMsg").text("The Object Name field is required.");
            return;
        } else if ($('#user-updatecustomobj-objectrecordid').val().trim() == '') {
            $("#user-updatecustomobj-errorMsg").text("The Object Record Id field is required.");
            return;
        }else if ($('#user-updatecustomobj-data').val().trim() == '') {
            $("#user-updatecustomobj-errorMsg").text("The Data field is required.");
            return;
        } else if (!IsJsonString(input)) {
            $("#user-updatecustomobj-errorMsg").text("Invalid json in Data field");
            return;
        }
        
        $("#lr-loading").show();
        var accessToken = LoginRadiusSDK.getToken();
        
        var objectName= $("#user-updatecustomobj-objectname").val()
        var objectRecordId = $("#user-updatecustomobj-objectrecordid").val();
        var payload = JSON.parse($("#user-updatecustomobj-data").val());
        var updateType = "";
        LoginRadiusSDK.customObjectApi.updateCustomObjectByToken(accessToken, objectName,
            objectRecordId, payload, updateType, function(error, data){
                $("#lr-loading").hide();
                if (error) {
                    $("#user-updatecustomobj-errorMsg").text(error.Message);
                    return;
                }
                if (data) { 
                    $("#user-updatecustomobj-objectname").val("");
                    $("#user-updatecustomobj-objectrecordid").val("");
                    $("#user-updatecustomobj-data").val("");
                    $("#user-updatecustomobj-successMsg").text("Custom object has been updated.");
                }
            });
    });
}

function deleteCustomObjects() {
    $('#btn-user-deletecustomobj').on('click', function () {
        $("#user-deletecustomobj-errorMsg").text(""); 
        $("#user-deletecustomobj-successMsg").text(""); 
        if ($('#user-deletecustomobj-objectname').val().trim() == '') {
            $("#user-deletecustomobj-errorMsg").text("The Object Name field is required.");
            return;
        } else if ($('#user-deletecustomobj-objectrecordid').val().trim() == '') {
            $("#user-deletecustomobj-errorMsg").text("The Object Record Id is required.");
            return;
        }
        
        $("#lr-loading").show();
        var accessToken = LoginRadiusSDK.getToken();
        var objectName = $('#user-deletecustomobj-objectname').val();
        var objectRecordId = $('#user-deletecustomobj-objectrecordid').val();
        LoginRadiusSDK.customObjectApi.deleteCustomObjectByToken(accessToken, objectName, objectRecordId, function(error, data){
            $("#lr-loading").hide();
            if (error) {
                $("#user-deletecustomobj-errorMsg").text(error.Message);
                return;
            }
            if (data) {
                $("#user-deletecustomobj-objectname").val("");   
                $("#user-deletecustomobj-objectrecordid").val("");   
                $("#user-deletecustomobj-successMsg").text("Custom object has been deleted");
            }
        })
    });
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}