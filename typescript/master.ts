class ProjectSaver {
    savelock: boolean;
    title: jQuery;
    category: jQuery;
    description: jQuery;

    constructor() {
        this.savelock = false;
        this.title = $("#new_project_title");
        this.category = $("#new_project_category");
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

        if($.trim(this.title.html()) === ""){
           this.title.addClass("error").html("Please give the new project a title.").one("focus", () =>{this.title.removeClass("error").html("");});
            isValid = false;
        }

        if(this.category.val() === "void"){
            alert("Error Category");
            isValid = false;
        }

        if($.trim(this.description.html()) === ""){
            this.description.addClass("error").html("Please give the new project a description.").one("focus", () =>{this.description.removeClass("error").html("");});
            isValid = false;
        }

        return isValid;
    }

    private clearError(): void{

    }

    private reset() {

    }

    private init(): void{
        $("#save_new_project_btn").off().on("click", () => {this.save();});
    }
}

let projectSaver = new ProjectSaver();
