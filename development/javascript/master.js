// Master.js

new Installer();
new UserLogin();

var modal_system = new ModalSystem();
var newprojectform = new NewProjectForm();
var grid = new ProjectGrid();
var project_info = new ProjectInfoPanel();
var edit_project = new EditProject();


function trim(val) {
    if (val !== undefined){
        return val.toString();
    }
}

function init(){
    modal_system.setupEventListeners();
    newprojectform.setupEventListeners();
    edit_project.setupEventListeners();

    grid.filtersort();
    setTimeout(function(){
        grid.setupEventListeners();
    }, 1000);
}

$(document).ready(init);