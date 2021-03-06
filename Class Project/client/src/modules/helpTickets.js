//took this top section from users.js...something not right?
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { helpTicket } from '../resources/data/help-ticket-object'; //singular


@inject(helpTicket) //singular
export class helpTickets {//plural
    //took above from users.js and tried to edit it

    constructor(helpTicket) {
        this.helpTickets = helpTicket;
        this.showHelpTicketEditForm = false; //should this really be false?
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
        //this.showHelpTicketEditForm = false;
        //added line above after looking again at users.js
    }
    async activate() {
        await this.helpTickets.getHelpTickets(this.userObj);
    }
    attached() {
        feather.replace()
    }
    //edited this on 12/8, passing in this.userObj, like activate method above
    async getHelpTickets() {
        await this.helpTickets.getHelpTickets(this.userObj)
    }
    newHelpTicket() {
        this.helpTicket = {
            title: "",
            personId: this.userObj._id,
            ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
            status: 'new'
        };
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        this.showEditForm();
    }//ensured this was correct on 12/9
    async editHelpTicket(helpTicket) {
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketsContents(helpTicket._id) //this is as it should be
        this.showEditForm();
    }
    //added this from users.js and edited***
    showEditForm() {
        this.showHelpTicketEditForm = true;
        //setTimeout(() => { $("#firstName").focus(); }, 500);
    }
    //might need to remove or fix the above code added 12/4
    async save() {
        if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
            if (this.userObj.role !== 'user') {
                this.helpTicket.ownerId = this.userObj._id;
            }
            let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent }
            let serverResponse = await this.helpTickets.saveHelpTicket(helpTicket);
            if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, serverResponse.contentID);
            await this.getHelpTickets();
            this.back();
        }
    }

    back() {
        this.showHelpTicketEditForm = false;
        this.showHelpTicketDisplayForm = false; //added on 12/10, but don't have anywhere else...
        this.filesToUpload = new Array();
        this.files = new Array();

    }
    //EXPERIMENTAL CODE HERE FOR CONTENTS, DONT KNOW IF NEEDED 12/9 or instead more needed inside getHelpTickets
    async getHelpTicketsContents() {
        await this.helpTickets.getHelpTicketsContents(helpTicket._id)
    }

    //added 12/10
    changeFiles() {
        this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
        for (var i = 0; i < this.files.length; i++) {
            let addFile = true;
            this.filesToUpload.forEach(item => {
                if (item.name === this.files[i].name) addFile = false;
            })
            if (addFile) this.filesToUpload.push(this.files[i]);
        }
    }

}//things have to go inside this curly bracket