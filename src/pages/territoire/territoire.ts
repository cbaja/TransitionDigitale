import { Component } from '@angular/core';
import { NavController,LoadingController ,AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

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

declare var AmCharts: any;
//import * as $ from 'jquery'

@Component({
  selector: 'page-territoire',
  templateUrl: 'territoire.html'
  
})
export class TerritoirePage {
  //private chart: AmChart;
  budget: any ;

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
    private nativeStorage: NativeStorage,
    private theInAppBrowser: InAppBrowser) {
      this.budget = localStorage.getItem("budget");
      this.loadBudgetDepartement();
      this.loadBudgetDepartementMap();
    
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

  showAlertNoConnexion(message:any) {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
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
    this.budget = localStorage.getItem("budget");
    this.http.get("http://bidjepeyidayiti.ht/admin/api/cartographieBudget.php?budget="+this.budget)
    .map(res=>res.json()) //JSON.parse(data)
    .subscribe(res=>{
      this.departement=res;
      console.log(this.departement);
      this.hideLoad();
      this.nativeStorage.setItem("haitiBudgetLocal_db_territoire", res);
      this.showing = false;
    },(err) =>{
      this.showing = false;
      this.nativeStorage.getItem('haitiBudgetLocal_db_territoire').then((resdepartement) => {
        if(resdepartement != null)
        {
         // this.showAlertNoConnexion("C'est données sont en caches");
         this.showing = false;
        }
        else
        {
          this.showAlertNoConnexion("verifiez votre connexion internet" );
        }
      });
    });
  }
  
  loadBudgetDepartementMap(){
    
    this.http.get("http://www.bidjepeyidayiti.ht/admin/api/v2/getHaitiMapData/index.php")
    .map(res=>res.json())
    .subscribe(res=>{
      for(let item of res.svg.g.path){
        item.title = item.title+'<button>wayway</button>';
      }

      AmCharts.maps.current = res;

      var map = AmCharts.makeChart("chartdiv",{
        "type":"map",
        "touchClickDuration":200,
        "dataProvider":{
          "map":"current",
          "getAreasFromMap": true,
        },
        "areasSetting":{
          "selectedColor": "#cc00000",
          "selectable": true
        }
      }) ;

      map.addListener("clickMapObject",(event)=>{
        alert("okok")
      });
      
      // this.departement=res;
      // console.log(AmCharts.maps.current );
      this.hideLoad();
      this.nativeStorage.setItem("haitiBudgetLocal_db_territoire", res);

      this.showing = false
    },(err) =>{
 
      this.nativeStorage.getItem('haitiBudgetLocal_db_territoire').then((resdepartement) => {
        if(resdepartement != null)
        {
          // this.showAlertNoConnexion("C'est données sont en caches");
          this.departement=resdepartement;
          this.showing = !this.showing;
        }
        else
        {
          this.showAlertNoConnexion("verifiez votre connexion internet" );
        }
      });
    });
  }
 
  sedprojetbydepatement(projetdepartement){
    this.navCtrl.push(ProjetPage,{
      projetdepartement:projetdepartement
     });
  }
  /*
  test(a){
    alert(a)
  }
  */
}