var ProjectSaver = (function () {
    function ProjectSaver() {
        var _this = this;
        this.savelock = false;
        this.title = $("#new_project_title");
        this.category = $("#new_project_category");
        this.description = $("#new_project_description");
        $(document).ready(function () { _this.init(); });
    }
    ProjectSaver.prototype.save = function () {
        if (this.validate() && !this.savelock) {
            alert("Save To DB!");
        }
    };
    ProjectSaver.prototype.validate = function () {
        var _this = this;
        var isValid = true;
        if ($.trim(this.title.html()) === "") {
            this.title.addClass("error").html("Please give the new project a title.").one("focus", function () { _this.title.removeClass("error").html(""); });
            isValid = false;
        }
        if (this.category.val() === "void") {
            alert("Error Category");
            isValid = false;
        }
        if ($.trim(this.description.html()) === "") {
            this.description.addClass("error").html("Please give the new project a description.").one("focus", function () { _this.description.removeClass("error").html(""); });
            isValid = false;
        }
        return isValid;
    };
    ProjectSaver.prototype.clearError = function () {
    };
    ProjectSaver.prototype.reset = function () {
    };
    ProjectSaver.prototype.init = function () {
        var _this = this;
        $("#save_new_project_btn").off().on("click", function () { _this.save(); });
    };
    return ProjectSaver;
}());
var projectSaver = new ProjectSaver();
//# sourceMappingURL=master.js.map