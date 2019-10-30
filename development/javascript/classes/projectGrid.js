function ProjectGrid(){
    var CLASS = this;
    var gridArray = null;

    var clearGrid = function(){
        gridArray = [];
        $("#project_grid").empty();
    };

    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    this.resetFilters = function(){
        $("#sortBy, #filterStage, #filterCategory").val(0);
    };

    this.addGridItem = function(json){

        var griditem = "";
            griditem += '<div class="grid_item" data-id="'+ json.id +'">';
            griditem += '<div class="top">';
            griditem += '<div class="project_thumbnail" style=\'background-image: url("images/updates/project_not_started.webp");\'></div>';
            griditem += '<div class="top_text">';
            griditem += '<div class="name">'+ json.title +'</div>';
            griditem += '<div class="time_spent"><i class="far fa-clock"></i> <span>' + grid.convertTimeSpent(json.time) +'</span></div>';
            griditem += '</div>';
            griditem += '</div>';
            griditem += '<div class="bottom">';
            griditem += '<div class="last_updated"><i class="fas fa-calendar-alt"></i>' + grid.convertDate(json.laststarted) + '</div>';
            griditem += '<div class="category_icon category_'+ json.category +'"></div>';
            griditem += '</div>';
            griditem += '</div>';

        $("#project_grid").append(griditem);
    };

    this.convertDate = function(date){
        return date;
    };

    this.convertTimeSpent = function(seconds_left) {
        var seconds_left = parseInt(seconds_left);
        var hours = 0;
        var minutes = 0;
        var seconds;

        hours = Math.floor(seconds_left / (60 * 60));
        seconds_left = seconds_left % (60 * 60);

        minutes = Math.floor(seconds_left / 60);
        seconds_left = seconds_left % 60;

        hours = (hours <= 9) ? "0" + hours : hours;
        minutes = (minutes <= 9) ? "0" + minutes : minutes;
        seconds = (seconds_left <= 9) ? "0" + seconds_left : seconds_left;

        return hours + ":" + minutes + ":" + seconds;
    };

    this.openProject = function($project) {
        var project_id = $project.data("id");
        $(".grid_item").removeClass("selected");
        $project.addClass("selected");
    };

    this.filtersort = function(){
        var sort = {};
        var filterCategory = $("#filterCategory").val();
        var filterStatus = $("#filterStage").val();


        switch($("#sortBy").val()){
            case("1"):
                sort = {sort:'id', dir:'DESC'};
                break;

            case("2"):
                sort = {sort:'id', dir:'ASC'};
                break;

            case("3"):
                sort = {sort:'laststarted', dir:'DESC'};
                break;

            case("4"):
                sort = {sort:'laststarted', dir:'ASC'};
                break;

            case("5"):
                sort = {sort:'title', dir:'DESC'};
                break;

            case("6"):
                sort = {sort:'title', dir:'ASC'};
                break;

            case("7"):
                sort = {sort:'category', dir:'DESC'};
                break;

            case("8"):
                sort = {sort:'category', dir:'ASC'};
                break;

            case("9"):
                sort = {sort:'status', dir:'DESC'};
                break;

            case("10"):
                sort = {sort:'status', dir:'ASC'};
                break;
        }


        $.post("/getprojects", sort, function(json){
            json = JSON.parse(json);
            clearGrid();

            json.forEach(function(element){
                gridArray.push(element);

                if((filterCategory === "0" || filterCategory === element.category.toString()) && (filterStatus === "0" || filterStatus === element.status.toString())) {
                    console.log("test");
                    CLASS.addGridItem(element);
                }
            });
        });
    };

    this.search = function(){
        var term = $("#search").val().toLowerCase();
        $(".grid_item").hide();

        CLASS.resetFilters();

        if(gridArray === null) {
            CLASS.filtersort();
        }

        // - Search though grid array to find


        // for each item
        gridArray.forEach(function(item, index){
            // - search each property for string..
            for (var prop in item) {
                if (Object.prototype.hasOwnProperty.call(item, prop)) {
                    // do stuff
                    if(typeof item[prop] === "string"){
                        if(item[prop].toLowerCase().indexOf(term) !== -1){
                            $(".grid_item[data-id='"+ item['id'] +"']").show();
                            break;
                        }
                    }

                }
            }
        });
    };

    this.setupEventListeners = function() {
        $(".grid_item").off().on('click', function(){CLASS.openProject($(this));});
        $("#sortBy, #filterStage, #filterCategory").off().on('change', function(){CLASS.filtersort();});
        $("#search").off().on('keyup', function(){CLASS.search();});
    };
}