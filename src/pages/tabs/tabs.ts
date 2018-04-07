import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavController,NavParams} from 'ionic-angular';
import { TerritoirePage } from '../territoire/territoire';
import { StatistiquePage } from '../statistique/statistique';
import{DocumentationPage} from '../documentation/documentation';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = StatistiquePage;
  tab3Root = ContactPage;
  tab4Root =  TerritoirePage;
  tab5Root = DocumentationPage;

  choiceBudget :any;
  idBudget: any;
  annee: any;
  montant: any;
  libelleBudget: any;

  constructor(public navCtrl: NavController,public navParams :NavParams) {
    this.choiceBudget=navParams.get("choiceTake");
    localStorage.setItem('budget', this.choiceBudget);
  }
}
