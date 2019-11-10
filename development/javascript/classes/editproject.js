function EditProject(){
    var CLASS = this;
    var error;
    var laddaSubmit

    if(document.querySelector( '#submitNewProject' ) != null) {
        laddaSubmit = Ladda.create(document.querySelector('#editProjectSubmit'));
    }

    this.setupEventListeners = function(){
        $("#project_info_edit_button").on('click', fillEditProjectFields);
        $("#editProjectSubmit").off().on('click', submitProjectEdits);
    };

    var fillEditProjectFields = function(){
        var project = project_info.getOpenProjectId();
        $("input[name=\"edit_project_title\"]").val(grid.getGridArray()[project].title);
        $("select[name=\"edit_project_category\"]").val(grid.getGridArray()[project].category);
        $("textarea[name=\"edit_project_description\"]").val(grid.getGridArray()[project].description);
    };

    var submitProjectEdits = function(){
        var project_id = project_info.getOpenProjectId();
        var $title = $("input[name=\"edit_project_title\"]");
        var $category = $("select[name=\"edit_project_category\"]");
        var $description = $("textarea[name=\"edit_project_description\"]");

        clearErrors();

        if ($title.val() === "") {
            generateError($title, "Please fill in a new title for the project");
        }

        if ($description.val() === "") {
            generateError($description, "Please fill in a new description for the project");
        }

        if (error){
            $(".overlay_panel.edit_project .error_message").velocity("transition.bounceIn", {duration:1000, delay:500});
            return;
        }

        laddaSubmit.start();

        $.post("/editproject", {'project_id':project_id, 'title': $title.val(), 'category':$category.val(), 'description':$description.val()}, function(json){
            laddaSubmit.stop();
            json = JSON.parse(json);
            var gridItem;

            if (json.success === '1'){
                $('.grid_item[data-id="'+ project_id +'"] .name').html($title.val());
                $('.grid_item[data-id="'+ project_id +'"] .category_icon').attr('class', 'category_icon category_' + $category.val());
                gridItem = grid.getGridArray()[project_id];
                gridItem.title = $title.val();
                gridItem.category = $category.val();
                gridItem.description = $description.val();
                grid.editGridArrayItem(project_id, gridItem);
                $("#editProjectForm").hide();
                $("#editProjectSuccessPanel").velocity("fadeIn", {duration:400});
                $(".edit_project_edit_field").hide();
                clearErrors();
                CLASS.buildProjectList();
            }else{
                $("#edit_project_php_error").html(json.message).show();
            }
        });

        $project.val("");
    };

    var clearErrors = function() {
        $("#edit_project_php_error").html("");
        $("#editProjectForm .error_message").not("#edit_project_php_error").remove();
    };

    var generateError = function($field, message){
        error = true;
        $field.addClass("error").after("<div class=\"error_message\">"+ message +"</div>");
    };
}