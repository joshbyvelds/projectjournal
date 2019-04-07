import * as $ from 'jquery';

export class UserLogin {

    constructor() {
        console.log("Run UserLogin");
        this.setupEvents();
    }

    private setupEvents() {
        $("#loginSubmit").on('click', this.submitLoginForm);
    }

    private submitLoginForm() {
        var admin_user: JQuery = $("input[name='username']");
        var admin_pass: JQuery = $("input[name='password']");
        var admin_user_value = UserLogin.trim(admin_user.val());
        var admin_pass_value = UserLogin.trim(admin_pass.val());

        // Clear errors then validate form..
        UserLogin.clearErrors();

        if(admin_user_value.length === 0) {
            UserLogin.generateError(admin_user, "Please enter the username for account.");
        }

        if(admin_pass_value.length === 0) {
            UserLogin.generateError(admin_pass, "Please enter the password for your account.");
        }

        // Submit to Database..
        let db_form_values = {
            "username":admin_user_value,
            "password":admin_pass_value
        };

        $.post("/loginsubmit", db_form_values, (json_return) => {
            if(json_return && json_return.success === 1){
                window.location.reload();
            }else{
                $("#install_php_error").html(json_return.error);
            }
        });
    }

    private static trim(val) {
        if (val !== undefined){
            return val.toString();
        }
    }

    private static clearErrors() {
        $("#UserLoginForm .error").not("#login_php_error").remove();
    }

    private static generateError($field: JQuery, message: string) {
        $field.addClass("error").after("<div class=\"error\">"+ message +"</div>");
    }

}