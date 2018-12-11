export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      { 
	route: 'todo',
   moduleId: './modules/todo', 
	 name: 'todo' 
      }
    ]);
  }
}

