define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Installer = /** @class */ (function () {
        function Installer() {
            console.log("Run Installer");
            this.setupEvents();
        }
        Installer.prototype.setupEvents = function () {
            $("#installSubmit").on('click', this.submitInstallForm);
        };
        Installer.prototype.submitInstallForm = function () {
            var db_host = $("input[name='database_host']");
            var db_name = $("input[name='database_name']");
            var db_user = $("input[name='database_user']");
            var db_pass = $("input[name='database_password']");
            var create_db = $("input[name='create_database']");
            var admin_user = $("input[name='admin_username']");
            var admin_pass = $("input[name='admin_password']");
            var db_host_value = Installer.trim(db_host.val());
            var db_name_value = Installer.trim(db_name.val());
            var db_user_value = Installer.trim(db_user.val());
            var db_pass_value = Installer.trim(db_pass.val());
            var admin_user_value = Installer.trim(admin_user.val());
            var admin_pass_value = Installer.trim(admin_pass.val());
            // Clear errors then validate form..
            Installer.clearErrors();
            if (db_host_value.length === 0) {
                Installer.generateError(db_host, "Please enter the name of the host you will be using.");
            }
            if (db_name_value.length === 0) {
                Installer.generateError(db_name, "Please enter the name of the database you will be using.");
            }
            if (db_user_value.length === 0) {
                Installer.generateError(db_user, "Please enter the user name for database.");
            }
            if (db_pass_value.length === 0) {
                Installer.generateError(db_pass, "Please enter the password for the username above.");
            }
            if (admin_user_value.length === 0) {
                Installer.generateError(admin_user, "Please create a user name for the admin account.");
            }
            if (admin_pass_value.length === 0) {
                Installer.generateError(admin_pass, "Please create a password for the admin account.");
            }
            // Submit to Database..
            var db_form_values = {
                "db_host": db_host_value,
                "db_name": db_name_value,
                "db_user": db_user_value,
                "db_pass": db_pass_value,
                "create_db": create_db.is(":checked"),
                "admin_user": admin_user_value,
                "admin_pass": admin_pass_value
            };
            $.post("/installsubmit", db_form_values, function (json_return) {
                if (json_return && json_return.success === 1) {
                    window.location.reload();
                }
                else {
                    $("#install_php_error").html(json_return.error);
                }
            });
        };
        Installer.trim = function (val) {
            if (val !== undefined) {
                return val.toString();
            }
        };
        Installer.clearErrors = function () {
            $("#installerForm .error").not("#install_php_error").remove();
        };
        Installer.generateError = function ($field, message) {
            $field.addClass("error").after("<div class=\"error\">" + message + "</div>");
        };
        return Installer;
    }());
    exports.Installer = Installer;
});
//# sourceMappingURL=Installer.js.map