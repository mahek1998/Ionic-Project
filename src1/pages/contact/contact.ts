import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private app: App,public alertController: AlertController) {

     

// let nav = this.app.getRootNav();
// sessionStorage.removeItem('userlogin'); 
// nav.setRoot(LoginPage);
  }


  async ionViewWillEnter(){
    const alert = await this.alertController.create({
     
      message: 'Press <b>Yes</b> for logout!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.navCtrl.push(TabsPage);
          }
        }, {
          text: 'Yes',
          handler: () => {
            let nav = this.app.getRootNav();
            sessionStorage.removeItem('userlogin');
            nav.setRoot(LoginPage);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  }

