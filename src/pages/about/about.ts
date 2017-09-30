import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  thePost :any;
  constructor(public navCtrl: NavController, public navParams :NavParams ) {
 
   this.thePost=navParams.get("thePost");

  }

}