import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InvestirPage } from '../investir/investir';

@Component({
  selector: 'page-ministere-details',
  templateUrl: 'ministere-details.html'
})
export class MinistereDetailsPage {

  constructor(public navCtrl: NavController) {

  }

   goToInvest(){
      this.navCtrl.push(InvestirPage);
  }


}