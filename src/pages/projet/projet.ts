import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsProjetPage } from '../details-projet/details-projet';



@Component({
  selector: 'page-projet',
  templateUrl: 'projet.html'
})
export class ProjetPage {

  constructor(public navCtrl: NavController) {

  }
 
  goToDetailsProjet(){
    this.navCtrl.push(DetailsProjetPage);
  }
}