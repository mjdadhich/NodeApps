import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class Foo {
constructor(data) {
        this.data = data;
        this.FOO_SERVICE = 'foo';
    }
async saveFoo(foo){
    if(foo){
  let serverResponse = await this.data.post(foo, this.FOO_SERVICE);
         return serverResponse;
 }
}



}//stuff goes inside
