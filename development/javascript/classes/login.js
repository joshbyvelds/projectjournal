// UserLogin Class..

function UserLogin() {

    var setupEvents = function() {
        $("#loginSubmit").on('click', submitLoginForm);
    };

    var submitLoginForm = function() {
        alert("Test");
        var admin_user = $("input[name='username']");
        var admin_pass = $("input[name='password']");
        var admin_user_value = trim(admin_user.val());
        var admin_pass_value = trim(admin_pass.val());

        // Clear errors then validate form..
        clearErrors();

        if(admin_user_value.length === 0) {
            generateError(admin_user, "Please enter the username for account.");
        }

        if(admin_pass_value.length === 0) {
            generateError(admin_pass, "Please enter the password for your account.");
        }

        // Submit to Database..
        var db_form_values = {
            "username":admin_user_value,
            "password":admin_pass_value
        };

        $.post("/loginsubmit", db_form_values, function(json_return){
            if(json_return && json_return.success === 1){
                window.location.reload();
            }else{
                $("#install_php_error").html(json_return.error);
            }
        });
    };

    var trim = function(val) {
        if (val !== undefined){
            return val.toString();
        }
    };

    var clearErrors = function() {
        $("#UserLoginForm .error").not("#login_php_error").remove();
    };

    var generateError = function($field, message) {
        $field.addClass("error").after("<div class=\"error\">"+ message +"</div>");
    };

    setupEvents();
    console.log("Run UserLogin");
}