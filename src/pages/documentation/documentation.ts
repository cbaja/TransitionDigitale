import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import {PeopleServiceProvider} from '../../providers/people-service/people-service';
// import { Http } from '@angular/http';

@Component({
  selector: 'page-documentation',
  templateUrl: 'documentation.html',
  providers:[PeopleServiceProvider]

})
export class DocumentationPage {
  postList : any ;//= any;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, //private http: Http, 
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
  showdetails(thePost){

    //let index = this.postList.indexOf(thePost);
    this.navCtrl.push(AboutPage,{
      thePost:thePost
    });
    //alert(thePost)
    /*
    let prompt = this.alertCtrl.create({
      title: 'Modifier informations',
      inputs: [{
          name: 'title'
      }],
      buttons: [
          {
              text: 'Cancel'
          },
          {
              text: 'Save',
              handler: data => {
                  let index = this.postList.indexOf(thePost);

                  if(index > -1){
                    this.postList[index] = data;
                  }
              }
          }
      ]
  });

  prompt.present();   
  */
  }
  
}