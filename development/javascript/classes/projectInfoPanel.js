function ProjectInfoPanel(){
    var CLASS = this;
    var projectOpen = false;

    this.openProject = function(project_id){
        $.post("/getproject", {project_id:project_id}, function(json) {
            json = JSON.parse(json);

            if (projectOpen) {
                CLASS.closeProject();
            }

            $(".info_panel .no_project").addClass("off");
            $(".info_panel .thumbnail").attr("style", "background-image: url(\"images/updates/"+ json.image +"\"); background-size: cover;");
            $(".info_panel .project_name").html(json.title);
            $(".info_panel .time_spent").html(grid.convertTimeSpent(json.time));
            $(".info_panel .last_updated").html(json.laststarted);
            $(".info_panel .project_description").html(json.description);

            // TODO: Get Project TODO List..

            // TODO:: Get Project Journal Thumbnails..

            // TODO:: Get Project Stats..


            $(".info_panel .project_selected").removeClass("off");
        });
    };

    this.closeProject = function(){

    }
}