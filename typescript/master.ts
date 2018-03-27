class ProjectSaver {
    savelock: boolean;
    title: JQuery;
    category: JQuery;
    description: JQuery;

    constructor() {
        this.savelock = false;
        this.title = $("#new_project_title");
        this.category = $("#selected_category");
        this.description = $("#new_project_description");
        $(document).ready(() => {this.init();});
    }

    private save(): void{
        if(this.validate() && !this.savelock){
            $.post("php/saveproject.php", {"title":$.trim(this.title.html()), "category":$.trim(this.category.html()), "description":$.trim(this.description.html())}, (json_return) => {
                json_return = JSON.parse(json_return);
                if(json_return.error){
                    alert(json_return.error_message);
                    return;
                }

                if(json_return.success) {

                    const category_dropdown: string = $('<div>').append($(".project_category").first().clone()).remove().html();
                    $(category_dropdown).find(".selected").html(this.category.html());

                    //create project in html
                    if ($(".project").last().hasClass("odd")) {
                        $(".projects").append('<div class="row project even ' + this.category.html().toLowerCase().replace(" ","_") + '" data-id="'+ json_return.lastId +'" data-seconds="0" data-minutes="0" data-hours="0"><div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + this.title.html() + '</h3>\n' + category_dropdown +
                            '                        <h5><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span> </h5>\n' +
                            '                        <p>' + this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-primary edit-save-btn" style="display:none;">Save <i class="far fa-save"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div>\n' +
                            '                    <div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div></div>\n' +
                            '                ');
                    } else {
                        $(".projects").append('' +
                            '                    <div class="row project odd ' + this.category.html().toLowerCase().replace(" ","_") + '" data-id="' + json_return.lastId + '" data-seconds="0" data-minutes="0" data-hours="0"><div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div>\n' +
                            '<div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + this.title.html() + '</h3>\n' + category_dropdown +
                            '                        <h5><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span></h5>\n' +
                            '                        <p>' + this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-primary edit-save-btn" style="display:none;">Save <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div></div>\n' +
                            '                ');
                    }

                    this.reset();
                    $(".projects").not(".new").find(".fake_dropdown").addClass("locked");
                    $(".project").not(".new").each((index, element) => {
                        if(index % 2 === 0){
                            $(element).find('.image-col').appendTo(element);
                        }else{
                            $(element).find('.image-col').prependTo(element);
                        }
                    });
                    $(".category-btn.selected_category").removeClass("selected_category blue-gradient").trigger("click");
                }
            });
        }
    }

    private validate(): boolean{
        let isValid: boolean = true;

        if($.trim(this.title.html()) === "" || $.trim(this.title.html()) === "New Project" || $.trim(this.title.html()) === "Please give the new project a title."){
           this.title.addClass("error").html("Please give the new project a title.").one("focus", () =>{this.title.removeClass("error").html("");});
            isValid = false;
        }

        if($.trim(this.category.html()) === "Please select" || $.trim(this.category.html()) === "Category"){
            this.category.addClass("error");
            isValid = false;
        }

        if($.trim(this.description.html()) === "" || $.trim(this.description.html()) === "Project description goes here.." || $.trim(this.description.html()) === "Please give the new project a description."){
            this.description.addClass("error").html("Please give the new project a description.").one("focus", () =>{this.description.removeClass("error").html("");});
            isValid = false;
        }

        return isValid;
    }

    private reset() {
        this.title.html("New Project");
        this.category.html("Category");
        this.description.html("Project description goes here..");
    }

    private openDropdown(){
        $("#category_select .options").slideDown(500);
        $("#category_select .option").off().on('click', function() {
            $("#selected_category").html($(this).html()).removeClass("error");
            $("#category_select .options").slideUp(500);
        });
    }

    private init(): void{
        $("#save_new_project_btn").off().on("click", () => {this.save();});
        $("#selected_category").on("click", () => {this.openDropdown();})
    }
}

class CategorySelector {
    selectedCategory: string;

    constructor() {
        this.selectedCategory = "";
        $(document).ready(() => {this.init();});
    }

    private init() {
        $(".category-btn").off().on("click", (event) => {
           const $btn: JQuery = $(event.target);
            $(".project").not(".new").fadeOut().removeClass("shown");
           if($btn.hasClass("blue-gradient")){
               this.selectedCategory = "";
               $(".category-btn.blue-gradient").addClass("btn-outline-info").removeClass("blue-gradient").removeClass("selected_category");
               $(".project").fadeIn();
               this.resetOrder();
           }else{
               this.selectedCategory = $btn.text().toLowerCase().replace(' ', '_');
               $(".category-btn.blue-gradient").addClass("btn-outline-info").removeClass("blue-gradient").removeClass("selected_category");
               $btn.removeClass("btn-outline-info").addClass("blue-gradient selected_category");
               $("." + this.selectedCategory).addClass("shown").fadeIn();
               this.sortOrder();
           }
        });
    }

    private sortOrder() {
        $(".shown").each((index, element) => {
            if(index % 2 === 0){
                $(element).find('.image-col').appendTo(element);
            }else{
                $(element).find('.image-col').prependTo(element);
            }
        });
    }

    private resetOrder (){
        $(".project").not(".new").each((index, element) => {
            if(index % 2 === 0){
                $(element).find('.image-col').appendTo(element);
            }else{
                $(element).find('.image-col').prependTo(element);
            }
        });
    }
}

class ProjectEditor {
    selectedProject: JQuery;

    constructor() {
        $(document).ready(() => {
            this.init();
        });
    }

    private resetEdit(){
        $(".edit h3, .edit p").removeAttr("contenteditable");
        $(".edit .fake_dropdown").addClass("locked");
        $(".edit .edit-save-btn").hide();
        $(".edit .edit-btn").show();
        $(".edit").removeClass("edit");
    }

    private editProject(project: HTMLElement){
        this.resetEdit();
        this.selectedProject = $(project).parent().parent();
        this.selectedProject.addClass("edit");
        $(".edit h3, .edit p").attr("contenteditable", "true");
        $(".edit .fake_dropdown").removeClass("locked");
        $(".edit .fake_dropdown .selected").on("click", () => {this.openDropdown();})
        $(".edit .edit-save-btn").show();
        $(".edit .edit-btn").hide();
    }

    private openDropdown(){
        $(".edit .options").slideDown(500);
        $(".edit .option").off().on('click', function() {
            $(".edit .selected").html($(this).html()).removeClass("error");
            $(".edit .options").slideUp(500);
        });
    }

    private validate(): boolean{
        let isValid: boolean = true;
        let title: JQuery = this.selectedProject.find("h3");
        let category: JQuery = this.selectedProject.find("h4.selected");
        let description: JQuery = this.selectedProject.find("p");

        if($.trim(title.html()) === "" || $.trim(title.html()) === "Please give the project a title."){
            title.addClass("error").html("Please give the project a title.").one("focus", () =>{title.removeClass("error").html("");});
            isValid = false;
        }

        if($.trim(category.html()) === "Please select" || $.trim(category.html()) === "Category"){
            category.addClass("error");
            isValid = false;
        }

        if($.trim(description.html()) === "" || $.trim(description.html()) === "Project description goes here.." || $.trim(description.html()) === "Please give the project a description."){
            description.addClass("error").html("Please give the project a description.").one("focus", () =>{description.removeClass("error").html("");});
            isValid = false;
        }

        return isValid;
    }

    private save(){
        let title: string = this.selectedProject.find("h3").html();
        let category: string = this.selectedProject.find("h4.selected").html();
        let description: string = this.selectedProject.find("p").html();
        let id: string = this.selectedProject.data("id");

        if(!this.validate())
            return;

        $.post("php/editproject", {'id':id, 'title':title, 'category':category, 'description':description}, (json_return) => {
            json_return = JSON.parse(json_return);
            if(json_return.success){
                if(this.selectedProject.hasClass("even")){
                    this.selectedProject.attr("class", "row project even " + category.toLowerCase().replace(' ', '_'));
                }else{
                    this.selectedProject.attr("class", "row project odd " + category.toLowerCase().replace(' ', '_'));
                }
                this.resetEdit();
                $(".category-btn.selected_category").removeClass("selected_category blue-gradient").trigger("click");
            }else{
                console.error(json_return.error_message);
            }
        });
    }

    private init(){
        $(".project .edit-btn").off().on('click', (e) => {this.editProject(e.target);})
        $(".project .edit-save-btn").off().on('click', (e) => {this.save();})
    }
}

class ProjectDeleter {
    selectedProject: JQuery;

    constructor() {
        $(document).ready(() => {
            this.init();
        });
    }

    private delete(){
        let id: string = this.selectedProject.data("id");

        $.post("php/deleteproject.php", {"project_id":id}, (json_return) => {
            json_return = JSON.parse(json_return);
            if(json_return.success){
                this.selectedProject.remove();
                this.cancel();
                $(".project").not(".new").each((index, element) => {
                    if(index % 2 === 0){
                        $(element).find('.image-col').appendTo(element);
                    }else{
                        $(element).find('.image-col').prependTo(element);
                    }
                });
                $(".category-btn.selected_category").removeClass("selected_category blue-gradient").trigger("click");
            }else{
                console.error(json_return.error_message)
            }
        });
    }

    private cancel(){
        $("#overlay, #delete_warning_box").fadeOut();
        $("#delete_confirm_btn").off();
        $("#delete_cancel_btn").off();
        this.selectedProject = null;
    }

    private deleteProject($project: HTMLElement){
        this.selectedProject = $($project).parent().parent();
        $("#overlay, #delete_warning_box").fadeIn();
        $("#delete_confirm_btn").off().on("click", ()=> {this.delete();});
        $("#delete_cancel_btn").off().on("click", ()=> {this.cancel();});
    }

    private init(){
        $(".project .delete-btn").off().on('click', (e) => {this.deleteProject(e.target);})
    }
}

class ProjectTimeTracker{
    selectedProject: JQuery;
    hoursOdometer: Object;
    minutesOdometer: Object;
    secondsOdometer: Object;
    hours:number;
    minutes:number;
    seconds:number;
    timeInterval:number;

    constructor() {
        $(document).ready(() => {
            this.init();
        });
    }

    start($startBtn: HTMLElement){
        this.stop($startBtn);
        this.selectedProject = $($startBtn).parent().parent();
        $(".current_odometer").removeClass("current_odometer");
        this.selectedProject.find("h5").addClass("current_odometer");

        this.seconds = this.selectedProject.data("seconds");
        this.minutes = this.selectedProject.data("minutes");
        this.hours = this.selectedProject.data("hours");

        let hoursElement:Element = document.querySelector('.current_odometer .hours');
        this.hoursOdometer = new Odometer({
            el: hoursElement,
            value: this.hours,
            duration: 800,
            // Any option (other than auto and selector) can be passed in here
            format: '',
            theme: 'minimal',
            numberLength:2,
        });

        let minutesElement:Element = document.querySelector('.current_odometer .minutes');
        this.minutesOdometer = new Odometer({
            el: minutesElement,
            value: this.minutes,
            duration: 800,
            // Any option (other than auto and selector) can be passed in here
            format: '',
            theme: 'minimal',
            numberLength:2,
        });

        let secondsElement:Element = document.querySelector('.current_odometer .seconds');
        this.secondsOdometer = new Odometer({
            el: secondsElement,
            value: this.seconds,
            duration: 800,
            // Any option (other than auto and selector) can be passed in here
            format: '',
            theme: 'minimal',
            numberLength:2,
        });

        this.timeInterval = setInterval(() => {
            this.seconds++;

            if(this.seconds > 59){
                this.seconds = 0;
                this.minutes++;
                this.minutesOdometer.update(this.minutes);
                this.selectedProject.data("minutes", this.minutes);
                this.selectedProject.data("seconds", this.seconds);
                this.saveTime();
            }

            if(this.minutes > 59){
                this.minutes = 0;
                this.hours++;
                this.hoursOdometer.update(this.hours);
                this.selectedProject.data("hours", this.hours);
            }

            this.secondsOdometer.update(this.seconds);
            this.selectedProject.data("seconds", this.seconds);
            console.log(this.selectedProject);

        },1000);

        this.selectedProject.find(".stop-btn").show();
        this.selectedProject.find(".start-btn").hide();
    }

    stop($stopBtn: HTMLElement){
        clearInterval(this.timeInterval);
        if(this.selectedProject){
            this.selectedProject.find(".start-btn").show();
            this.selectedProject.find(".stop-btn").hide();
            this.saveTime();
        }
    }

    saveTime(){
        $.post("php/savetime",
            {
                "project": parseInt(this.selectedProject.data("id")),
                "seconds": parseInt(this.selectedProject.data("seconds")),
                "minutes": parseInt(this.selectedProject.data("minutes")),
                "hours": parseInt(this.selectedProject.data("hours"))
            },
            (json_return) => {
                if(json_return && json_return.error_message){
                    console.error(json_return.error_message);
                }
            }
        );
    }

    init(){
        $(".start-btn").off().on('click', (e) => {this.start(e.target);});
        $(".stop-btn").off().on('click', (e) => {this.stop(e.target);})
    }
}

class taskSaver {

    constructor() {
        $(document).ready(() => {
            this.init();
        });
    }

    saveNewTask(){
        let taskname = $("#new_task_name").val();

        if(taskname.length === 0){
            return;
        }

        //$.post()
    }

    saveNewSubTask(){

    }

    init(){
        $("#new_task_button").off().on('click', function(){this.saveNewTask()});
        $("#new_subtask_button").off().on('click', function(){this.saveNewSubTask()});
    }
}

let projectSaver = new ProjectSaver();
let categorySelector = new CategorySelector();
let projectEditor = new ProjectEditor();
let projectDeleter = new ProjectDeleter();
let projectTimeTracker = new ProjectTimeTracker();
let taskSaver = new taskSaver();
