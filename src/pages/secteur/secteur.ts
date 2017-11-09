import { Component } from '@angular/core';
import { IonicPage, NavController,ActionSheetController,LoadingController ,AlertController } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { entiteBySecteur } from '../entiteBySecteur/entiteBySecteur';
//import { DecimalPipe } from '@angular/common';

/**
 * Generated class for the SecteurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 **/

@IonicPage()
@Component({
  selector: 'page-secteur',
  templateUrl: 'secteur.html',
})
export class SecteurPage {

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    this.laodSecteur(); 
  }
  secteur:any;
  
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

  laodSecteur(){
    //this.http.get("http://127.0.0.1/dashboard/fichier.json")
    this.http.get("http://websitedemo.biz/hbws/api/secteur.php")

    .map(res=>res.json()) //JSON.parse(data)
    .subscribe(res=>{
      this.secteur=res;
      console.log(this.secteur);
      this.hideLoad();
      this.showing = !this.showing;
    },(err) =>{
      console.log(err);
      this.showAlertNoConnexion();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodSecteur();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  showMinistereBySecteur(ministereBySecteur){
    this.navCtrl.push(entiteBySecteur,{
      ministereBySecteur:ministereBySecteur
   }); 
   
  }

}
