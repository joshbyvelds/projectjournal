// Master.js

new Installer();
new UserLogin();

var modal_system = new ModalSystem();
var newprojectform = new NewProjectForm();
var grid = new ProjectGrid();
var project_info = new ProjectInfoPanel();
var edit_project = new EditProject();
var delete_project = new DeleteProjectModal();
var add_journal_entry = new AddJournalEntry();
var journal_entry_modal = new JournalEntryModal();



function trim(val) {
    if (val !== undefined){
        return val.toString();
    }
}

function init(){
    modal_system.setupEventListeners();
    newprojectform.setupEventListeners();
    edit_project.setupEventListeners();
    delete_project.setupEventListeners();
    add_journal_entry.setupEventListeners();
    journal_entry_modal.setupEventListeners();

    grid.filtersort();
    setTimeout(function(){
        grid.setupEventListeners();
    }, 1000);
}

function resetAllEventListeners(){
    modal_system.setupEventListeners();
    newprojectform.setupEventListeners();
    edit_project.setupEventListeners();
    delete_project.setupEventListeners();
    journal_entry_modal.setupEventListeners();

    grid.filtersort();
    setTimeout(function(){
        grid.setupEventListeners();
    }, 1000);
}

$(document).ready(init);