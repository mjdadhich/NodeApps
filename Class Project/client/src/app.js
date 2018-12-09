import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep); 
    config.map([
      {
        route: ['', 'landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false
      },
      {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true 
      },
      {
        route: 'users',
        moduleId: './modules/users',
        name: ' Users',
        auth: true 
//going to need another route for helptickets around here
      },
      {
        route: 'helpTickets',
        moduleId: './modules/helpTickets',
        name: 'helpTickets',
        auth: true 
      },
//hopefully what i've written above is correct! added route 12/3
//ADDING ANOTHER ROUTE ON 12/8 FOR HELP TICKET CONTENTS -- NOT SURE IF CORRECT
{
  route: 'helpTicketContent',
  moduleId: './modules/helpTickets',//there is no module for content, so would it be directed to helptix??
  name: 'helpTicketContent',//does the name matter?
  auth: true 
}
    ]);
  }
}
//your routes are above, explanation in routing video @ 11:00