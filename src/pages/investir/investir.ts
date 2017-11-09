import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TerritoirePage } from '../territoire/territoire';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
@Component({
  selector: 'page-investir',
  templateUrl: 'investir.html'
})

export class InvestirPage {
  private chart: AmChart;
  
  constructor(public navCtrl: NavController,private AmCharts: AmChartsService) {
     // calculate which map to be used
     var currentMap;
     var titles = [];
     currentMap = "haitiLow";
     console.log('preparing map...')
   
     // add country title
     titles.push( {
         "text": "Haiti"
     } );
   
     this.chart = this.AmCharts.makeChart( "chartdiv", {
       
       "type": "map",
       "theme": "light",
       "colorSteps": 10,
       "dataProvider": {
         "mapURL": "/lib/3/maps/svg/" + currentMap + ".svg",
         "getAreasFromMap": true,
         "zoomLevel": 0.9,
         "areas": []
       },
       "areasSettings": {
         "autoZoom": true,
         "balloonText": "[[title]]: <strong>[[value]]</strong>"
       },
       "valueLegend": {
         "right": 10,
         "minValue": "little",
         "maxValue": "a lot!"
       },
       "zoomControl": {
         "minZoomLevel": 0.9
       },
       "titles": titles,
       "listeners": [ {
         "event": "init",
         "method": this.updateHeatmap
       } ]
     } );
  }

  updateHeatmap( event ) {
    var map = event.chart;
    if ( map.dataGenerated )
      return;
    if ( map.dataProvider.areas.length === 0 ) {
      setTimeout( this.updateHeatmap, 100 );
      return;
    }
    for ( var i = 0; i < map.dataProvider.areas.length; i++ ) {
      map.dataProvider.areas[ i ].value = Math.round( Math.random() * 10000 );
    }
    map.dataGenerated = true;
    map.validateNow();
  }

  gotoTerrtoire(){
    this.navCtrl.push(TerritoirePage)
  } 

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}