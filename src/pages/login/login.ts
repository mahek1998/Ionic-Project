import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { ProvProvider } from '../../providers/prov/prov';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userForm1:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private fb1:FormBuilder,public provider:ProvProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    this.userForm1=this.fb1.group({
      'Email': new FormControl('',Validators.compose([Validators.required])),
      'Password': new FormControl('',Validators.compose([Validators.required]))

    });
  }
  login(){
    var data=JSON.parse(localStorage.getItem('members'));
    console.log(data);
    if(data==null){
      alert('Account not exists');
    }
    else{
      for(let i in data){
      if(((data[i].Password==this.userForm1.value.Password) && (data[i].Email==this.userForm1.value.Email)) || ((data[i].Password==this.userForm1.value.Password) && (data[i].UserName==this.userForm1.value.Email)))
        {
       
            alert('welcome')
            this.provider.id=i;
            this.navCtrl.push(TabsPage);
            //this.router.navigate(['/profile',i])
            }   
           }
     }    
    this.userForm1.reset();
  }

  signup(){
    this.navCtrl.push(SignupPage)
  }
  
}
