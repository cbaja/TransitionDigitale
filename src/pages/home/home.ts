import { Component } from '@angular/core';
import { NavController,LoadingController ,AlertController} from 'ionic-angular';


import { AboutPage } from '../about/about';
// import { SearchPage } from '../search/search';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public http: Http,public alertCtrl: AlertController) {
    this.laodArticles(); 
  }


  articles:any;
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
  laodArticles(){
  this.http.get("http://websitedemo.biz/hbws/api/articles.php")
  //this.http.get("http://127.0.0.1/dashboard/api/articles.php")
 
    .map(res=>res.json()) 
    .subscribe(res=>{
      this.articles=res;
      console.log(this.articles);
      this.hideLoad();
      this.showing = !this.showing;
    },(err) =>{
      console.log(err);
      
      this.showAlertNoConnexion();
    });
  }

  goToDetails(detailsArticles){
   
    this.navCtrl.push(AboutPage,{
      detailsArticles:detailsArticles
     
   });
  }

/*
  goToSearch(){
    //this.navCtrl.push(SearchPage);
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }
  */
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodArticles();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
}

/*
  com.compu.haitibudget
  0.0.1
  0.0.1
 */
