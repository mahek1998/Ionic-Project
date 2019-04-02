import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  LoginForm: any;
  submitted: boolean;
  match: any;
  userid: any;
  password: any;
  id: number;
  login: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(public navCtrl: NavController, public navParams: NavParams,public accSrv:DataProvider,public alertController: AlertController,
    public toastController: ToastController) {
  }

  ngOnInit() {

    if(sessionStorage.getItem('userlogin')){
      this.navCtrl.push(TabsPage);
    }
  
    this.login= JSON.parse(localStorage.getItem('usersignup'));

     
  this.LoginForm = new FormGroup({ 
    email: new FormControl('',[Validators.required,Validators.maxLength(65),Validators.minLength(4)]), 
    password: new FormControl('',[Validators.required,
     Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")] )   
     });
  }

  async onSubmit() {
      
    this.submitted = true; 
      
      for(let i=0;i<this.login.length;i++)
      {  
        console.log(this.login[i].email);
       
        if(this.LoginForm.value.email==this.login[i].email || this.LoginForm.value.email== this.login[i].username) 
        {
          this.match=this.login[i].email;
          this.password=this.login[i].password;
          this.userid=this.login[i].username;
          this.id=i;

        }
         
      }
      this.accSrv.id=this.id;

   //  console.log(this.id);
      if(this.LoginForm.value.email == this.match || this.LoginForm.value.email== this.userid  && this.LoginForm.value.password == this.password){
        sessionStorage.setItem('userlogin',JSON.stringify(this.LoginForm.value.email));
       
      
       
          const toast = await this.toastController.create({
            message: 'Login Sucessfully',
            duration: 2000
          });
          toast.present();
        
        this.navCtrl.push(TabsPage, {data:this.id});
       // this.router.navigate(['/profile',this.id]);    
           }
      else{
        const toast = await this.toastController.create({
          message: 'Please check your userid/email and password',
          showCloseButton: true,
          position: 'bottom',
          closeButtonText: 'Close'
        });
        toast.present();
      }
}

hideShowPassword() {
  this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async  register(){
    
    this.navCtrl.push(SignupPage);
    }


}
