import { Component } from '@angular/core';
import { NavController,NavParams,IonicPage,LoadingController ,AlertController} from 'ionic-angular';
import { DetailsProjetPage } from '../details-projet/details-projet';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var Plotly: any;
declare var Chart: any;
declare var $: any;
declare var google: any;

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

   budget: any = localStorage.getItem("budget") 
   annee:any = localStorage.getItem("annee") 
   loadingData;
   depenses;
   recettes;
   taux: any = [];
   sources: any = [];

   
   
  constructor(public navCtrl: NavController, public navParams: NavParams,
    
    public loadingCtrl: LoadingController,public http: Http,
    private nativeStorage: NativeStorage,public alertCtrl: AlertController) {
    
    this.laodBudget();

    //this.myStat();
    //$('#stat').hide();

    // var val = this.convert(1221111111,"");
    // alert(val)
    //
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
    }

    seriesJSONArray.push({
        "name": this.annee,  
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
        /*
        series: [{
            name: 'Annee 2017 - 2018',
            data: [7,4,3, 3, 1,3,3,5.6,2]
        }/*, {
            name: 'Annee 2016 - 2017',
            data: [13,3,7, 8, 2,4,5,6,3]
        }, {
            name: 'Annee 2017 - 2018',
            data: [9, 4, 7, 3, 2,2,3,5,4]
        }]
        */
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
  showAlertNoConnexion(message:any) {
    let alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
    //this.showLoad();
  }

  public showing = true;

  laodBudget(){
    this.budget = localStorage.getItem("budget");
    //this.http.get("http://bidjepeyidayiti.ht/admin/fichier.json")
    this.http.get("http://bidjepeyidayiti.ht/admin/api/entiteAdministrative.php?budget="+this.budget)
    //this.http.get("http://websitedemo.biz/hbws/api/entiteAdministrative.php")
    .map(res=>res.json()) //JSON.parse(data)
    .subscribe(res=>{
      this.ministere=res;
      console.log(this.ministere);
      this.hideLoad();
      this.showing = !this.showing;
      this.nativeStorage.setItem("haitiBudgetLocal_db_statistique", res);
      this.showData();
    },(err) =>{
        console.log(err);
        
            console.log(this.nativeStorage.getItem("haitiBudgetLocal_db_statistique"))
            this.nativeStorage.getItem('haitiBudgetLocal_db_statistique').then((resStat) => {
              if(resStat != null)
              {
                this.showAlertNoConnexion("C'est données sont en caches");
                this.ministere=resStat;
                this.showData();
                this.showing = !this.showing;

              }
              else
              {
                this.showAlertNoConnexion("Vous n'avez pas les données en cache, verifiez votre connexion internet" );
              }
            });
      
    
    });
  }


  gotoDetailsProget(){
    this.navCtrl.push(DetailsProjetPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.laodBudget();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
/*
  public myStat(){

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => { this.drawChart() });

    var myChart1 = new Chart($('#chart-recette-collectees'), {
      type: 'bar',
      data: {
        labels: ['recettes fiscales', 'recettes internes', 'recettes douanières', 'autres ressources fiscales'],
        datasets: [{
          label: 'Recettes collectées Oct 2017- Déc 2017',
          data: [21342, 14616, 6686, 40],
          backgroundColor: [
            'rgba(237, 125, 49, 1)',
            'rgba(237, 125, 49, 1)',
            'rgba(237, 125, 49, 1)',
            'rgba(237, 125, 49, 1)'
          ],
        }, {
          label: 'Prévisions exercice fiscal 17-18',
          data: [93446, 73809, 19089, 548],
          backgroundColor: [
            'rgba(91, 155, 213, 1)',
            'rgba(91, 155, 213, 1)',
            'rgba(91, 155, 213, 1)',
            'rgba(91, 155, 213, 1)'
          ],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            display: false
          }]
        }
      }
    });
    var myChart2 = new Chart($('#chart-depenses-effectuees'), {
      type: 'bar',
      data: {
        labels: ['Dépenses totales', 'Dépenses courrantes', 'Investissements'],
        datasets: [{
          label: 'Dépenses effectuées Oct 2017- Déc 2017',
          data: [20276, 19839, 437],
          backgroundColor: [
            'rgba(237, 125, 49, 1)',
            'rgba(237, 125, 49, 1)',
            'rgba(237, 125, 49, 1)',
            'rgba(237, 125, 49, 1)'
          ],
        }, {
          label: 'Prévisions exercice fiscal 17-18',
          data: [133132, 73326, 59805],
          backgroundColor: [
            'rgba(91, 155, 213, 1)',
            'rgba(91, 155, 213, 1)',
            'rgba(91, 155, 213, 1)',
            'rgba(91, 155, 213, 1)'
          ],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


    var myLineChart = new Chart($('#chart-inflation'), {
      type: 'line',
      data: {
        labels: [
          'Feb-17', 'Mar-17', 'Apr-17', 'May-17', 'Jun-17', 'Jul-17',
          'Aug-17', 'Sep-17', 'Oct-17', 'Nov-17', 'Dec-17', 'Jan-18', 'Feb-18'
        ],
        datasets: [{
          data: [13.9, 14.3, 14.6, 15.5, 15.8, 15.6, 15.6, 15.4, 14.4, 13.7, 13.3, 13.2, 13.2],
          label: "Inflation",
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(237, 125, 49, 1)'
        }]
      },
      options: {

      }
    });
  }

  drawChart() {
    var data1 = google.visualization.arrayToDataTable([
      ['Year', 'Recettes collectées Oct 2017- Déc 2017', 'Prévisions exercice fiscal 17-18'],
      ['Recettes fiscales', 21342, 93446],
      ['Recettes internes', 14616, 73809],
      ['Recettes douanières', 6686, 19089],
      ['Autres ressources fiscales', 40, 548],
    ]);
        

    var options1 = {
      title: '',
      legend: { position: 'top', maxLines: 4, alignment: 'center' },
      chartArea:{
        top:40
      }
    };
    var chart1 = new google.visualization.ColumnChart(document.getElementById('chart-recette-collectees'));
    chart1.draw(data1, options1);

    var data2 = google.visualization.arrayToDataTable([
      ['Year', 'Dépenses effectuées Oct 2017- Déc 2017', 'Prévisions exercice fiscal 17-18'],
      ['Dépenses totales', 20276, 133132],
      ['Dépenses courrantes', 19839, 73326],
      ['Investissements', 437, 59805]
    ]);

    var options2 = {
      title: '',
      legend: { position: 'top', maxLines: 4, alignment: 'center' },
      chartArea:{
        top:40
      }
    };
    var chart2 = new google.visualization.ColumnChart(document.getElementById('chart-depenses-effectuees'));
    chart2.draw(data2, options2);
    var data3 = google.visualization.arrayToDataTable([
      ['Year', 'Dépenses courrantes effectuées Oct 2017- Déc 2017', 'Prévisions exercice fiscal 17-18'],
      ['Dépenses courrantes', 19839, 73326],
      ['Traitements et salaires', 10639, 39872],
      ['Achats de biens et de sevices', 6902, 20317],
      ['Transferts et subventions', 1888, 10027],
      ["Versements d'intérêts", 411, 3111],
    ]);

    var options3 = {
      title: '',
      legend: { position: 'top', maxLines: 4, alignment: 'center' },
      chartArea:{
        height:'50%',
        top:40
      }
    };
    var chart3 = new google.visualization.ColumnChart(document.getElementById('chart-depenses-courrantes-effectuees'));
    chart3.draw(data3, options3);

    var data4 = google.visualization.arrayToDataTable([
      ['Year', 'Financement effectif Oct 2017- Déc 2017', 'Prévisions exercice fiscal 17-18'],
      ['Financement total (net)', 2962, 15663],
      ['Financement interne (net)', 3978, 16653],
      ['Financement externe (net)', -1016, -990]
    ]);
    var options4 = {
      title: '',
      legend: { position: 'top', maxLines: 4, alignment: 'center' },
      chartArea:{
        top:40
      }
    };
    var chart4 = new google.visualization.ColumnChart(document.getElementById('chart-financement-collectees'));
    chart4.draw(data4, options4);

    var data5 = google.visualization.arrayToDataTable([
      ['Task', 'Montant'],
      ['Recettes internes', 73.81],
      ['Recettes douanières', 19.09],
      ['Autres ressources domestiques', 0.55],
      ['Appui budgétaire global', 3.37],
      ['Aides projets', 20.65],
      ['Tirages sur emprunt', 5.06],
      ['Bons du trésor', 3.27],
      ['Autres financements internes des projets', 18.81]
    ]);
    var options5 = {
      title: null,
      is3D: true,
      legend: { position: 'top', maxLines: 5, alignment: 'center' },
    };

    var chart5 = new google.visualization.PieChart(document.getElementById('chart-prevision-recettes'));

    chart5.draw(data5, options5);

    var data6 = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Salaires et traitements', 39.87],
      ['Biens et services', 20.32],
      ['Transferts et subventions', 10.03],
      ['Intérêts de la dette', 3.11],
      ['Immobilisations', 0.93],
      ['Programmes et projets', 58.88],
      ['Amortissement de la dette', 11.07]
    ]);

    var options6 = {
      title: null,
      is3D: true,
      legend: { position: 'top', maxLines: 4, alignment: 'center' },
    };

    var chart6 = new google.visualization.PieChart(document.getElementById('chart-prevision-depenses'));

    chart6.draw(data6, options6);
  }
  */
 
}
