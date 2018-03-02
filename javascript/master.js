var ProjectSaver = (function () {
    function ProjectSaver() {
        var _this = this;
        this.savelock = false;
        this.title = $("#new_project_title");
        this.category = $("#selected_category");
        this.description = $("#new_project_description");
        $(document).ready(function () { _this.init(); });
    }
    ProjectSaver.prototype.save = function () {
        var _this = this;
        if (this.validate() && !this.savelock) {
            $.post("php/saveproject.php", { "title": $.trim(this.title.html()), "category": $.trim(this.category.html()), "description": $.trim(this.description.html()) }, function (json_return) {
                json_return = JSON.parse(json_return);
                if (json_return.error) {
                    alert(json_return.error_message);
                    return;
                }
                if (json_return.success) {
                    if ($(".project").last().hasClass("odd")) {
                        $(".projects").append('<div class="row project even ' + _this.category.html().toLowerCase().replace(" ", "_") + '"><div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + _this.title.html() + '</h3>\n' +
                            '                        <h4>' + _this.category.html() + '</h4>\n' +
                            '                        <h5>00:00:00</h5>\n' +
                            '                        <p>' + _this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div>\n' +
                            '                    <div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div></div>\n' +
                            '                ');
                    }
                    else {
                        $(".projects").append('' +
                            '                    <div class="row project odd' + _this.category.html().toLowerCase().replace(" ", "_") + '"><div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div>\n' +
                            '<div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + _this.title.html() + '</h3>\n' +
                            '                        <h4>' + _this.category.html() + '</h4>\n' +
                            '                        <h5>00:00:00</h5>\n' +
                            '                        <p>' + _this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div></div>\n' +
                            '                ');
                    }
                    _this.reset();
                }
            });
        }
    };
    ProjectSaver.prototype.validate = function () {
        var _this = this;
        var isValid = true;
        if ($.trim(this.title.html()) === "" || $.trim(this.title.html()) === "New Project" || $.trim(this.title.html()) === "Please give the new project a title.") {
            this.title.addClass("error").html("Please give the new project a title.").one("focus", function () { _this.title.removeClass("error").html(""); });
            isValid = false;
        }
        if ($.trim(this.category.html()) === "Please select" || $.trim(this.category.html()) === "Category") {
            this.category.addClass("error");
            isValid = false;
        }
        if ($.trim(this.description.html()) === "" || $.trim(this.description.html()) === "Project description goes here.." || $.trim(this.description.html()) === "Please give the new project a description.") {
            this.description.addClass("error").html("Please give the new project a description.").one("focus", function () { _this.description.removeClass("error").html(""); });
            isValid = false;
        }
        return isValid;
    };
    ProjectSaver.prototype.reset = function () {
        this.title.html("New Project");
        this.category.html("Category");
        this.description.html("Project description goes here..");
    };
    ProjectSaver.prototype.openDropdown = function () {
        $("#category_select .options").slideDown(500);
        $("#category_select .option").off().on('click', function () {
            $("#selected_category").html($(this).html()).removeClass("error");
            $("#category_select .options").slideUp(500);
        });
    };
    ProjectSaver.prototype.init = function () {
        var _this = this;
        $("#save_new_project_btn").off().on("click", function () { _this.save(); });
        $("#selected_category").on("click", function () { _this.openDropdown(); });
    };
    return ProjectSaver;
}());
var CategorySelector = (function () {
    function CategorySelector() {
        var _this = this;
        this.selectedCategory = "";
        $(document).ready(function () { _this.init(); });
    }
    CategorySelector.prototype.init = function () {
        var _this = this;
        $(".category-btn").off().on("click", function (event) {
            var $btn = $(event.target);
            $(".project").not(".new").fadeOut().removeClass("shown");
            if ($btn.hasClass("blue-gradient")) {
                _this.selectedCategory = "";
                $(".category-btn.blue-gradient").addClass("btn-outline-info").removeClass("blue-gradient");
                $(".project").fadeIn();
                _this.resetOrder();
            }
            else {
                _this.selectedCategory = $btn.text().toLowerCase().replace(' ', '_');
                $(".category-btn.blue-gradient").addClass("btn-outline-info").removeClass("blue-gradient");
                $btn.removeClass("btn-outline-info").addClass("blue-gradient");
                $("." + _this.selectedCategory).addClass("shown").fadeIn();
                _this.sortOrder();
            }
        });
    };
    CategorySelector.prototype.sortOrder = function () {
        $(".shown").each(function (index, element) {
            if (index % 2 === 0) {
                $(element).find('.image-col').appendTo(element);
            }
            else {
                $(element).find('.image-col').prependTo(element);
            }
        });
    };
    CategorySelector.prototype.resetOrder = function () {
        $(".project").not(".new").each(function (index, element) {
            if (index % 2 === 0) {
                $(element).find('.image-col').appendTo(element);
            }
            else {
                $(element).find('.image-col').prependTo(element);
            }
        });
    };
    return CategorySelector;
}());
var projectSaver = new ProjectSaver();
var categorySelector = new CategorySelector();
//# sourceMappingURL=master.js.map