function DeleteProjectModal(){
    var CLASS = this;

    this.setupEventListeners = function(){
        $("#delete_check_yes").on("click", deleteProject);
        $("#delete_check_no").on("click", modal_system.closeOverlay)
    };

    var deleteProject = function(){
        $.post("/deleteproject", {project_id:project_info.getOpenProjectId()}, function(json){
            json = JSON.parse(json);

            if (json.success === '1'){
                grid.removeGridArrayItem(project_info.getOpenProjectId());
                $(".grid_item[data-id=\""+ project_info.getOpenProjectId() +"\"]").remove();
                $("#delete_message").hide();
                $("#deleteProjectSuccessPanel").show();
                $(".info_panel .project_selected").addClass("off");
                $(".info_panel .no_project").removeClass("off");
            }
        })
    }
}