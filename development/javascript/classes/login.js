// UserLogin Class..

function UserLogin() {
    var error = false;
    var laddaLogo;
    var setupEvents = function() {
        $("#loginSubmit").on('click', submitLoginForm);
        laddaLogo = Ladda.create( document.querySelector( '.login_logo' ) );
    };

    var loadLaddaAnimation = function(){
        $('.login_logo').addClass("user");
        $('.login_logo .cover').addClass("on");
        laddaLogo.start();
    };

    var checkLoginForm = function() {
        error = false;
        var admin_user = $("input[name='username']");
        var admin_pass = $("input[name='password']");
        var admin_user_value = trim(admin_user.val());
        var admin_pass_value = trim(admin_pass.val());

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

        if(error){
            $("#loginShakeWrapper").velocity("callout.shake", 500);
            $('.login_logo').removeClass("user");
            $('.login_logo .cover').removeClass("on");
            laddaLogo.stop();
            $(".error_message").velocity("transition.bounceIn", {duration:1000, delay:500});
            return;
        }

        $.post("/loginsubmit", db_form_values, function(json_return){
            if(json_return && json_return.success === 1){
                $("#loginForm input").velocity("transition.bounceUpOut", {duration:1500, stagger:100, complete: function(){
                    $('.login_logo .cover').removeClass("on");
                    $('.login_logo').css({"background-image": "url('images/users/"+ admin_user_value +".webp')", "background-size": "cover"});
                    laddaLogo.stop();
                    setTimeout(function(){window.location.reload();}, 2000);
                }});

            }else{
                $("#install_php_error").html(json_return.error);
                $("#loginShakeWrapper").velocity("callout.shake", 500);
                $('.login_logo').removeClass("user");
                laddaLogo.start();
            }
        });
    };

    var trim = function(val) {
        if (val !== undefined){
            return val.toString();
        }
    };

    var clearErrors = function() {
        $("#loginForm .error_message").not("#login_php_error").remove();
    };

    var generateError = function($field, message) {
        error = true;
        $field.addClass("error").after("<div class=\"error_message\">"+ message +"</div>");
    };

    var submitLoginForm = function(){
        clearErrors();
        loadLaddaAnimation();
        setTimeout(checkLoginForm, 1000);
    };

    setupEvents();
    console.log("Run UserLogin v15");
}

