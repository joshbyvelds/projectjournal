function Timeline() {
    var CLASS = this;

    this.setupEventListeners = function(){
        $(".menu_item.timeline").on('click', buildTimeline);
    };

    var buildTimeline = function(){
        // TODO:: Add weeks to .chart-values list. the first week should be the the day the first project got a update.

        // TODO:: Add Project rows to .chart-bars

        // TODO: Add time worked sequences for each project.

        // NOTE: when a project was not been worked on for at least a week.. that is when a sequence ends. to check this, for each journal entry, check if the next one is from within the last 7 days.

    };
}