import { Component } from '@angular/core';
import { NavController,ActionSheetController } from 'ionic-angular';
import { MinistereDetailsPage } from '../ministere-details/ministere-details';
import { TerritoirePage } from '../territoire/territoire';
import { StatistiquePage } from '../statistique/statistique';
import { ProjetPage } from '../projet/projet';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController) {

  }
  
    goToDetailsMinistere(){
        this.navCtrl.push(MinistereDetailsPage);
    }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Visualiser le budget par ',
      buttons: [
        {
          text: 'Liste de projet',
          role: 'Secteur',
          handler: () => {
            
            this.navCtrl.push(ProjetPage);
          }
        },{
          text: 'Type de depense',
          handler: () => {

            this.navCtrl.push(StatistiquePage);
          }
        },
        {
          text: 'Region geograhique',
          handler: () => {
          
            this.navCtrl.push(TerritoirePage);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
