// Master.js

new Installer();
new UserLogin();

var modal_system = new ModalSystem();
var newprojectform = new NewProjectForm();
var grid = new ProjectGrid();
var project_info = new ProjectInfoPanel();


function trim(val) {
    if (val !== undefined){
        return val.toString();
    }
}

function init(){
    modal_system.setupEventListeners();
    newprojectform.setupEventListeners();
    grid.setupEventListeners();
}

$(document).ready(init);