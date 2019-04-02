import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

  submitted = false;
  

  Signupform = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25),
      Validators.pattern(/^[a-zA-Z.\-_$@*!]+$/)]),
    email: new FormControl ('', [Validators.required,Validators.maxLength(65),Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/)]),
    password: new FormControl ('', [Validators.required,Validators.maxLength(16),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      
  });
  olddata: any;
  objData: { username: any; email: any; password: any; dob: string; number: string; };
  dataArray=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastController: ToastController) {
  }


  async onSignIn() {
    this.submitted = true; 
      console.log(this.Signupform.value);
     
      this.olddata=JSON.parse(localStorage.getItem('usersignup'));
     var count=1;
          for(let i in this.olddata){
            // console.log(this.olddata)
            if(this.olddata[i].email==this.Signupform.value.email){
              console.log(this.olddata[i].email,this.olddata[i].username)
               count++;
            }
          }

          if(this.olddata==null)
          {
            this.objData = {
              username: this.Signupform.value.username, email: this.Signupform.value.email, password: this.Signupform.value.password, dob:'' , number:''
              }
            this.dataArray.push(this.objData);
            localStorage.setItem('usersignup', JSON.stringify(this.dataArray));
            const toast = await this.toastController.create({
              message: 'Register Successfully',
              position: 'top',
              duration: 2000
            });
            toast.present();
            this.navCtrl.push(LoginPage);

          }



          if(count==1){
            this.objData = {
              username: this.Signupform.value.username, email: this.Signupform.value.email, password: this.Signupform.value.password, dob:'' , number:''
              }
              this.olddata.push(this.objData);
              localStorage.setItem('usersignup', JSON.stringify(this.olddata));
              const toast = await this.toastController.create({
                message: 'Register Successfully',
                position: 'top',
                duration: 2000
              });
              toast.present();
              this.navCtrl.push(LoginPage);
          }else{
            const toast = await this.toastController.create({
              message: 'user already exist',
              showCloseButton: true,
              position: 'top',
              closeButtonText: 'Close'
            });
            toast.present();
          }
             
      }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

   register(){
    this.navCtrl.push(LoginPage);
    }

}
