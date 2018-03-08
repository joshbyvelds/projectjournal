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
                        $(".projects").append('<div class="row project even ' + this.category.html().toLowerCase().replace(" ","_") + '" data-id="'+ json_return.lastId +'"><div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + this.title.html() + '</h3>\n' + category_dropdown +
                            '                        <h5>00:00:00</h5>\n' +
                            '                        <p>' + this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-primary edit-save-btn">Save <i class="far fa-save"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div>\n' +
                            '                    <div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div></div>\n' +
                            '                ');
                    } else {
                        $(".projects").append('' +
                            '                    <div class="row project odd' + this.category.html().toLowerCase().replace(" ","_") + '" data-id="' + json_return.lastId + '"><div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div>\n' +
                            '<div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + this.title.html() + '</h3>\n' + category_dropdown +
                            '                        <h5>00:00:00</h5>\n' +
                            '                        <p>' + this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-primary edit-save-btn">Save <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div></div>\n' +
                            '                ');
                    }

                    this.reset();
                    $(".projects").not(".new").find(".fake_dropdown").addClass("locked");
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
               $(".category-btn.blue-gradient").addClass("btn-outline-info").removeClass("blue-gradient");
               $(".project").fadeIn();
               this.resetOrder();
           }else{
               this.selectedCategory = $btn.text().toLowerCase().replace(' ', '_');
               $(".category-btn.blue-gradient").addClass("btn-outline-info").removeClass("blue-gradient");
               $btn.removeClass("btn-outline-info").addClass("blue-gradient");
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

    private save(){
        let title: string = this.selectedProject.find("h3").html();
        let category: string = this.selectedProject.find("h4.selected").html();
        let description: string = this.selectedProject.find("p").html();

        $.post("php/editproject", {}, function(json_return){
            if(json_return.success === 1){
                this.resetEdit();
            }
        });
    }

    private init(){
        $(".project .edit-btn").off().on('click', (e) => {this.editProject(e.target);})
        $(".project .edit-save-btn").off().on('click', (e) => {this.save();})
    }
}

let projectSaver = new ProjectSaver();
let categorySelector = new CategorySelector();
let projectEditor = new ProjectEditor();
