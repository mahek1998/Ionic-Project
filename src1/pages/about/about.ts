import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  id: any;
  info: any;
  foundData: any;
  update: any;
  submitted: boolean;
  

  constructor(public navCtrl: NavController,public accSrv:DataProvider,public alertController: AlertController,public toastController: ToastController) {

  }
  ngOnInit() {
  
    this.id=this.accSrv.id;
  
  this.info= JSON.parse(localStorage.getItem('usersignup'));  
  console.log(this.info);
  this.foundData=this.info[this.id]
    console.log(this.foundData)
    
    this.update = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50),
                 Validators.pattern(/^[a-zA-Z.\-_$@*!]+$/)]),
      email: new FormControl('', []),
      dob: new FormControl('', []),
      number: new FormControl('', [Validators.pattern(/^[789]\d{9}$/), Validators.maxLength(10)]),
      
       });
  
       
       this.update.controls['number'].setValue(this.foundData.number);
       this.update.controls['username'].setValue(this.foundData.username);
       this.update.controls['dob'].setValue(this.foundData.dob);
      

  }
  async onUpdate(){
    
     
       this.submitted = true; 
       this.foundData.username=this.update.value.username;
       this.foundData.email;
       this.foundData.number=this.update.value.number;
       this.foundData.dob=this.update.value.dob;
       this.foundData.password=this.foundData.password;
     
       this.info[this.accSrv.id]=this.foundData;
     
       localStorage.setItem('usersignup', JSON.stringify(this.info));
    
           const toast = await this.toastController.create({
          message: 'Data update Sucessfully',
          duration: 2000
        });
        toast.present();
      }
     
   

  }


