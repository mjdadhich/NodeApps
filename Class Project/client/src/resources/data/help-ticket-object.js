//took code from  user-object.js and changed it to reflect what seems to be needed per helptickets ppt 12/3
import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
//stuff has to be put inside first curly bracket below
@inject(DataServices)
export class helpTicket { //should be ok

    constructor(data) {
        this.data = data;
        this.HELP_TICKET_SERVICE = 'helpTickets'; //not sure if red part is right
        this.HELP_CONTENT_SERVICE = 'helpTicketContents'; //added s back to content
        //12/8 added line above b/c i think it is needed for the getHelpTicketsContents method at bottom
    }
//EDITING MY getHelpTickets BELOW on 12/10 PER EMAIL...
    //get help tickets
    async getHelpTickets(userObj) {
        let url = this.HELP_TICKET_SERVICE;
        if (userObj.role !== 'staff' && userObj.role !== 'admin') {
            url += '/user/' + userObj._id;
        }
        let response = await this.data.get(url);
        if (!response.error) {
            this.helpTicketsArray = response;
        } else {
            this.helpTicketsArray = [];
        }
    }
    //save help tickets   
    async saveHelpTicket(helpTicket) {
        let serverResponse;
        if (helpTicket) {
            if (helpTicket.helpTicket._id) {
                serverResponse = await this.data.put(helpTicket, this.HELP_TICKET_SERVICE);
            } else {
                serverResponse = await this.data.post(helpTicket, this.HELP_TICKET_SERVICE);
            }
            return serverResponse;
        }
    }
//updated 12/9
    async getHelpTicketsContents(id) {
        if (id) {
            let response = await this.data.get(this.HELP_CONTENT_SERVICE + '/helpTicket/' + id);
            if (!response.error) {
                this.helpTicketsContentsArray = response;
            } else {

                this.helpTicketsContentsArray = [];
            }
        } else {
            this.helpTicketsContentsArray = [];
        }
    }

    async uploadFile(files, id) {
        await this.data.uploadFiles(files, this.HELP_CONTENT_SERVICE + "/upload/" + id );
    }
    
}//stuff has to be inside this curly bracket