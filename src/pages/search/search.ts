import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProjetPage } from '../projet/projet';



@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController) {

  }
  private seeProject(){
    this.navCtrl.push(ProjetPage);
  }
  
}