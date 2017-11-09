import { Component } from '@angular/core';
import { NavController, ViewController} from 'ionic-angular';
import { ProjetPage } from '../projet/projet';



@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController , public viewCtrl: ViewController) {

  }
  seeProject(){
    this.navCtrl.push(ProjetPage);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}