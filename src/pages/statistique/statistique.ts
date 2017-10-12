import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailsProjetPage } from '../details-projet/details-projet';

/**
 * Generated class for the StatistiquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-statistique',
  templateUrl: 'statistique.html',
})
export class StatistiquePage {
    chartOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.chartOptions={
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Budget 2016 - 2017 </a>'
        },
        xAxis: {
            categories: [
            'MPCE','MICT ',
            'MTPTC','MSPP', 
            'MAST', 'MEF', 
            'MTIC', 'ME',
            'MCI'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Monnaie (Gourdes)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' milliards'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 80,
        
            floating: true,
            borderWidth: 1,
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Annee 2017 - 2018',
            data: [7,4,3, 3, 1,3,3,5.6,2]
        }, {
            name: 'Annee 2016 - 2017',
            data: [13,3,7, 8, 2,4,5,6,3]
        }, {
            name: 'Annee 2017 - 2018',
            data: [9, 4, 7, 3, 2,2,3,5,4]
        }]

      }
  }

  gotoDetailsProget(){
    this.navCtrl.push(DetailsProjetPage);
  }
}
