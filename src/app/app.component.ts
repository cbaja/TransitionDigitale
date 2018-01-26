import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { TabsPage } from '../pages/tabs/tabs';
import { ChoicePage } from '../pages/choice/choice';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 // rootPage:any ; //= TabsPage;
  rootPage:any = ChoicePage;

 // private statusBar: StatusBar

  // ChoicePage

  constructor(platform: Platform, statusBar: StatusBar,
    private oneSignal: OneSignal, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // let status bar overlay webview
      statusBar.overlaysWebView(true);
      // set status bar to white
      statusBar.backgroundColorByHexString('#800000');
      statusBar.styleDefault();



/*
    // Julio account
    this.oneSignal.startInit('d40b16c2-9005-460f-9548-fb07b9fea297', '25076009223'); 
*/
this.oneSignal.startInit('af50dc94-7800-4693-8740-2ba4810acdb4', '25076009223');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
    // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();

      setTimeout(() => {
        this.rootPage = ChoicePage; //TabsPage;
        splashScreen.hide();
      }, 100);
  
     
    });
  }
}
