import { Component } from '@angular/core';import { Http} from '@angular/http';
import { NavController,LoadingController ,AlertController} from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DocumentationPage } from '../documentation/documentation';
import { DetailsFinancementPage } from '../detail_financement/detail_financement';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-sources-financement',
  templateUrl: 'sources-financement.html'
})
export class SourcesFinancementPage {
  budget: any = localStorage.getItem("budget") 
  
  financement:any;
  public showing= true; 
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,
    private nativeStorage: NativeStorage, public loadingCtrl: LoadingController,
    public http: Http) {
    this.laodFinancement();
  }

  laodFinancement(){
    // this.http.get("http://websitedemo.biz/hbws/api/financement.php")
    this.http.get("http://bidjepeyidayiti.ht/admin/api/financement.php?budget="+this.budget)
    

    .map(res=>res.json()) 
    .subscribe(res=>{
      this.financement=res;  
      console.log(this.financement);
      this.hideLoad();
      this.showing = !this.showing;
      this.nativeStorage.setItem("haitiBudgetLocal_db_finance", res);
    },(err) =>{
      console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_finance"))
      
          this.nativeStorage.getItem('haitiBudgetLocal_db_finance').then((resSources) => {
            if(resSources != null)
            {
              //this.showAlertNoConnexion("C'est données sont en caches");
              this.financement=resSources;
              this.showing = !this.showing;
            }
            else
            {
              this.showAlertNoConnexion("Verifiez votre connexion internet" );
            }
          });
    });
  }

  detailsSource(choiceSources){
  
    this.navCtrl.push(DetailsFinancementPage,{
      choiceSources:choiceSources
    });
    
  } 

  /*
   goToPages(choiceTake){
    this.navCtrl.push(TabsPage,{
      choiceTake:choiceTake
   });
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

  goToDocumentation(){
    this.navCtrl.push(DocumentationPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodFinancement();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}