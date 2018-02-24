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
            alert("Save To DB!");
        }
    }

    private validate(): boolean{
        let isValid = true;

        if($.trim(this.title.html()) === "" || $.trim(this.title.html()) === "New Project"){
           this.title.addClass("error").html("Please give the new project a title.").one("focus", () =>{this.title.removeClass("error").html("");});
            isValid = false;
        }

        if($.trim(this.category.html()) === "Please select"){
            this.category.addClass("error");
            isValid = false;
        }

        if($.trim(this.description.html()) === "" || $.trim(this.description.html()) === "description here..."){
            this.description.addClass("error").html("Please give the new project a description.").one("focus", () =>{this.description.removeClass("error").html("");});
            isValid = false;
        }

        return isValid;
    }

    private clearError(): void{

    }

    private reset() {

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

let projectSaver = new ProjectSaver();
