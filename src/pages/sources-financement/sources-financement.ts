import { Component } from '@angular/core';import { Http} from '@angular/http';
import { NavController,LoadingController ,AlertController} from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DocumentationPage } from '../documentation/documentation';



@Component({
  selector: 'page-sources-financement',
  templateUrl: 'sources-financement.html'
})
export class SourcesFinancementPage {
  financement:any;
  public showing= true; 
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public loadingCtrl: LoadingController,
    public http: Http) {
    this.laodFinancement();
  }
  laodFinancement(){
    this.http.get("http://websitedemo.biz/hbws/api/financement.php")
    .map(res=>res.json()) 
    .subscribe(res=>{
      this.financement=res;  
      console.log(this.financement);
      this.hideLoad();
      this.showing = !this.showing;
    },(err) =>{
      console.log(err);
      this.showAlertNoConnexion();
    });
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
  goToDocumentation(){
    this.navCtrl.push(DocumentationPage);
  }

}