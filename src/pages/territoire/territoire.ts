import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProjetPage } from '../projet/projet';
// import { Chart } from 'chart.js';
// import * as HighCharts from 'highcharts';
@Component({
  selector: 'page-territoire',
  templateUrl: 'territoire.html'
})
export class TerritoirePage {
    
  constructor(public navCtrl: NavController) {
    
  }
  
  
  sedprojetbydepatement(){
    this.navCtrl.push(ProjetPage);
    
  }
  

}