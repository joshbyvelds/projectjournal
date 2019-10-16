// Master.js

new Installer();
new UserLogin();

var modal_system = new ModalSystem();
var newprojectform = new NewProjectForm();

function init(){
    modal_system.setupEventListeners();
}

$(document).ready(init);