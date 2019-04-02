import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, 
     private app: App
    ) {
     let nav =this.app.getRootNav();
       nav.setRoot(LoginPage);
  }

}
