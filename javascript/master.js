var ProjectSaver = (function () {
    function ProjectSaver() {
        var _this = this;
        this.savelock = false;
        $(document).ready(function () { _this.init(); });
    }
    ProjectSaver.prototype.save = function () {
        if (this.validate() && !this.savelock) {
            alert("Save To DB!");
        }
    };
    ProjectSaver.prototype.validate = function () {
        var isValid = true;
        var title = $("#new_project_title");
        var category = $("#new_project_category");
        var description = $("#new_project_description");
        if ($.trim(title.html()) === "") {
            alert("Error Title");
            isValid = false;
        }
        if (category.val() === "void") {
            alert("Error Category");
            isValid = false;
        }
        if ($.trim(description.html()) === "") {
            alert("Error Description");
            isValid = false;
        }
        return isValid;
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