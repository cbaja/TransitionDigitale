import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PeopleServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class PeopleServiceProvider {
  getApiUrl : string = "https://jsonplaceholder.typicode.com/posts";

  constructor(public http: Http) {
    console.log('Hello PeopleServiceProvider Provider');
  }
  getPosts() {
    return  this.http.get(this.getApiUrl)
        //.do((res : Response ) => console.log(res.json())
        .map((res : Response ) => res.json());
        //.catch(error => console.log(error));
  }
}


