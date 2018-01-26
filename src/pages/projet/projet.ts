import { Component } from '@angular/core';
import { NavController,ActionSheetController,LoadingController ,AlertController,NavParams} from 'ionic-angular';
//import { DetailsProjetPage } from '../details-projet/details-projet';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-projet',
  templateUrl: 'projet.html'
})
export class ProjetPage {
  budget: any = localStorage.getItem("budget") 
  
  q :any;
  projetDepartement :any;
  myInput:any;
  projet:any;
  public showing= true; 

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    public navParams:NavParams) {
   
    this.projetDepartement=navParams.get("projetdepartement");
   
    if(this.projetDepartement==null){
      this.laodAllProjet();
    }else{
      this.laodProjet(this.projetDepartement.id_cartographie); 
    }
  }
  findProjet(e){
    if(this.myInput!=""){
      var newmyInput = this.myInput.replace(/'/g,"");
      this.laodProjetByName(newmyInput);
    }else{
      console.log("Entrer quelque chose");
    } 
  }

  laodProjetByName(projetName : any){
    this.http.get("http://bidjepeyidayiti.ht/admin/api/findprojet.php?designation="+projetName+"&budget="+this.budget)
    .map(res=>res.json()) 
    .subscribe(res=>{
      this.projet=res;  
      console.log(this.projet);
      this.nativeStorage.setItem("haitiBudgetLocal_db_projet", res);
      this.hideLoad();
      this.showing = !this.showing;
    },(err) =>{
      console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_projet"))
      
            this.nativeStorage.getItem('haitiBudgetLocal_db_projet').then((resPro) => {
            if(resPro != null)
            {
              this.showAlertNoConnexion("C'est données sont en caches");
              this.projet=resPro;
              this.showing = !this.showing;
            }
            else
            {
              this.showAlertNoConnexion("Vous n'avez pas les données en cache, verifiez votre connexion internet" );
            }
          });
    });
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

  }
  
  laodProjet(projetDepartement : any){
   
   this.http.get(" http://bidjepeyidayiti.ht/admin/api/projet.php?id_cartographie="+projetDepartement)
   // this.http.get("http://websitedemo.biz/hbws/api/projet.php?id_cartographie="+projetDepartement)
    .map(res=>res.json()) 
    .subscribe(res=>{
      this.projet=res;  
      console.log(this.projet);
      this.hideLoad();
      this.showing = !this.showing;
      this.nativeStorage.setItem("haitiBudgetLocal_db_projet", res);
    },(err) =>{
      console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_projet"))
            this.nativeStorage.getItem('haitiBudgetLocal_db_projet').then((resPro) => {
            if(resPro != null){
              this.showAlertNoConnexion("C'est données sont en caches");
              this.projet=resPro;
              this.showing = !this.showing;
            }else{
              this.showAlertNoConnexion("Vous n'avez pas les données en cache, verifiez votre connexion internet" );
            }
          });
    });
  }

  laodAllProjet(){
    
    this.http.get("http://bidjepeyidayiti.ht/admin/api/projet.php?budget="+this.budget)
    //this.http.get("http://websitedemo.biz/hbws/api/projet.php")
    
    .map(res=>res.json()) 
    .subscribe(res=>{
      this.projet=res;  
      console.log(this.projet);
      this.nativeStorage.setItem("haitiBudgetLocal_db_projet", res);
      this.hideLoad();
      this.showing = !this.showing;    
    },(err) =>{
      this.nativeStorage.getItem('haitiBudgetLocal_db_projet').then((resPro) => {
        if(resPro != null){
          // this.showAlertNoConnexion("C'est données sont en caches");
          this.projet=resPro;
          this.showing = !this.showing;
        }else{
          this.showAlertNoConnexion("Verifiez votre connexion internet");
        }
      });
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodAllProjet();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}