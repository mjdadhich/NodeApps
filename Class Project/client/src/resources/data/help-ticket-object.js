//took code from  user-object.js and changed it to reflect what seems to be needed per helptickets ppt 12/3
import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
//stuff has to be put inside first curly bracket below
@inject(DataServices)
export class helpTicket { //should be ok

    constructor(data) {
        this.data = data;
        this.HELP_TICKET_SERVICE = 'helpTickets'; //not sure if red part is right/if it needs to be "required"
    }
//get help tickets
    async getHelpTickets(userObj){
        let url = this.HELP_TICKET_SERVICE;
        if(userObj.role == 'user'){
            url += '/user/' + userObj._id;
        }
        let response = await this.data.get(url);
                if(!response.error){
                    this.helpTicketsArray = response;
                } else {
                    this.helpTicketsArray = [];
                }
        }
     //save help tickets   
        async saveHelpTicket(helpTicket){
            let serverResponse;
            if (helpTicket) {
            if(helpTicket.helpTicket._id){
                serverResponse = await this.data.put(helpTicket, this.HELP_TICKET_SERVICE);
            } else {
                serverResponse = await this.data.post(helpTicket, this.HELP_TICKET_SERVICE);
            }
            return serverResponse;
            }
            }
            
}//stuff has to be inside this curly bracket