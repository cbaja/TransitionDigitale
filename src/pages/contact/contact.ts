import { Component } from '@angular/core';
import { NavController,ActionSheetController,LoadingController ,AlertController,NavParams} from 'ionic-angular';
import { MinistereDetailsPage } from '../ministere-details/ministere-details';
import { TerritoirePage } from '../territoire/territoire';
import { ProjetPage } from '../projet/projet';
import { SecteurPage } from '../secteur/secteur';
import { SourcesFinancementPage } from '../sources-financement/sources-financement';
//import { budgetApercu } from '../budgetApercu/budgetApercu';


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
  ministereBySecteur :any;

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,public http: Http,
    public navParams:NavParams, public alertCtrl: AlertController) {
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
  showAlertNoConnexion() {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: 'Vérifiez votre connexion internet!',
      buttons: ['OK']
    });
    alert.present();
    //this.showLoad();
  }

  public showing = true;

  //http://haitibudget-env-1.max9ppfxgt.us-east-2.elasticbeanstalk.com/getAllEntiteAdministrativeWithDepense
  laodBudget(){
    //this.http.get("http://127.0.0.1/dashboard/fichier.json")
    this.http.get("http://websitedemo.biz/hbws/api/entiteAdministrative.php")
    .map(res=>res.json()) //JSON.parse(data)
    .subscribe(res=>{
      this.ministere=res;
      console.log(this.ministere);
      this.hideLoad();
  
      this.showing = !this.showing;
    },(err) =>{
      console.log(err);
      this.showAlertNoConnexion();
    });
  }

  goToDetailsMinistere(detailsministere){
    this.navCtrl.push(MinistereDetailsPage,{
      detailsministere:detailsministere
   }); 
  }
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodBudget();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Visualiser le budget par ',
      
      buttons: [
       /*
        {
          text: 'Aperçu sur le budget',
          // role: 'Secteur',
          handler: () => {
             this.navCtrl.push(budgetApercu);
          }
        },
      */
        {
          text: 'Sources de financement',
          // role: 'Secteur',
          handler: () => {
             this.navCtrl.push(SourcesFinancementPage);
          }
        },

        {
          text: 'Liste de projet',
         // role: 'Secteur',
          handler: () => {
             this.navCtrl.push(ProjetPage);
          }
        },{
          text: 'Secteur',
          handler: () => {
            this.navCtrl.push(SecteurPage);
          }
        },
        {
          text: 'Région géograhique',
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
