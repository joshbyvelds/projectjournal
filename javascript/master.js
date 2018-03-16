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
                    var category_dropdown = $('<div>').append($(".project_category").first().clone()).remove().html();
                    $(category_dropdown).find(".selected").html(_this.category.html());
                    if ($(".project").last().hasClass("odd")) {
                        $(".projects").append('<div class="row project even ' + _this.category.html().toLowerCase().replace(" ", "_") + '" data-id="' + json_return.lastId + '" data-seconds="0" data-minutes="0" data-hours="0"><div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + _this.title.html() + '</h3>\n' + category_dropdown +
                            '                        <h5>00:00:00</h5>\n' +
                            '                        <p>' + _this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-primary edit-save-btn" style="display:none;">Save <i class="far fa-save"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div>\n' +
                            '                    <div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div></div>\n' +
                            '                ');
                    }
                    else {
                        $(".projects").append('' +
                            '                    <div class="row project odd ' + _this.category.html().toLowerCase().replace(" ", "_") + '" data-id="' + json_return.lastId + '" data-seconds="0" data-minutes="0" data-hours="0"><div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div>\n' +
                            '<div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + _this.title.html() + '</h3>\n' + category_dropdown +
                            '                        <h5>00:00:00</h5>\n' +
                            '                        <p>' + _this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-primary edit-save-btn" style="display:none;">Save <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div></div>\n' +
                            '                ');
                    }
                    _this.reset();
                    $(".projects").not(".new").find(".fake_dropdown").addClass("locked");
                    $(".project").not(".new").each(function (index, element) {
                        if (index % 2 === 0) {
                            $(element).find('.image-col').appendTo(element);
                        }
                        else {
                            $(element).find('.image-col').prependTo(element);
                        }
                    });
                    $(".category-btn.selected_category").removeClass("selected_category blue-gradient").trigger("click");
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
                $(".category-btn.blue-gradient").addClass("btn-outline-info").removeClass("blue-gradient").removeClass("selected_category");
                $(".project").fadeIn();
                _this.resetOrder();
            }
            else {
                _this.selectedCategory = $btn.text().toLowerCase().replace(' ', '_');
                $(".category-btn.blue-gradient").addClass("btn-outline-info").removeClass("blue-gradient").removeClass("selected_category");
                $btn.removeClass("btn-outline-info").addClass("blue-gradient selected_category");
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
var ProjectEditor = (function () {
    function ProjectEditor() {
        var _this = this;
        $(document).ready(function () {
            _this.init();
        });
    }
    ProjectEditor.prototype.resetEdit = function () {
        $(".edit h3, .edit p").removeAttr("contenteditable");
        $(".edit .fake_dropdown").addClass("locked");
        $(".edit .edit-save-btn").hide();
        $(".edit .edit-btn").show();
        $(".edit").removeClass("edit");
    };
    ProjectEditor.prototype.editProject = function (project) {
        var _this = this;
        this.resetEdit();
        this.selectedProject = $(project).parent().parent();
        this.selectedProject.addClass("edit");
        $(".edit h3, .edit p").attr("contenteditable", "true");
        $(".edit .fake_dropdown").removeClass("locked");
        $(".edit .fake_dropdown .selected").on("click", function () { _this.openDropdown(); });
        $(".edit .edit-save-btn").show();
        $(".edit .edit-btn").hide();
    };
    ProjectEditor.prototype.openDropdown = function () {
        $(".edit .options").slideDown(500);
        $(".edit .option").off().on('click', function () {
            $(".edit .selected").html($(this).html()).removeClass("error");
            $(".edit .options").slideUp(500);
        });
    };
    ProjectEditor.prototype.validate = function () {
        var isValid = true;
        var title = this.selectedProject.find("h3");
        var category = this.selectedProject.find("h4.selected");
        var description = this.selectedProject.find("p");
        if ($.trim(title.html()) === "" || $.trim(title.html()) === "Please give the project a title.") {
            title.addClass("error").html("Please give the project a title.").one("focus", function () { title.removeClass("error").html(""); });
            isValid = false;
        }
        if ($.trim(category.html()) === "Please select" || $.trim(category.html()) === "Category") {
            category.addClass("error");
            isValid = false;
        }
        if ($.trim(description.html()) === "" || $.trim(description.html()) === "Project description goes here.." || $.trim(description.html()) === "Please give the project a description.") {
            description.addClass("error").html("Please give the project a description.").one("focus", function () { description.removeClass("error").html(""); });
            isValid = false;
        }
        return isValid;
    };
    ProjectEditor.prototype.save = function () {
        var _this = this;
        var title = this.selectedProject.find("h3").html();
        var category = this.selectedProject.find("h4.selected").html();
        var description = this.selectedProject.find("p").html();
        var id = this.selectedProject.data("id");
        if (!this.validate())
            return;
        $.post("php/editproject", { 'id': id, 'title': title, 'category': category, 'description': description }, function (json_return) {
            json_return = JSON.parse(json_return);
            if (json_return.success) {
                if (_this.selectedProject.hasClass("even")) {
                    _this.selectedProject.attr("class", "row project even " + category.toLowerCase().replace(' ', '_'));
                }
                else {
                    _this.selectedProject.attr("class", "row project odd " + category.toLowerCase().replace(' ', '_'));
                }
                _this.resetEdit();
                $(".category-btn.selected_category").removeClass("selected_category blue-gradient").trigger("click");
            }
            else {
                console.error(json_return.error_message);
            }
        });
    };
    ProjectEditor.prototype.init = function () {
        var _this = this;
        $(".project .edit-btn").off().on('click', function (e) { _this.editProject(e.target); });
        $(".project .edit-save-btn").off().on('click', function (e) { _this.save(); });
    };
    return ProjectEditor;
}());
var ProjectDeleter = (function () {
    function ProjectDeleter() {
        var _this = this;
        $(document).ready(function () {
            _this.init();
        });
    }
    ProjectDeleter.prototype["delete"] = function () {
        var _this = this;
        var id = this.selectedProject.data("id");
        $.post("php/deleteproject.php", { "project_id": id }, function (json_return) {
            json_return = JSON.parse(json_return);
            if (json_return.success) {
                _this.selectedProject.remove();
                _this.cancel();
                $(".project").not(".new").each(function (index, element) {
                    if (index % 2 === 0) {
                        $(element).find('.image-col').appendTo(element);
                    }
                    else {
                        $(element).find('.image-col').prependTo(element);
                    }
                });
                $(".category-btn.selected_category").removeClass("selected_category blue-gradient").trigger("click");
            }
            else {
                console.error(json_return.error_message);
            }
        });
    };
    ProjectDeleter.prototype.cancel = function () {
        $("#overlay, #delete_warning_box").fadeOut();
        $("#delete_confirm_btn").off();
        $("#delete_cancel_btn").off();
        this.selectedProject = null;
    };
    ProjectDeleter.prototype.deleteProject = function ($project) {
        var _this = this;
        this.selectedProject = $($project).parent().parent();
        $("#overlay, #delete_warning_box").fadeIn();
        $("#delete_confirm_btn").off().on("click", function () { _this["delete"](); });
        $("#delete_cancel_btn").off().on("click", function () { _this.cancel(); });
    };
    ProjectDeleter.prototype.init = function () {
        var _this = this;
        $(".project .delete-btn").off().on('click', function (e) { _this.deleteProject(e.target); });
    };
    return ProjectDeleter;
}());
var ProjectTimeTracker = (function () {
    function ProjectTimeTracker() {
        var _this = this;
        $(document).ready(function () {
            _this.init();
        });
    }
    ProjectTimeTracker.prototype.start = function ($startBtn) {
        var _this = this;
        this.selectedProject = $($startBtn).parent().parent();
        $(".current_odometer").removeClass("current_odometer");
        this.selectedProject.find("h5").addClass("current_odometer");
        var el = document.querySelector('.current_odometer');
        this.currentOdometer = new Odometer({
            el: el,
            value: '0',
            duration: 800,
            format: 'ddd:dd:dd',
            theme: 'minimal'
        });
        var odimeterTimeInterval = setInterval(function () {
            var seconds = (parseInt(_this.selectedProject.data("seconds")) + 1).toString();
            var hms = _this.secondsToHms(50);
            _this.selectedProject.data("seconds", seconds);
            _this.currentOdometer.update(hms);
        }, 1000);
        this.selectedProject.find(".stop-btn").show();
        this.selectedProject.find(".start-btn").hide();
    };
    ProjectTimeTracker.prototype.secondsToHms = function (d) {
        console.log(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        console.log("HH:MM:SS = " + ('0' + h).slice(-2) + ('0' + m).slice(-2) + ('0' + s).slice(-2));
        return ('0' + h).slice(-2) + ('0' + m).slice(-2) + ('0' + s).slice(-2);
    };
    ProjectTimeTracker.prototype.init = function () {
        var _this = this;
        $(".start-btn").off().on('click', function (e) { _this.start(e.target); });
    };
    return ProjectTimeTracker;
}());
var projectSaver = new ProjectSaver();
var categorySelector = new CategorySelector();
var projectEditor = new ProjectEditor();
var projectDeleter = new ProjectDeleter();
var projectTimeTracker = new ProjectTimeTracker();
//# sourceMappingURL=master.js.map