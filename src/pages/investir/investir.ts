import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProjetPage } from '../projet/projet';
import { TerritoirePage } from '../territoire/territoire';
@Component({
  selector: 'page-investir',
  templateUrl: 'investir.html'
})
export class InvestirPage {

  constructor(public navCtrl: NavController) {

  }

  gotoTerrtoire(){
    this.navCtrl.push(TerritoirePage)
  }


}