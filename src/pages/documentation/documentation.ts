import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import {PeopleServiceProvider} from '../../providers/people-service/people-service';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-documentation',
  templateUrl: 'documentation.html',
  providers:[PeopleServiceProvider]

})

export class DocumentationPage {
  documentBudget : any ; //= any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private http: Http,
    public loadingCtrl: LoadingController,
    private theInAppBrowser: InAppBrowser,
    public peopleServiceProvider: PeopleServiceProvider) {
    this.laodDocumentBudget(); 
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

openUrl(url:string){
  let target = "_blank";
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
  showAlertNoConnexion() {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: 'Vérifiez votre connexion internet!',
      buttons: ['OK']
    });
    alert.present();
    //this.showLoad();
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
  
  public showing = true;
  
  laodDocumentBudget(){
    this.http.get("http://websitedemo.biz/hbws/api/document.php")//
    //this.http.get("http://127.0.0.1/dashboard/api/document.php")
 
    .map(res=>res.json())
    .subscribe(res=>{

      this.documentBudget=res;
      /*  
        var myTable = [];
        myTable.push(res);
        this.documentBudget=myTable;
      */
      console.log(this.documentBudget);
      this.hideLoad()
      this.showing = !this.showing;
    },(err) =>{
      console.log(err);
      // alert(err)
      this.showAlertNoConnexion();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodDocumentBudget();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  goToDocument(){
    this.navCtrl.push(AboutPage);
  }

  showdetails(thePost){
    this.navCtrl.push(AboutPage,{
      thePost:thePost
  });

  }  
}