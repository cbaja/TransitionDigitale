import { Component } from '@angular/core';
import { NavController,ActionSheetController,LoadingController ,AlertController,NavParams} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-detail-financement',
  templateUrl: 'detail_financement.html'
})

export class DetailsFinancementPage {  

  public financePass :any;
  public detail_finance:any=[];
  public showing= true; 

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    public navParams:NavParams) {
      this.financePass=navParams.get("choiceSources");
      if(this.financePass==null){
        this.laodDetailsFinancement(1);
      }else{
        this.laodDetailsFinancement(this.financePass.id_sources); 
      }
    }

    laodDetailsFinancement(idFin : any){
      //this.http.get("http://bidjepeyidayiti.ht/admin/api/projet.php?id_cartographie="+projetDepartement)
      this.http.get("http://bidjepeyidayiti.ht/admin/api/datail_souces.php?idFinance="+idFin)
       .map(res=>res.json()) 
       .subscribe(res=>{
         this.detail_finance=res;  
         console.log(this.detail_finance);
         this.hideLoad();
         this.showing = !this.showing;
         this.nativeStorage.setItem("haitiBudgetLocal_db_projet", res);
       },(err) =>{
         console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_projet"))
               this.nativeStorage.getItem('haitiBudgetLocal_db_projet').then((resPro) => {
               if(resPro != null){
                 // this.showAlertNoConnexion("C'est données sont en caches");
                 this.detail_finance=resPro;
                 this.showing = !this.showing;
               }else{
                // this.showAlertNoConnexion("Vous n'avez pas les données en cache, verifiez votre connexion internet" );
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
    
  
    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      this.laodDetailsFinancement(1);
  
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }
}
