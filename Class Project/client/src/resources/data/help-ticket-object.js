//took code from  user-object.js and changed it to reflect what seems to be needed per helptickets ppt 12/3
import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
//stuff has to be put inside first curly bracket below
@inject(DataServices)
export class helpTicket { //should be ok

    constructor(data) {
        this.data = data;
        this.HELP_TICKET_SERVICE = 'helpTickets'; //not sure if red part is right
        this.HELP_CONTENT_SERVICE = 'helpTicketContent'; //TAKING OUT 'S' AT END OF CONTENT...**** 
        //12/8 added line above b/c i think it is needed for the getHelpTicketContents method at bottom
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
            //Attempting to create a getHelpTicketContents method 12/8
            //Tried to guess how to do this by looking at getHelpTickets() method above
            //tried many different options and ideas below, but nothing works
//added 's' to Ticket below otherwise get error message about getHelpTicketContents not being a function
  async getHelpTicketsContents(helpTicketContent) { 
  let url = this.HELP_CONTENT_SERVICE;
   if(helpTicket.helpTicketContent == helpTicketContent){
      url += '/helpTicket/' + helpTicket._id; 
    }
    let response = await this.data.get(this.HELP_CONTENT_SERVICE);
            if(!response.error){
              this.helpTicketsContentsArray = response;
            } else {
        
                this.helpTicketsContentsArray = [];
            }
  }          
}//stuff has to be inside this curly bracket