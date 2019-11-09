function AddJournalEntry() {
    var CLASS = this;
    var error;

    if(document.querySelector( '#updateSubmit' ) != null) {
        var laddaSubmit = Ladda.create(document.querySelector('#updateSubmit'));
    }

    this.setupEventListeners = function(){
        $("input[name=\"update_type\"]").on("change", selectType);
        $("#updateSubmit").on('click', submitUpdate);
    };

    var selectType = function(){
        var $type = $("input[name=\"update_type\"]:checked");
        clearErrors();
        if($type.val() === "word_count") {
            $("#journal_update_word_count_fields").show();
            $("#journal_update_file_field").hide();
        }else{
            $("#journal_update_file_field").show();
            $("#journal_update_word_count_fields").hide();
        }
    };

    var submitUpdate = function(){

        var $type = $("input[name=\"update_type\"]:checked");
        var $upload = $("input[name=\"entry_file\"]");
        var $title = $("input[name=\"update_title\"]");
        var $description = $("textarea[name=\"update_description\"]");
        var $wcpages = $("input[name=\"word_count_pages\"]");
        var $wcwords = $("input[name=\"word_count_words\"]");
        var $wccharacters = $("input[name=\"word_count_characters\"]");
        var $wcspaces = $("input[name=\"word_count_characters_excluding_spaces\"]");

        clearErrors();
        error = false;
        laddaSubmit.start();

        if ($type.val() === undefined){
           generateError($("#type_radio_error"), "Please select a Update Type");
            $(".overlay_panel.add_update .error_message").velocity("transition.bounceIn", {duration:1000, delay:500});
            laddaSubmit.stop();
            return;
        }

        if ($title.val() === ""){
            generateError($title, "Please enter a title for the journal update");
        }

        if ($description.val() === ""){
            generateError($description, "Please enter a description for the journal update");
        }

        if($type.val() !== "word_count") {
            if ($upload.val() === "") {
                generateError($upload, "Please select a file to upload");
            }
        }else {
            if ($wcpages.val() === "") {
                generateError($wcpages, "Please enter the amount of pages your novel has as of this update");
            }

            if ($wcwords.val() === "") {
                generateError($wcwords, "Please enter the amount of words your novel has as of this update");
            }

            if ($wccharacters.val() === "") {
                generateError($wccharacters, "Please enter the amount of characters your novel has as of this update");
            }

            if ($wcspaces.val() === "") {
                generateError($wcspaces, "Please enter the amount of characters not including spaces your novel has as of this update");
            }
        }

        if(error){
            $(".overlay_panel.add_update .error_message").velocity("transition.bounceIn", {duration:1000, delay:500});
            laddaSubmit.stop();
            return;
        }

        $("#update_project_id").val(project_info.getOpenProjectId());
        $("#update_project_time").val(project_info.getOpenProjectTime());

        $.ajax({
            url: "/addjournalentry",
            type: 'POST',
            data: new FormData($("#journal_update_form")[0]),
            processData: false,
            contentType: false,
        }).done(function(json)  {
            laddaSubmit.stop();
            json = JSON.parse(json);

            if (json.success === '1'){

                if ($type.val() === "image"){
                    $("#project_info_updates").append("<img class=\"image\" src=\"images/updates/"+ json.file +"\" title=\""+ $title.val() +"\">");
                }

                if ($type.val() === "audio"){
                    $("#project_info_updates").append("<div class=\"audio\"><audio src=\"audio/updates/"+ json.file +"\" type=\"audio/mpeg\" controls></audio></div>");
                }

                if ($type.val() === "word_count"){
                    $("#project_info_updates").append("<div class=\"wc\"><span>" + json.wc + "</span></div>");
                }

                $("#journal_update_form").hide();
                $("#journal_update_success_panel").velocity("fadeIn", {duration:400});
            }else{
                $("#journal_update_php_error").html(json.message).show();
            }
        });
    };

    var clearErrors = function() {
        $("#journal_update_php_error").html("");
        $("#journal_update_form .error_message").not("#journal_update_php_error").remove();
    };

    var generateError = function($field, message){
        error = true;
        $field.addClass("error").after("<div class=\"error_message\">"+ message +"</div>");
    };
}