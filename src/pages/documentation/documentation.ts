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
import { NativeStorage } from '@ionic-native/native-storage';


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
    private nativeStorage: NativeStorage,

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

showAlertNoConnexion(message:any) {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: message,
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
    //this.http.get("http://websitedemo.biz/hbws/api/document.php")//
    this.http.get("http://bidjepeyidayiti.ht/admin/api/document.php")
 
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
      this.nativeStorage.setItem("haitiBudgetLocal_db_doc", res);

    },(err) =>{
      console.log(err);
      console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_doc"))
  
      this.nativeStorage.getItem('haitiBudgetLocal_db_doc').then((resDoc) => {
        if(resDoc != null)
        {
          //this.showAlertNoConnexion("C'est données sont en caches");
          this.documentBudget=resDoc;
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