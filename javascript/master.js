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
                        $(".projects").append('<div class="row project even ' + _this.category.html().toLowerCase().replace(" ", "_") + '" data-id="' + json_return.lastId + '" data-category="' + _this.category.html() + '" data-seconds="0" data-minutes="0" data-hours="0"><div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + _this.title.html() + '</h3>\n' + category_dropdown +
                            '                        <h5 id="time_' + json_return.lastId + '"><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span> </h5>\n' +
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
                            '                    <div class="row project odd ' + _this.category.html().toLowerCase().replace(" ", "_") + '" data-id="' + json_return.lastId + '" data-category="' + _this.category.html() + '" data-seconds="0" data-minutes="0" data-hours="0"><div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div>\n' +
                            '<div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + _this.title.html() + '</h3>\n' + category_dropdown +
                            '                        <h5 id="time_' + json_return.lastId + '"><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span></h5>\n' +
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
        this.stop($startBtn, false);
        this.selectedProject = $($startBtn).parent().parent();
        $(".current_odometer").removeClass("current_odometer");
        this.selectedProject.find("h5").addClass("current_odometer");
        this.seconds = this.selectedProject.data("seconds");
        this.minutes = this.selectedProject.data("minutes");
        this.hours = this.selectedProject.data("hours");
        var hoursElement = document.querySelector('.current_odometer .hours');
        this.hoursOdometer = new Odometer({
            el: hoursElement,
            value: this.hours,
            duration: 800,
            format: '',
            theme: 'minimal',
            numberLength: 2
        });
        var minutesElement = document.querySelector('.current_odometer .minutes');
        this.minutesOdometer = new Odometer({
            el: minutesElement,
            value: this.minutes,
            duration: 800,
            format: '',
            theme: 'minimal',
            numberLength: 2
        });
        var secondsElement = document.querySelector('.current_odometer .seconds');
        this.secondsOdometer = new Odometer({
            el: secondsElement,
            value: this.seconds,
            duration: 800,
            format: '',
            theme: 'minimal',
            numberLength: 2
        });
        this.timeInterval = setInterval(function () {
            _this.seconds++;
            if (_this.seconds > 59) {
                _this.seconds = 0;
                _this.minutes++;
                _this.minutesOdometer.update(_this.minutes);
                _this.selectedProject.data("minutes", _this.minutes);
                _this.selectedProject.data("seconds", _this.seconds);
                _this.saveTime(false);
            }
            if (_this.minutes > 59) {
                _this.minutes = 0;
                _this.hours++;
                _this.hoursOdometer.update(_this.hours);
                _this.selectedProject.data("hours", _this.hours);
            }
            _this.secondsOdometer.update(_this.seconds);
            _this.selectedProject.data("seconds", _this.seconds);
        }, 1000);
        this.selectedProject.find(".stop-btn").show();
        this.selectedProject.find(".start-btn").hide();
    };
    ProjectTimeTracker.prototype.stop = function ($stopBtn, stop) {
        clearInterval(this.timeInterval);
        if (this.selectedProject) {
            this.selectedProject.find(".start-btn").show();
            this.selectedProject.find(".stop-btn").hide();
            this.saveTime(stop);
        }
    };
    ProjectTimeTracker.prototype.saveTime = function (stop) {
        ;
        $.post("php/savetime", {
            "project": parseInt(this.selectedProject.data("id")),
            "seconds": parseInt(this.selectedProject.data("seconds")),
            "minutes": parseInt(this.selectedProject.data("minutes")),
            "hours": parseInt(this.selectedProject.data("hours")),
            "stop": stop
        }, function (json_return) {
            if (json_return && json_return.error_message) {
                console.error(json_return.error_message);
            }
        });
    };
    ProjectTimeTracker.prototype.init = function () {
        var _this = this;
        $(".start-btn").off().on('click', function (e) { _this.start(e.target); });
        $(".stop-btn").off().on('click', function (e) { _this.stop(e.target, true); });
    };
    return ProjectTimeTracker;
}());
var taskSaver = (function () {
    function taskSaver() {
        var _this = this;
        $(document).ready(function () {
            _this.init();
        });
    }
    taskSaver.prototype.saveNewTask = function () {
        var taskproject = $("#details_new_task_project_id").val();
        var taskname = $("#new_task_name").val();
        if (taskname.length === 0) {
            return;
        }
        if (taskproject.length === 0) {
            return;
        }
        $.post('php/savetask', { 'project': taskproject, 'taskname': taskname }, function (json_return) {
            json_return = JSON.parse(json_return);
        });
    };
    taskSaver.prototype.saveNewSubTask = function () {
        var taskproject = $("#details_new_subtask_project_id").val();
        var taskid = $("#subtask_task_id").val();
        var subtaskname = $("#new_sub_task_name").val();
        if (subtaskname.length === 0) {
            return;
        }
        $.post('php/savesubtask.php', { 'project': taskproject, 'task': taskid, 'subtask': subtaskname }, function (json_return) {
            json_return = JSON.parse(json_return);
        });
    };
    taskSaver.prototype.init = function () {
        var _this = this;
        $("#new_task_button").off().on('click', function () { _this.saveNewTask(); });
        $("#new_subtask_button").off().on('click', function () { _this.saveNewSubTask(); });
    };
    return taskSaver;
}());
var DetailsManager = (function () {
    function DetailsManager() {
        var _this = this;
        $(document).ready(function () {
            _this.init();
        });
    }
    DetailsManager.prototype.init = function () {
        var _this = this;
        $('.project_thumbnail').off().on('click', function (e) { _this.open(e.target); });
        $("#details_back_to_projects_btn").off().on('click', function () { _this.close(); });
        $("#update_submit_btn").off().on('click', function () { _this.saveUpdate(); });
    };
    DetailsManager.prototype.getUpdates = function () {
        $("#project_updates").empty();
        $.post("php/getupdates.php", { project: this.id }, function (json_return) {
            json_return = JSON.parse(json_return);
            if (json_return.success) {
                var count_1 = 0;
                json_return.updates.forEach(function (e) {
                    if (count_1 % 2 === 0) {
                        $("#project_updates").append('<div class="row"><div class="col-sm-12 col-md-6 image-col"><img src="assets/images/updates/' + e.image + '" class="img-fluid img-thumbnail z-depth-3 project_thumbnail" alt="zoom"></div> <div class="col-sm-12 col-md-6 title-col"><h3>' + e.title + '</h3><h4>' + e.date.replace() + '</h4><h5>' + e.time + '</h5><p>' + e.details + '</p></div></div>');
                    }
                    else {
                        $("#project_updates").append('<div class="row"><div class="col-sm-12 col-md-6 title-col"><h3>' + e.title + '</h3><h4>' + e.date + '</h4><h5>' + e.time + '</h5><p>' + e.details + '</p></div><div class="col-sm-12 col-md-6 image-col"><img src="assets/images/updates/' + e.image + '" class="img-fluid img-thumbnail z-depth-3 project_thumbnail" alt="zoom"></div>');
                    }
                    count_1++;
                });
            }
            else {
                if (json_return.error) {
                    alert(json_return.error_message);
                }
            }
        });
    };
    DetailsManager.prototype.saveUpdate = function () {
        var _this = this;
        var name = $.trim($("#update_title").val());
        var details = $.trim($("#update_textbox").val());
        var image = $.trim($("#update_image").val());
        var error_list = $(".details_error ul").empty();
        if (name.length === 0) {
            error_list.append("<li>Please enter a title for this update.</li>");
        }
        if (details.length === 0) {
            error_list.append("<li>Please enter a description for this update.</li>");
        }
        if (image.length === 0) {
            error_list.append("<li>Please select a image for this update.</li>");
        }
        $("#project_id_hidden").val(this.id);
        $("#project_time_hidden").val($('#time_' + this.id).find(".hours").text() + "|" + $('#time_' + this.id).find(".minutes").text() + "|" + $('#time_' + this.id).find(".seconds").text());
        $.ajax({
            url: "php/saveupdate.php",
            type: 'POST',
            data: new FormData($("#update_form")[0]),
            processData: false,
            contentType: false
        }).done(function (json_return) {
            json_return = JSON.parse(json_return);
            if (json_return.success) {
                $("#update_title").val("");
                $("#update_textbox").val("");
                $("#update_image").val("");
                $(".details_error ul").empty();
                _this.getUpdates();
            }
            else {
                if (json_return.error) {
                    $(".details_error ul").append("<li>" + json_return.error_message + "</li>");
                }
            }
        });
    };
    DetailsManager.prototype.getTasks = function () {
        var _this = this;
        $.post("php/gettasks.php", { 'project': this.id }, function (json_return) {
            json_return = JSON.parse(json_return);
            if (json_return.success) {
                if (json_return.tasks) {
                    $("#project_todo_list").empty();
                    $("#subtask_task_id option").not(".default").remove();
                    json_return.tasks.forEach(function (task) {
                        var subtasks_complete = 0;
                        var total_subtasks = task.subtasks.length;
                        var percent_complete;
                        var subtasks_html = "";
                        $("#subtask_task_id").append("<option value=\"" + task.id + "\">" + task.title + "</option>");
                        task.subtasks.forEach(function (subtask) {
                            var icon;
                            switch (parseInt(subtask.status)) {
                                case (0):
                                    icon = "<i class=\"far fa-times-circle not_started\"></i>";
                                    break;
                                case (1):
                                    icon = "<i class=\"far fa-play-circle in_progress\"></i>";
                                    break;
                                case (2):
                                    subtasks_complete += 1;
                                    icon = "<i class=\"far fa-check-circle completed\"></i>";
                                    break;
                            }
                            subtasks_html += "<li class=\"subtask\" data-id=\"" + subtask.id + "\" data-status=\"" + subtask.status + "\">" + subtask.title + " " + icon + "</li>";
                        });
                        percent_complete = (total_subtasks === 0) ? 0 : (subtasks_complete / total_subtasks) * 100;
                        $("#project_todo_list").append("<li class=\"task\">" + task.title + " <div class=\"progress\"><div class=\"progress-bar\" style=\"width:" + percent_complete + "%\">" + percent_complete + "%</div></div><ul>" + subtasks_html + "</ul></li>");
                    });
                    $(".subtask i").off().on("click", function (event) {
                        _this.updateSubTaskStatus($(event.currentTarget).parent().data("id"), $(event.currentTarget).parent().data("status"));
                    });
                }
            }
        });
    };
    DetailsManager.prototype.updateSubTaskStatus = function (id, status) {
        var _this = this;
        var $task;
        var icon;
        $.post("php/updateSubTaskStatus.php", { 'id': id, status: status }, function (json_return) {
            json_return = JSON.parse(json_return);
            if (json_return.success) {
                _this.getTasks();
            }
        });
    };
    DetailsManager.prototype.generateStats = function () {
        $.post("php/getprojectstats.php", { 'id': id }, function (json_return) {
            json_return = JSON.parse(json_return);
            if (json_return.success) {
            }
        });
        $("#projectStatsContainer").append("<h3>Project Updates Per Month</h3><canvas id=\"projectUpdatesChartCanvas\"></canvas>");
        $("#projectStatsContainer").append("<h3>Project Hours Per Month</h3><canvas id=\"projectHoursChartCanvas\"></canvas>");
        var projectUpdatesContext = document.getElementById("projectUpdatesChartCanvas").getContext('2d');
        var projectUpdatesChart = new Chart(projectUpdatesContext, {
            type: 'line',
            data: {
                labels: ["Jan 2018", "Feb 2018", "Mar 2018", "Apr 2018", "May 2018", "June 2018", "July 2018", "Aug 2018", "Sept 2018", "Oct 2018", "Nov 2018", "Dec 2018"],
                datasets: [
                    {
                        label: "Project Updates",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [10, 15, 1, 18, 23, 3, 7, 18, 7, 5, 9, 12]
                    },
                ]
            },
            options: {
                responsive: true
            }
        });
        var projectHoursContext = document.getElementById("projectHoursChartCanvas").getContext('2d');
        var projectHoursChart = new Chart(projectHoursContext, {
            type: 'line',
            data: {
                labels: ["Jan 2018", "Feb 2018", "Mar 2018", "Apr 2018", "May 2018", "June 2018", "July 2018", "Aug 2018", "Sept 2018", "Oct 2018", "Nov 2018", "Dec 2018"],
                datasets: [
                    {
                        label: "Project Hours",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [10, 15, 1, 18, 23, 3, 7, 19, 4, 10, 12, 3]
                    },
                ]
            },
            options: {
                responsive: true
            }
        });
    };
    DetailsManager.prototype.open = function ($thumbnail) {
        this.id = parseInt($($thumbnail).data('id'));
        $("#project_details").slideDown();
        $("#projects_wrapper").slideUp();
        window.scrollTo(0, 0);
        $("#details_new_task_project_id").val(this.id);
        $("#details_new_subtask_project_id").val(this.id);
        this.getUpdates();
        this.getTasks();
    };
    DetailsManager.prototype.close = function () {
        $("#project_details").slideUp();
        $("#projects_wrapper").slideDown();
        window.scrollTo(0, 0);
    };
    return DetailsManager;
}());
var AppManager = (function () {
    function AppManager() {
        var _this = this;
        $(document).ready(function () {
            _this.init();
        });
    }
    AppManager.prototype.headerClick = function () {
        $("#project_details").slideUp();
        $("#projects_wrapper").slideDown();
    };
    AppManager.prototype.init = function () {
        var _this = this;
        $('#site_header').off().on('click', function () { _this.headerClick(); });
    };
    return AppManager;
}());
var appManager = new AppManager();
var projectSaver = new ProjectSaver();
var categorySelector = new CategorySelector();
var projectEditor = new ProjectEditor();
var projectDeleter = new ProjectDeleter();
var projectTimeTracker = new ProjectTimeTracker();
var projectTaskSaver = new taskSaver();
var detailsManager = new DetailsManager();
//# sourceMappingURL=master.js.map