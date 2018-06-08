import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
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
import { SearchPage } from '../search/search';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  budget: any = localStorage.getItem("budget") 
  
  ministereBySecteur :any;

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,public http: Http,
    private nativeStorage: NativeStorage,
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
  showAlertNoConnexion(message:any) {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
    //this.showLoad();
  }

  public showing = true;
  

  //http://haitibudget-env-1.max9ppfxgt.us-east-2.elasticbeanstalk.com/getAllEntiteAdministrativeWithDepense
  laodBudget(){
    this.budget = localStorage.getItem("budget");
    this.http.get("http://bidjepeyidayiti.ht/admin/api/entiteAdministrative.php?budget="+this.budget)
    //this.http.get("http://websitedemo.biz/hbws/api/entiteAdministrative.php")
    .map(res=>res.json()) //JSON.parse(data)
    .subscribe(res=>{
      this.ministere=res;
      console.log(this.ministere);
      this.hideLoad();
      this.nativeStorage.setItem("haitiBudgetLocal_db_ministere", res);
      this.showing = !this.showing;
    },(err) =>{
      console.log(err);
      console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_ministere"))
  
      this.nativeStorage.getItem('haitiBudgetLocal_db_ministere').then((resMinistere) => {
        if(resMinistere != null)
        {
          //this.showAlertNoConnexion("C'est données sont en caches");
          this.ministere=resMinistere;
          this.showing = !this.showing;
        }
        else
        {
          this.showAlertNoConnexion("Verifiez votre connexion internet" );
        }
      });

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
          text: 'Choississez un autre budget',
          handler: () => {
            this.navCtrl.push(SearchPage);
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
