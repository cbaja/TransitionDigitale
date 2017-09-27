import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DocumentationPage } from '../documentation/documentation';


@Component({
  selector: 'page-sources-financement',
  templateUrl: 'sources-financement.html'
})
export class SourcesFinancementPage {

  constructor(public navCtrl: NavController) {

  }
  
  goToDocumentation(){
    this.navCtrl.push(DocumentationPage);
  }

}