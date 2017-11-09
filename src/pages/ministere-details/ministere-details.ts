import { Component } from '@angular/core';
import { NavController,LoadingController ,AlertController,NavParams} from 'ionic-angular';
import { InvestirPage } from '../investir/investir';

import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-ministere-details',
  templateUrl: 'ministere-details.html'
})
export class MinistereDetailsPage {

  detailsministere :any;

  constructor(public navCtrl: NavController, public navParams :NavParams,
    public http:Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.detailsministere = navParams.get("detailsministere");
    console.log(this.detailsministere)
    this.loadDepense(this.detailsministere.Id_entite);
    this.loadDepensinvestIssemente(this.detailsministere.Id_entite);
    this.ionViewWillEnter();
    this.loadSousEntite(this.detailsministere.Id_entite);
  }

  goToInvest(){
      this.navCtrl.push(InvestirPage);
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
depense:any;
// faire une requette 
loadDepense(id:any){
  //this.http.get("http://127.0.0.1/dashboard/fichier.json")
  this.http.get("http://websitedemo.biz/hbws/api/depenses.php?entiteAdministratif="+this.detailsministere.Id_entite)
  .map(res=>res.json()) //JSON.parse(data)
  .subscribe(res=>{
    this.depense=res;
    console.log(this.depense);
    this.hideLoad();
  },(err) =>{
    console.log(err);
    this.showAlertNoConnexion();
  });
}

investissement:any;
// faire une requette 
loadDepensinvestIssemente(id:any){
  //this.http.get("http://127.0.0.1/dashboard/fichier.json")
  this.http.get("http://websitedemo.biz/hbws/api/investissement.php?entiteAdministratif="+this.detailsministere.Id_entite)
  .map(res=>res.json()) //JSON.parse(data)
  .subscribe(res=>{
    this.investissement=res;
    console.log(this.investissement);
    this.hideLoad();
  },(err) =>{
    console.log(err);
    this.showAlertNoConnexion();
  });
}

sousEntite: any;

loadSousEntite(id:any){

  // this.http.get("http://127.0.0.1/dashboard/fichier.json")
  this.http.get("http://websitedemo.biz/hbws/api/sous_entiteAdministrative.php?entiteAdministratif="+this.detailsministere.Id_entite)
  // this.http.get("http://websitedemo.biz/hbws/api/investissement.php?entiteAdministratif="+this.detailsministere.Id_entite)
  .map(res=>res.json()) //JSON.parse(data)
  .subscribe(res=>{
    this.sousEntite=res;
    console.log(this.sousEntite);
    this.hideLoad();
  },(err) =>{
    console.log(err);
    this.showAlertNoConnexion();
  });
}

choice:string

ionViewWillEnter(){
this.choice = "dep"

}
doRefresh(refresher) {
  console.log('Begin async operation', refresher);
  this.loadDepense(this.detailsministere.Id_entite);
  this.loadDepensinvestIssemente(this.detailsministere.Id_entite);

  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 2000);
}
}