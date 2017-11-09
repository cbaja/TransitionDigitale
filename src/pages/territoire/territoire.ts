import { Component } from '@angular/core';
import { NavController,LoadingController ,AlertController } from 'ionic-angular';

import { ProjetPage } from '../projet/projet';
// import { Chart } from 'chart.js';
// import * as HighCharts from 'highcharts';
// import { AmChartsService, /*AmChart*/ } from "@amcharts/amcharts3-angular";
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import * as $ from 'jquery'
@Component({
  selector: 'page-territoire',
  templateUrl: 'territoire.html'
  
})
export class TerritoirePage {
  //private chart: AmChart;

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

  constructor(public navCtrl: NavController,
    //private AmCharts: AmChartsService,
    public http:Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    private theInAppBrowser: InAppBrowser) {
      this.loadBudgetDepartement();
     
      
  }
 onViewLoad(){
  this.showLoad()
 }

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
  }  
  
/*
  changeColor(){

    $('.bar').css({
        "background":"#000",
        'text-color':'red'
    }, alert("ok hu"));

  }
  */
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
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.loadBudgetDepartement();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  

  departement:any;
  // faire une requette 

  public showing = true; 

  loadBudgetDepartement(){
    //this.http.get("http://127.0.0.1/dashboard/fichier.json")
    this.http.get("http://websitedemo.biz/hbws/api/cartographieBudget.php")
    //this.http.get("http://127.0.0.1/dashboard/api/cartographieBudget.php")
    .map(res=>res.json()) //JSON.parse(data)
    .subscribe(res=>{
      this.departement=res;
      console.log(this.departement);
      this.hideLoad();
      //this.showing = false;
      this.showing = !this.showing;
    },(err) =>{
      console.log(err);
      this.showAlertNoConnexion();
    });
  }
  sedprojetbydepatement(projetdepartement){
    this.navCtrl.push(ProjetPage,{
      projetdepartement:projetdepartement
     });

  }

}