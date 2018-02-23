class ProjectSaver {
    savelock: boolean;

    constructor() {
        this.savelock = false;
        $(document).ready(() => {this.init();});
    }

    private save(): void{
        if(this.validate() && !this.savelock){
            alert("Save To DB!");
        }
    }

    private validate(): boolean{
        let isValid = true;
        const title = $("#new_project_title");
        const category = $("#new_project_category");
        const description = $("#new_project_description");

        if($.trim(title.html()) === ""){
            alert("Error Title");
            isValid = false;
        }

        if(category.val() === "void"){
            alert("Error Category");
            isValid = false;
        }

        if($.trim(description.html()) === ""){
            alert("Error Description");
            isValid = false;
        }

        return isValid;
    }

    private reset() {

    }

    private init(): void{
        $("#save_new_project_btn").off().on("click", () => {this.save();});
    }
}

let projectSaver = new ProjectSaver();
