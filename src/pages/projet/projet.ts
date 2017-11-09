import { Component } from '@angular/core';
import { NavController,ActionSheetController,LoadingController ,AlertController,NavParams} from 'ionic-angular';
//import { DetailsProjetPage } from '../details-projet/details-projet';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'page-projet',
  templateUrl: 'projet.html'
})
export class ProjetPage {
  q :any;
  projetDepartement :any;
  myInput:any;
  projet:any;
  public showing= true; 

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController, 
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
    this.http.get("http://websitedemo.biz/hbws/api/findprojet.php?designation="+projetName)
    .map(res=>res.json()) 
    .subscribe(res=>{
      this.projet=res;  
      console.log(this.projet);
      this.hideLoad();
      this.showing = !this.showing;
    },(err) =>{
      console.log(err);
      this.showAlertNoConnexion();
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
  showAlertNoConnexion() {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: 'Vérifiez votre connexion internet!',
      buttons: ['OK']
    });
    alert.present();

  }
  
  laodProjet(projetDepartement : any){

    this.http.get("http://websitedemo.biz/hbws/api/projet.php?id_cartographie="+projetDepartement)
    .map(res=>res.json()) 
    .subscribe(res=>{
      this.projet=res;  
      console.log(this.projet);
      this.hideLoad();
      this.showing = !this.showing;
      console.log("http://websitedemo.biz/hbws/api/projet.php?id_cartographie="+projetDepartement);
    
    },(err) =>{
      console.log(err);
      this.showAlertNoConnexion();
    });
  }

  laodAllProjet(){
    //this.http.get("http://127.0.0.1/dashboard/fichier.json")
    
    this.http.get("http://websitedemo.biz/hbws/api/projet.php")
    .map(res=>res.json()) 
    .subscribe(res=>{
      this.projet=res;  
      console.log(this.projet);
      this.hideLoad();
      this.showing = !this.showing;    
    },(err) =>{
      console.log(err);
      this.showAlertNoConnexion();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodProjet(this.projetDepartement.id_cartographie);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  

}