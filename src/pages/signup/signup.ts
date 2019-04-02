import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  userForm: any;
  data=[];
  obj1:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignupPage');

  }
  ngOnInit() {
    this.userForm = this.fb.group({
      'UserName': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(16), Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)])),
      'Email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})+$/)])),
      'Password': new FormControl('',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(16)])),

    });
  }
  getValue() {
    let obj={
      
      'UserName':this.userForm.value.UserName,
      'Email':this.userForm.value.Email,
      'Password':this.userForm.value.Password,
      'dob':'',
      'contact' :''
      
    }
    this.data=JSON.parse(localStorage.getItem('members'))?JSON.parse(localStorage.getItem('members')):[]
    //console.log(this.data)
    this.data.push(obj)
    //console.log(obj)
    localStorage.setItem('members',JSON.stringify(this.data));
    this.navCtrl.push(LoginPage);
    this.userForm.reset();
  }
  backLogin(){
    this.navCtrl.push(LoginPage);
  }
    }
