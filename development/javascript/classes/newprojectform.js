function NewProjectForm() {
    var error;

    if(document.querySelector( '#submitNewProject' ) != null) {
        var laddaSubmit = Ladda.create(document.querySelector('#submitNewProject'));
    }

    var checkFormErrors = function(){
        error = false;
        var title = $("input[name='add_project_title']");
        var category = $("select[name='add_project_category']");
        var description = $("textarea[name='add_project_description']");

        var title_value = trim(title.val());
        var category_value = category.val();
        var description_value = trim(description.val());

        if(title_value === ""){
            generateError(title, "Please create a title for this new project");
        }

        if(category_value === null){
            generateError(category, "Please select a category for this new project");
        }

        if(description_value === ""){
            generateError(description, "Please write a description for this new project");
        }

        if(error){
            $(".overlay_panel.add .error_message").velocity("transition.bounceIn", {duration:1000, delay:500});
            return;
        }

        laddaSubmit.start();
        $.post("/addproject", {"title":title_value, "category":category_value, "description": description_value}, function(json){
            laddaSubmit.stop();
            var json = JSON.parse(json);

            if(json.success && json.success === '1') {
                title.val("");
                category.val("");
                description.val("");

                grid.resetFilters();
                grid.addGridItem(json);

                $("#add_project_form").hide();
                $("#add_project_success_panel").velocity("fadeIn", {duration:400});
            }else{
                $("#add_project_php_error").html(json.message).show();
            }
        });

    };

    var clearErrors = function() {
        $("#login_php_error").html("");
        $("#loginForm .error_message").not("#login_php_error").remove();
    };

    var generateError = function($field, message){
        error = true;
        $field.addClass("error").after("<div class=\"error_message\">"+ message +"</div>");
    };

    this.setupEventListeners = function(){
        $("#submitNewProject").on('click', checkFormErrors);
    };


}