import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  id: any;
  info: any;
  foundData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public accSrv:DataProvider ) {
   this.id = navParams.get('data');
  }


  async ngOnInit() {
  
     this.id=this.accSrv.id;  
      this.info= JSON.parse(localStorage.getItem('usersignup'));  
      console.log(this.info);
      this.foundData=this.info[this.id]
      console.log(this.foundData)

  }
  ionViewWillEnter() {
    this.id=this.accSrv.id;  
    this.info= JSON.parse(localStorage.getItem('usersignup'));  
    console.log(this.info);
    this.foundData=this.info[this.id]
      console.log(this.foundData)
}

  isReadonly() {
    return this.isReadonly;   //return true/false 
  }


}
