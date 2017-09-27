import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { TerritoirePage } from '../territoire/territoire';
import { StatistiquePage } from '../statistique/statistique';


import{DocumentationPage} from '../documentation/documentation';
/*
import{SourcesFinancementPage} from '../sources-financement/sources-financement';
*/
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = StatistiquePage;
  /*tab3Root = SourcesFinancementPage;
  tab4Root = DocumentationPage;*/ 
  tab3Root = ContactPage;
  tab4Root = TerritoirePage;
  tab5Root = DocumentationPage;

  
  constructor() {

  }
}
