import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { SearchPage } from '../search/search';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  
  goToDetails(){
    this.navCtrl.push(AboutPage);
  }

  goToSearch(){
    this.navCtrl.push(SearchPage);
  }
 
  
}