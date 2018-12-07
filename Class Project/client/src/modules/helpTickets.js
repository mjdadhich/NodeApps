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
        //this.openEditForm = false;
        //added line above after looking again at users.js
    }
    async activate() {
        await this.helpTickets.getHelpTickets(this.userObj);
    }
    attached() {
        feather.replace()
    }
    //adding this from users.js on 12/5 and edited to suit this section***might need another line
    async getHelpTickets() {
        await this.helpTickets.getHelpTickets()
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
    }//changed from show to open
    async editHelpTicket(helpTicket) {
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketsContents(helpTicket._id)
        this.showEditForm();
    }//changed from show to open
    //added this from users.js and edited***

    showEditForm() {
        this.showHelpTicketEditForm = true;
        setTimeout(() => { $("#firstName").focus(); }, 500);
    }
    //might need to remove or fix the above code added 12/4
    async save() {
        if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
            if (this.userObj.role !== 'user') {
                this.helpTicket.ownerId = this.userObj._id;
            }
            let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent }
            await this.helpTickets.saveHelpTicket(helpTicket);
            await this.getHelpTickets();
            this.back();
        }
    }

    //adding this, think it might be necessary!
    back() {
        this.showHelpTicketEditForm = false;
    }
    //trying this out to try to fix issue with saving new help tick
    //save() {
    //  this.showHelpTicketEditForm = false;
    //}

}//things have to go inside this curly bracket