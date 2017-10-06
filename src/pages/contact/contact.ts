import { Component } from '@angular/core';
import { NavController,ActionSheetController,LoadingController } from 'ionic-angular';
import { MinistereDetailsPage } from '../ministere-details/ministere-details';
import { TerritoirePage } from '../territoire/territoire';
import { StatistiquePage } from '../statistique/statistique';
import { ProjetPage } from '../projet/projet';

import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,public http: Http) {
    this.laodBudget(); 
  }
  ministere:any;
  
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

  laodBudget(){
    this.http.get("http://haitibudget-env-1.max9ppfxgt.us-east-2.elasticbeanstalk.com/getAllEntiteAdministrativeWithDepense")
    .map(res=>res.json())
    .subscribe(res=>{
      this.ministere=res.list;

      console.log(this.ministere);
      this.hideLoad();
    },(err) =>{
      console.log(err);
      this.showLoad();
    });
  }

  goToDetailsMinistere(detailsministere){
    //console.log(detailsministere);
    this.navCtrl.push(MinistereDetailsPage,{
      detailsministere:detailsministere
   });
   
}

  /*
    goToDetailsMinistere(){
        this.navCtrl.push(MinistereDetailsPage);
    }
  */

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Visualiser le budget par ',
      buttons: [
        {
          text: 'Liste de projet',
          role: 'Secteur',
          handler: () => {
            
            this.navCtrl.push(ProjetPage);
          }
        },{
          text: 'Type de depense',
          handler: () => {

            this.navCtrl.push(StatistiquePage);
          }
        },
        {
          text: 'Region geograhique',
          handler: () => {
          
            this.navCtrl.push(TerritoirePage);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
