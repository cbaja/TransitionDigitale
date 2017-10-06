import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { InvestirPage } from '../investir/investir';

@Component({
  selector: 'page-ministere-details',
  templateUrl: 'ministere-details.html'
})
export class MinistereDetailsPage {

  detailsministere :any;

  constructor(public navCtrl: NavController, public navParams :NavParams) {
    this.detailsministere = navParams.get("detailsministere");
    console.log(this.detailsministere)
  }

  goToInvest(){
      this.navCtrl.push(InvestirPage);
  }

}