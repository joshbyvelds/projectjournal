import * as $ from 'jquery';

export class Installer {

    constructor() {
        alert("Run Installer");
        this.setupEvents();
    }

    setupEvents() {
        $("#installSubmit").on('click', this.submitInstallForm);
    }

    submitInstallForm() {

    }
}