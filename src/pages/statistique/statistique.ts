import { Component } from '@angular/core';
import { NavController,NavParams,IonicPage,LoadingController ,AlertController} from 'ionic-angular';
import { DetailsProjetPage } from '../details-projet/details-projet';

import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Generated class for the StatistiquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
*/

import * as $ from 'jquery'

@IonicPage()
@Component({
  selector: 'page-statistique',
  templateUrl: 'statistique.html',
})
export class StatistiquePage {
    chartOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    
    this.laodBudget();

    //$('#stat').hide();

   // var val = this.convert(1221111111,"");
   // alert(val)
  }
   convert(n, cuurent){
    return cuurent+""+n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,"$1,");
}
  changeColor(){
    $('#x').text('beautifullll');
  }
  hidesatat(){
    $('.stat').hide();
  }

  ministere:any;
 

  showData() {
    var arrayAcronym = [];
    var seriesJSONArray = [];
    var arrayMontant = [];

    for(var i = 0; i < this.ministere.length; i++) {
        arrayAcronym.push(this.ministere[i].acronymeEntite);
        arrayMontant.push(this.ministere[i].montantEntite * 1);
        //this.convert
    }

    seriesJSONArray.push({
        "name": 'Année 2017 - 2018',  
        "data": arrayMontant
    });

    $('#stat').hide();

    var chartHeight = this.ministere.length * 30;

    this.chartOptions={
        chart: {
            type: 'bar',
            height: chartHeight
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
           
            categories: arrayAcronym,
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
            valueSuffix: ' Gdes'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{y} gdes'
                },
                label: {
                    style: {
                        fontSize: '8px'
                    }
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: -10,
            maxHeight: 40,
            floating: true,
            borderWidth: 1,
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: seriesJSONArray
        /*series: [{
            name: 'Annee 2017 - 2018',
            data: [7,4,3, 3, 1,3,3,5.6,2]
        }/*, {
            name: 'Annee 2016 - 2017',
            data: [13,3,7, 8, 2,4,5,6,3]
        }, {
            name: 'Annee 2017 - 2018',
            data: [9, 4, 7, 3, 2,2,3,5,4]
        }]*/


      }
  }


  showLoad() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  }
  
  hideLoad() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    loading.dismiss();
  }
  showAlertNoConnexion() {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: 'Vérifiez votre connexion internet!',
      buttons: ['OK']
    });
    alert.present();
    //this.showLoad();
  }

  public showing = true;

  laodBudget(){
    //this.http.get("http://127.0.0.1/dashboard/fichier.json")
    this.http.get("http://websitedemo.biz/hbws/api/entiteAdministrative.php")
    .map(res=>res.json()) //JSON.parse(data)
    .subscribe(res=>{
      this.ministere=res;


      console.log(this.ministere);
      this.hideLoad();

      this.showing = !this.showing;

      this.showData();
    },(err) =>{
      console.log(err);
      
      this.showAlertNoConnexion();
    });
  }


  gotoDetailsProget(){
    this.navCtrl.push(DetailsProjetPage);
  }

 
}
