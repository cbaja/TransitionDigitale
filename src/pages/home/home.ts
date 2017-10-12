import { Component } from '@angular/core';
import { NavController,LoadingController ,AlertController} from 'ionic-angular';


import { AboutPage } from '../about/about';
import { SearchPage } from '../search/search';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,
    private theInAppBrowser: InAppBrowser,
    public http: Http,public alertCtrl: AlertController) {
    this.laodArticles(); 
  }

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

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
    this.http.get("http://cristalhotelhaiti.com/api/articles.php")
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

  


  openUrl( url:string){
    let target = "_self";
    
    this.theInAppBrowser.create(url,target,this.options);
  }
  /*
  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithCordovaBrowser(url : string){
    let target = "_self";
    this.theInAppBrowser.create(url,target,this.options);
}  */

  goToSearch(){
    this.navCtrl.push(SearchPage);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodArticles();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
}