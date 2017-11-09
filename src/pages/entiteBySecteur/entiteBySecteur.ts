import { Component } from '@angular/core';
import { NavController,ActionSheetController,LoadingController ,AlertController,NavParams} from 'ionic-angular';
import { MinistereDetailsPage } from '../ministere-details/ministere-details';
import { TerritoirePage } from '../territoire/territoire';
//import { StatistiquePage } from '../statistique/statistique';
import { ProjetPage } from '../projet/projet';
import { SecteurPage } from '../secteur/secteur';
import { SourcesFinancementPage } from '../sources-financement/sources-financement';


import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'page-entiteBySecteur',
  templateUrl: 'entiteBySecteur.html'
})
export class entiteBySecteur {
  ministereBySecteur :any;

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,public http: Http,
    public navParams:NavParams, public alertCtrl: AlertController) {
     // ministereBySecteur  
    this.ministereBySecteur=navParams.get("ministereBySecteur");
    
       this.laodEntiteBySector(this.ministereBySecteur.id_secteur); 
  }
  ministereSecteur:any;
  
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

  laodEntiteBySector(idSecteur:any){
    this.http.get("http://websitedemo.biz/hbws/api/entiteAdministrativeBySecteur.php?secteur_fk="+idSecteur)
    .map(res=>res.json()) //JSON.parse(data)
    .subscribe(res=>{
      this.ministereSecteur=res;
      console.log(this.ministereSecteur);
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
    this.laodEntiteBySector(this.ministereBySecteur.id_secteur); 

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
