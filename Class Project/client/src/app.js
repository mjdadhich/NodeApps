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
      }
//hopefully what i've written above is correct! added route 12/3
    ]);
  }
}
//your routes are above, explanation in routing video @ 11:00