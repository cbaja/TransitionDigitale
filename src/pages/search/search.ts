import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ProjetPage } from '../projet/projet';
import { AlertController,LoadingController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public http: Http, 
    private nativeStorage: NativeStorage) {
    this.laodBudget(); 
  }
 
  budget:any = []
  budgetFromApi:any = []

  data:any = []
  idBudget:any = []
  annee:any = []
  montant:any = []
  investissement:any = []
  depensebudget:any = []
  libelleBudget:any = []

  
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

  seeProject(){
    this.navCtrl.push(ProjetPage);
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

  public showing = true;
  laodBudget(){

    this.http.get("http://www.bidjepeyidayiti.ht/admin/api/allBudget.php")
      .map(res=>res.json()) 
      .subscribe(res=>{
        this.budget=res;
        this.hideLoad();
        this.showing = !this.showing;
        this.nativeStorage.setItem("haitiBudgetLocal_db_choice", res);
  
      },(err) =>{
       
        console.log(err);
  
        console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_choice"))
        this.nativeStorage.getItem('haitiBudgetLocal_db_choice').then((res) => {
          if(res != null)
          {
            // this.showAlertNoConnexion("C'est données sont en caches");
            this.budget=res;
     
            this.showing = !this.showing;
          }
          else
          {
            this.showAlertNoConnexion("Verifiez votre connexion internet" );
          }
        });
      });
    }

    goToPages(id_choice){
        localStorage.setItem('budget', id_choice.id_budget);
        this.navCtrl.push(TabsPage,{
          id_choice:id_choice.id_budget
      }); 
      
    }

  doRefresh(refresher) {
    this.laodBudget();
    
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}