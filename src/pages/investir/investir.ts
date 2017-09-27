import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProjetPage } from '../projet/projet';
@Component({
  selector: 'page-investir',
  templateUrl: 'investir.html'
})
export class InvestirPage {

  constructor(public navCtrl: NavController) {

  }

  seeProject(){
    this.navCtrl.push(ProjetPage)
  }

}