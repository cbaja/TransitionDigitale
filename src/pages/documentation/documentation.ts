import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import {PeopleServiceProvider} from '../../providers/people-service/people-service';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-documentation',
  templateUrl: 'documentation.html',
  providers:[PeopleServiceProvider]

})
export class DocumentationPage {
  documentBudget : any ; //= any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private http: Http,
    public loadingCtrl: LoadingController,
    public peopleServiceProvider: PeopleServiceProvider) {
    this.laodDocumentBudget(); 
  }
  showAlertNoConnexion() {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: 'Vérifiez votre connexion internet!',
      buttons: ['OK']
    });
    alert.present();
    //this.showLoad();
  }
  showLoad() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
  }
  
  hideLoad() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    loading.dismiss();
  }
  
  public showing = true;
  
  laodDocumentBudget(){
    this.http.get("http://haitibudget-env-1.max9ppfxgt.us-east-2.elasticbeanstalk.com/getLastBudget")
    .map(res=>res.json())
    .subscribe(res=>{
      var myTable = [];
      myTable.push(res);
      this.documentBudget=myTable;
      console.log(this.documentBudget);
      this.hideLoad()
  
      this.showing = !this.showing;
    },(err) =>{
      console.log(err);
      // alert(err)
      this.showAlertNoConnexion();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodDocumentBudget();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  goToDocument(){
    this.navCtrl.push(AboutPage);
  }

  showdetails(thePost){
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