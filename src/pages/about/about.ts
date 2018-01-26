import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  detailsArticles :any;
  lien:any ;
  constructor(public navCtrl: NavController, public navParams :NavParams ,private sharingVar: SocialSharing) {
   this.detailsArticles=navParams.get("detailsArticles");
   this.lien = this.detailsArticles.titre; //ok
  }

  whatsappShare(lien){
    this.sharingVar.shareViaWhatsApp("Message via WhatsApp", null /*Image*/,  lien  /* url */)
      .then(()=>{
        console.log("Success");
      },
      ()=>{
        console.log("failed")
      })
  }
 
  twitterShare(lien){
    this.sharingVar.shareViaTwitter("Message via Twitter",null /*Image*/,lien)
    .then(()=>{
      console.log("Success");
      },
      ()=>{
        console.log("failed")
      })
  }
 
  facebookShare(lien){
    this.sharingVar.shareViaFacebook("Message via Twitter",null /*Image*/,lien)
    .then(()=>{
      console.log("Success");
      },
      ()=>{
        console.log("failed")
      })
  }
 
  otherShare(lien){

    this.sharingVar.share("Genral Share Sheet",null/*Subject*/,null/*File*/,lien)
    .then(()=>{
         console.log("Success");
      },
      ()=>{
     
      })
 
  }

}