import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder,FormControl,Validators, FormGroup } from '@angular/forms';
import { ProvProvider } from '../../providers/prov/prov';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Email: any;
  data=[];
  userData;
  userForm2: FormGroup;
  constructor(public navCtrl: NavController,private fb:FormBuilder,public provider:ProvProvider) {

  }
  
  ngOnInit() {   
    
    this.data=JSON.parse(localStorage.getItem('members'));
    //console.log(this.provider.id)
     this.userData=this.data[this.provider.id]
    //console.log(this.userData);
    this.userForm2= this.fb.group({
      'UserName':new FormControl({value:this.userData.UserName, disabled:true},Validators.compose([Validators.required,Validators.maxLength(16),Validators.pattern(/^[a-zA-Z]+$/)])),
      'Email': new FormControl({value:this.userData.Email, disabled:true},Validators.compose([Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})+$/)])),
      'DOB': new FormControl({value:this.userData.dob, disabled:true},Validators.required),
      'Contact': new FormControl({value:this.userData.contact, disabled:true},Validators.compose([Validators.required,Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)])),
     });
     
  }
  ionViewWillEnter(){
     this.data=JSON.parse(localStorage.getItem('members'))
     this.userData=this.data[this.provider.id];
     this.userForm2.setValue({
      UserName:this.userData.UserName,
      Email:this.userData.Email,
      DOB:this.userData.dob,
      Contact:this.userData.contact,
    })

  }


  
}
