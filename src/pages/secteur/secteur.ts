import { Component } from '@angular/core';
import { IonicPage, NavController,ActionSheetController,LoadingController ,AlertController } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { entiteBySecteur } from '../entiteBySecteur/entiteBySecteur'
import { NativeStorage } from '@ionic-native/native-storage';


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
  budget: any = localStorage.getItem("budget") 
  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    private nativeStorage: NativeStorage,
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
  showAlertNoConnexion(message) {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
    //this.showLoad();
  }

  public showing = true;

  laodSecteur(){
    this.http.get("http://bidjepeyidayiti.ht/admin/api/secteur.php?budget="+this.budget)

    .map(res=>res.json()) //JSON.parse(data)
    .subscribe(res=>{
      this.secteur=res;
      console.log(this.secteur);
      this.hideLoad();
      this.nativeStorage.setItem("haitiBudgetLocal_db_secteur", res);
      this.showing = !this.showing;
    },(err) =>{
      console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_secteur"))
      this.nativeStorage.getItem('haitiBudgetLocal_db_secteur').then((resSecteur) => {
        if(resSecteur != null)
        {
          // this.showAlertNoConnexion("C'est données sont en caches");
          this.secteur=resSecteur;
          this.showing = !this.showing;
        }
        else
        {
          this.showAlertNoConnexion("Verifiez votre connexion internet" );
        }
      });
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
