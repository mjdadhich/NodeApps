//i have added things to this file based on aur auth ppt slide 7 which may need to be removed
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
//not sure if this is needed here or not but adding line below
import {AuthService} from 'aurelia-auth';


@inject(Router, AuthService) ///added AuthService
export class Home {
  constructor(router, auth) { //added auth
  this.router = router;
  this.auth = auth;//added this line and next one
  this.loginError = '';
          this.message = 'Home';
  }

  login(){
	  this.router.navigate('users');
  }
}

