import { Component } from '@angular/core';
import { NavController,LoadingController ,AlertController,NavParams} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';


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
    public http:Http, public alertCtrl: AlertController,
    private nativeStorage: NativeStorage, public loadingCtrl: LoadingController) {
    this.detailsministere = navParams.get("detailsministere");
    console.log(this.detailsministere)
    this.loadDepense(this.detailsministere.Id_entite);
    this.loadDepensinvestIssemente(this.detailsministere.Id_entite);
    this.ionViewWillEnter();
    this.loadSousEntite(this.detailsministere.Id_entite);
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
  
  showAlertNoConnexion(message) {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
    //this.showLoad();
  }
depense:any;
// faire une requette 
loadDepense(id:any){
  //this.http.get("http://bidjepeyidayiti.ht/admin/fichier.json")
  this.http.get("http://websitedemo.biz/hbws/api/depenses.php?entiteAdministratif="+this.detailsministere.Id_entite)
  .map(res=>res.json()) //JSON.parse(data)
  .subscribe(res=>{
    this.depense=res;
    console.log(this.depense);
    this.nativeStorage.setItem("haitiBudgetLocal_db_depense", res);
    this.hideLoad();
  },(err) =>{
   
    console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_depense"))
    this.nativeStorage.getItem('haitiBudgetLocal_db_depense').then((resDep) => {
          if(resDep != null)
          {
            //this.showAlertNoConnexion("C'est données sont en caches");
            this.depense=resDep;

          }
          else
          {
            this.showAlertNoConnexion("Verifiez votre connexion internet" );
          }
        });
  });
}

investissement:any;
// faire une requette 
loadDepensinvestIssemente(id:any){
  //this.http.get("http://bidjepeyidayiti.ht/admin/fichier.json")
  this.http.get("http://websitedemo.biz/hbws/api/investissement.php?entiteAdministratif="+this.detailsministere.Id_entite)
  .map(res=>res.json()) //JSON.parse(data)
  .subscribe(res=>{
    this.investissement=res;

    this.nativeStorage.setItem("haitiBudgetLocal_db_invest", res);
    this.hideLoad();
  },(err) =>{
    console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_invest"))
    this.nativeStorage.getItem('haitiBudgetLocal_db_invest').then((resI) => {
          if(resI != null)
          {
            // this.showAlertNoConnexion("C'est données sont en caches");
            this.investissement=resI;
          }
          else
          {
            this.showAlertNoConnexion("Verifiez votre connexion internet" );
          }
        });
  });
}

sousEntite: any;

loadSousEntite(id:any){

  // this.http.get("http://bidjepeyidayiti.ht/admin/fichier.json")
  this.http.get("http://websitedemo.biz/hbws/api/sous_entiteAdministrative.php?entiteAdministratif="+this.detailsministere.Id_entite)
  // this.http.get("http://websitedemo.biz/hbws/api/investissement.php?entiteAdministratif="+this.detailsministere.Id_entite)
  .map(res=>res.json()) //JSON.parse(data)
  .subscribe(res=>{
    this.sousEntite=res;
    console.log(this.sousEntite);
    this.nativeStorage.setItem("haitiBudgetLocal_db_sousEntite", res);
    this.hideLoad();
  },(err) =>{
    console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_sousEntite"))
    this.nativeStorage.getItem('haitiBudgetLocal_db_sousEntite').then((resSous) => {
          if(resSous != null)
          {
           // this.showAlertNoConnexion("C'est données sont en caches");
            this.sousEntite=resSous;

          }
          else
          {
            this.showAlertNoConnexion("Verifiez votre connexion internet" );
          }
        });
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