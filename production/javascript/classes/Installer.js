define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Installer = /** @class */ (function () {
        function Installer() {
            alert("Run Installer");
            this.setupEvents();
        }
        Installer.prototype.setupEvents = function () {
            $("#installSubmit").on('click', this.submitInstallForm);
        };
        Installer.prototype.submitInstallForm = function () {
        };
        return Installer;
    }());
    exports.Installer = Installer;
});
//# sourceMappingURL=Installer.js.map