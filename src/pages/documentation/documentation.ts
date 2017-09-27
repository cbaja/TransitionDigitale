import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import {PeopleServiceProvider} from '../../providers/people-service/people-service';
import { Http } from '@angular/http';

@Component({
  selector: 'page-documentation',
  templateUrl: 'documentation.html',
  providers:[PeopleServiceProvider]

})
export class DocumentationPage {
  postList : any ;//= any;
  constructor(public navCtrl: NavController, private http: Http,
    public peopleServiceProvider: PeopleServiceProvider) {
    this.getPosts();
  }
  
  getPosts(){
    this.peopleServiceProvider.getPosts().subscribe((data)=>{
        this.postList = data;
    });
  }
  
  goToDocument(){
    this.navCtrl.push(AboutPage);
  }
 
}