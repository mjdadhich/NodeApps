import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Foo } from '../resources/data/foo-object'
@inject(Router, Foo)
export class Foos { //note this pg's export class is Foos
constructor(router, foos) {
this.router = router;
this.foos = foos;
this.message = 'Foos';
this.showfooForm = false;
}

newFoo() {
this.foo = {
foo: "",
woo: "zoo", //since this is an enum create a default value of zoo
//uncertain about this
}
	this.showfooForm = true;
}
}
