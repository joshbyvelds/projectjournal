class ProjectSaver {
    savelock: boolean;
    title: jQuery;
    category: jQuery;
    description: jQuery;

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
                    //create project in html
                    if ($(".project").last().hasClass("odd")) {
                        $(".projects").append('<div class="row project even ' + this.category.html().toLowerCase().replace(" ","_") + '"><div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + this.title.html() + '</h3>\n' +
                            '                        <h4>' + this.category.html() + '</h4>\n' +
                            '                        <h5>00:00:00</h5>\n' +
                            '                        <p>' + this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div>\n' +
                            '                    <div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div></div>\n' +
                            '                ');
                    } else {
                        $(".projects").append('' +
                            '                    <div class="row project odd' + this.category.html().toLowerCase().replace(" ","_") + '"><div class="col-sm-12 col-md-6 image-col"><img src="/assets/images/new_project.jpg" class="img-fluid img-thumbnail z-depth-3" alt="zoom"></div>\n' +
                            '<div class="col-sm-12 col-md-6 title-col">\n' +
                            '                        <h3>' + this.title.html() + '</h3>\n' +
                            '                        <h4>' + this.category.html() + '</h4>\n' +
                            '                        <h5>00:00:00</h5>\n' +
                            '                        <p>' + this.description.html() + '</p>\n' +
                            '                        <button class="btn btn-success start-btn">Start <i class="far fa-play-circle"></i></button>' +
                            '                        <button class="btn btn-secondary stop-btn" style="display:none;">Stop <i class="far fa-pause-circle"></i></button>' +
                            '                        <button class="btn btn-default edit-btn">Edit <i class="far fa-edit"></i></button>' +
                            '                        <button class="btn btn-danger delete-btn">Delete <i class="far fa-trash-alt"></i></button>' +
                            '                    </div></div>\n' +
                            '                ');
                    }

                    this.reset();
                }
            });
        }
    }

    private validate(): boolean{
        let isValid = true;

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
           const $btn = $(event.target);
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

let projectSaver = new ProjectSaver();
let categorySelector = new CategorySelector();
