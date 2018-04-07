import { Component } from '@angular/core';
import { NavController,LoadingController ,AlertController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NativeStorage } from '@ionic-native/native-storage';
import { SQLite ,SQLiteObject } from '@ionic-native/sqlite';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html'
})

export class ChoicePage {

  budget:any = []
  public db:SQLiteObject;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public http: Http,
    public alertCtrl: AlertController,
    private nativeStorage: NativeStorage,

    public sqlite: SQLite) {
     this.laodBudget(); 

  }

 
/*
  public retriveData(){
   this.budget=[]
   return this.db.executeSql('select * from `budget_lite`', {})
    .then((data) => {
      if (data==null){ return;}
      if(data.rows){
        if(data.rows.length>0){
          for (var i =0 ; i<data.rows.length; i++){
            this.budget.push({
              id_budget:  data.rows.item(i).id_budget,
              annee:data.rows.item(i).annee,
              montant: data.rows.item(i).montant,
              investissement: data.rows.item(i).investissement,
              depensebudget: data.rows.item(i).depensebudget,
              libelleBudget: data.rows.item(i).libelleBudget
             })
          }
          alert(this.budget.length)
          return this.budget
        }
      }
    })
    .catch(e => console.log(e));
  }
*/


  // On va creer un nouveau tableau
  
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

  this.http.get("http://bidjepeyidayiti.ht/admin/api/budget.php")
    .map(res=>res.json()) 
    .subscribe(res=>{
      this.budget=res;
      this.hideLoad();
      this.showing = !this.showing;
      this.nativeStorage.setItem("haitiBudgetLocal_db_choice", res);
      this.goToPages()

    },(err) =>{
      this.goToPages();
      console.log(err);
  
      console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_choice"))
      this.nativeStorage.getItem('haitiBudgetLocal_db_choice').then((res) => {
        if(res != null)
        {
          // this.showAlertNoConnexion("C'est données sont en caches");
          this.budget=res;
          this.goToPages();
          this.showing = !this.showing;
        }
        else
        {
          this.showAlertNoConnexion("Verifiez votre connexion internet" );
        
        }
      });
    });
  }

  goToPages(){
    var arr = [];
    arr = this.budget;
    var  choiceTake = 1;
      for(var i=0; i<arr.length; i++){
      choiceTake = this.budget[i].id_budget
      this.navCtrl.push(TabsPage,{
        choiceTake:choiceTake
    });
    }
  }

  doRefresh(refresher) {
    this.laodBudget();
    
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
