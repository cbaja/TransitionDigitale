import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { OneSignal } from '@ionic-native/onesignal';
import { IonicStorageModule } from '@ionic/storage';

import { MinistereDetailsPage } from '../pages/ministere-details/ministere-details';
import { AboutPage } from '../pages/about/about';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TerritoirePage } from '../pages/territoire/territoire';
import { SourcesFinancementPage } from '../pages/sources-financement/sources-financement';

import { StatistiquePage } from '../pages/statistique/statistique';
import { DetailsFinancementPage } from '../pages/detail_financement/detail_financement'; 
import { ProjetPage } from '../pages/projet/projet';
import { SearchPage } from '../pages/search/search';
import { DetailsProjetPage } from '../pages/details-projet/details-projet';

import { DocumentationPage } from '../pages/documentation/documentation'; 
import { SecteurPage } from '../pages/secteur/secteur'; 

import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { PeopleServiceProvider } from '../providers/people-service/people-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { entiteBySecteur } from '../pages/entiteBySecteur/entiteBySecteur'; 
import { budgetApercu } from '../pages/budgetApercu/budgetApercu'; 
import { ChoicePage } from '../pages/choice/choice';
import { NativeStorage } from '@ionic-native/native-storage';

import { SQLite } from '@ionic-native/sqlite';


@NgModule({
  declarations: [
    MyApp,
    DetailsProjetPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MinistereDetailsPage,
    StatistiquePage,
    TerritoirePage,
    DetailsFinancementPage,
    ProjetPage,
    SearchPage,
    SourcesFinancementPage,
    DocumentationPage,
    SecteurPage,
    entiteBySecteur,
    budgetApercu,
    ChoicePage,    
  ],
  imports: [
   
    BrowserModule,HttpModule,AmChartsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartModule.forRoot(highcharts),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailsProjetPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MinistereDetailsPage,
    TerritoirePage,
    DetailsFinancementPage,
    ProjetPage,
    SearchPage,
    StatistiquePage,
    SourcesFinancementPage,
    DocumentationPage,
    SecteurPage,
    entiteBySecteur,
    budgetApercu,
    ChoicePage,
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,InAppBrowser,SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PeopleServiceProvider,
    SQLite,
    NativeStorage,OneSignal
  ]
})
export class AppModule {}
