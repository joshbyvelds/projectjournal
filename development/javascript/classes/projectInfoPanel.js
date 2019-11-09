function ProjectInfoPanel(){
    var CLASS = this;
    var projectOpen = false;
    var openProjectId = null;
    var timerTimeout = null;
    var openProjectTime = null;

    this.setupEventListeners = function(){
        $("#project_timer_start_button").off().on('click', function(){$("#project_timer_start_button").hide(); $("#project_timer_stop_button").show(); CLASS.startProjectTimer();});
        $("#project_timer_stop_button").off().on('click', CLASS.stopProjectTimer);
        $(".open_close_btn").off().on("click", function(){openCloseSection($(this));});
    };

    this.killEventListeners = function(){
        $("#project_timer_start_button").off();
        $("#project_timer_stop_button").off();
    };

    var openCloseSection = function($btn){
        var $parent = $btn.parent().parent();
        if($parent.hasClass("closed")){
            $parent.removeClass("closed");
            $btn.find("i").removeClass("fa-folder").addClass("fa-folder-open");
        }else{
            $parent.addClass("closed");
            $btn.find("i").removeClass("fa-folder-open").addClass("fa-folder");
        }
    };

    this.getOpenProjectId = function(){
        return openProjectId;
    };

    this.getOpenProjectTime = function(){
        return openProjectTime;
    };

    this.openProject = function(project_id){
        $.post("/getproject", {project_id:project_id}, function(json) {
            json = JSON.parse(json);

            if (projectOpen) {
                CLASS.closeProject();
            }

            openProjectId = project_id;
            openProjectTime = json.time;

            $(".info_panel .no_project").addClass("off");
            $(".info_panel .thumbnail").attr("style", "background-image: url(\"images/updates/"+ json.image +"\"); background-size: cover;");
            $(".info_panel .project_name").html(json.title);
            $(".info_panel .time_spent").html(grid.convertTimeSpent(json.time)).attr("data-seconds", json.time);
            $(".info_panel .last_updated").html(json.laststarted);
            $(".info_panel .project_description").html(json.description);

            // Get Title for delete panel..
            $("#delete_check_name").html(json.title);

            // TODO: Get Project TODO List..

            // Get Project Journal Thumbnails..
            $("#project_info_updates").empty();
            json.entries.forEach(function(entry){
                if(entry.type === "image"){
                    $("#project_info_updates").append("<img class=\"image\" src=\"images/updates/"+ entry.file +"\" title=\""+ entry.title +"\">");
                }

                if(entry.type === "audio"){
                    $("#project_info_updates").append("<div class=\"audio\"><audio src=\"audio/updates/"+ entry.file +"\" type=\"audio/mpeg\" controls></audio></div>");
                }

                if(entry.type === "word_count"){
                    $("#project_info_updates").append("<div class=\"wc\"><span>" + entry.words + "</span></div>");
                }

            });

            // TODO:: Get Project Stats..


            $(".info_panel .project_selected").removeClass("off");
            CLASS.setupEventListeners();
        });
    };

    this.startProjectTimer = function(){
        timerTimeout = setTimeout(function(){
            var $time =  $(".info_panel .time_spent");
            var time = parseInt($time.attr("data-seconds")) + 1;
            $time.html(grid.convertTimeSpent(time)).attr("data-seconds", time);

            if(time % 60 === 0){
                CLASS.updateProjectTime(time);
            }

            openProjectTime = time;

            CLASS.startProjectTimer();
        }, 1000);
    };

    this.stopProjectTimer = function(){
        var $pi_time_spent = $(".info_panel .time_spent");
        clearTimeout(timerTimeout);
        CLASS.updateProjectTime(parseInt($pi_time_spent.attr("data-seconds")));
        $('.grid_item[data-id="'+ openProjectId +'"] .time_spent').html(grid.convertTimeSpent(parseInt($pi_time_spent.attr("data-seconds"))));
        $("#project_timer_start_button").show();
        $("#project_timer_stop_button").hide();
    };

    this.updateProjectTime = function(time){
        $.post("/updateprojecttime", {project:openProjectId, time:time});
    };

    this.closeProject = function(){
        CLASS.killEventListeners();
    }
}