function ProjectGrid(){
    this.resetFilters = function(){
        console.log("TODO:: Reset filters so we can see the new item..")
    };

    this.addGridItem = function(json){

        var griditem = "";
            griditem += '<div class="grid_item">';
            griditem += '<div class="top">';
            griditem += '<div class="project_thumbnail" style=\'background-image: url("images/updates/project_not_started.webp");\'></div>';
            griditem += '<div class="top_text">';
            griditem += '<div class="name">'+ json.title +'</div>';
            griditem += '<div class="time_spent"><i class="far fa-clock"></i> <span>' + grid.convertTimeSpent(json.time_spent) +'</span></div>';
            griditem += '</div>';
            griditem += '</div>';
            griditem += '<div class="bottom">';
            griditem += '<div class="last_updated"><i class="fas fa-calendar-alt"></i>' + grid.convertDate(json.date) + '</div>';
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
}