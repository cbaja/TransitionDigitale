import { Component } from '@angular/core';
import { NavController,ActionSheetController,LoadingController ,AlertController,NavParams} from 'ionic-angular';
import { DetailsProjetPage } from '../details-projet/details-projet';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';




@Component({
  selector: 'page-projet',
  templateUrl: 'projet.html'
})
export class ProjetPage {
  
  projetDepartement :any;
  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController, public navParams:NavParams) {
   
    this.projetDepartement=navParams.get("projetdepartement");
    this.laodProjet(this.projetDepartement.id_cartographie); 
  
  }
 
  goToDetailsProjet(){
    this.navCtrl.push(DetailsProjetPage);
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
  showAlertNoConnexion() {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: 'Vérifiez votre connexion internet!',
      buttons: ['OK']
    });
    alert.present();
    //this.showLoad();
  }
  //http://haitibudget-env-1.max9ppfxgt.us-east-2.elasticbeanstalk.com/getAllEntiteAdministrativeWithDepense
  projet:any;
  public showing= true; 

  laodProjet(projetDepartement : any){
    //this.http.get("http://127.0.0.1/dashboard/fichier.json")
    this.http.get("http://cristalhotelhaiti.com/api/projet.php?id_cartographie="+projetDepartement)


    .map(res=>res.json()) 
    .subscribe(res=>{
      this.projet=res;  
      console.log(this.projet);
      this.hideLoad();
      this.showing = !this.showing;
      console.log("http://localhost/dashboard/api/projet.php?id_cartographie="+projetDepartement);

    },(err) =>{
      console.log(err);
      
      this.showAlertNoConnexion();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodProjet(this.projetDepartement.id_cartographie);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  

}