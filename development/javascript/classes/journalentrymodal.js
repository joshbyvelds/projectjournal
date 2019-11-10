function JournalEntryModal(){
    var CLASS = this;
    var openedUpdate = null;

    this.setupEventListeners = function(){
        $(".journal_thumbnail").on('click', function(){openedUpdate = $(this).attr('data-id'); getJournalEntry(); });
    };

    var getJournalEntry = function(){
        $.post("/journalentry", {'entry_id': openedUpdate}, function(json){
            json = JSON.parse(json);

            if(json.success === '1'){
                $(".overlay_panel.journal_update h2").html(json.title);
                $(".overlay_panel.journal_update .date").html(json.date);
                $(".overlay_panel.journal_update .time").html(grid.convertTimeSpent(json.time));
                $(".overlay_panel.journal_update p").html(json.description);
                $(".overlay_panel.journal_update .media").empty().attr("class", "media");

                if (json.type === "image") {
                    $(".overlay_panel.journal_update .media").append("<img src=\"images/updates/"+ json.file +"\">");
                }

                if (json.type === "audio") {
                    $(".overlay_panel.journal_update .media").addClass("audio").append("<audio src=\"audio/updates/"+ json.file +"\" type=\"audio/mpeg\" controls></audio>");
                }

                if (json.type === "word_count") {

                }
            }
        });
    }


}