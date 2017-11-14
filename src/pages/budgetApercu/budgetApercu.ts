import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-budgetApercu',
  templateUrl: 'budgetApercu.html'
})

export class budgetApercu {

  constructor(public navCtrl: NavController) {

  }
    choice:string
    ionViewWillEnter(){
     this.choice = "dix"
    }

}