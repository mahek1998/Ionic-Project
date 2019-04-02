import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder,FormControl,Validators,FormGroup } from '@angular/forms';
import { ProvProvider } from '../../providers/prov/prov';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { HomePage } from '../home/home';
// import { SignupPage } from '../signup/signup';
// import { LoginPage } from '../login/login';
// import { TabsPage } from '../tabs/tabs';
@ IonicPage()
@Component({
    selector: 'page-edit',
    templateUrl: 'edit.html',
})
export class EditPage {
    data= [];
    userData:any={};
    userForm2: FormGroup;
    UserName: any;

constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,public provider:ProvProvider,public toastController: ToastController,private camera: Camera ){
    this.data=JSON.parse(localStorage.getItem('members'));
    this.userData=this.data[this.provider.id]
    //alert(this.data)
    console.log(this.provider.id)
    
    this.userForm2= new FormGroup({
        'UserName':new FormControl('',Validators.compose([Validators.required,Validators.maxLength(16),Validators.pattern(/^[a-zA-Z]+$/)])),
        'Email': new FormControl({value:this.userData.Email,disabled:true},Validators.compose([Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})+$/)])),
        'DOB': new FormControl('',Validators.required),
        'Contact': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)])),
    });
    this.userForm2.get('UserName').setValue(this.userData.UserName);
    
    this.userForm2.get('Email').setValue(this.userData.Email);
    this.userForm2.get('Email').disable();
    this.userForm2.get('Contact').setValue(this.userData.contact);
    this.userForm2.get('DOB').setValue(this.userData.dob);
}

ionViewDidLoad(){

}
 updateForm(){
    //console.log(this.editForm.value)
    this.userData.UserName=this.userForm2.value.UserName;
    this.userData.contact=this.userForm2.value.Contact;
    this.userData.dob=this.userForm2.value.DOB
    this.data[this.provider.id]=this.userData
    localStorage.setItem('members',JSON.stringify(this.data))
    let toast=this.toastController.create({
        message:"successfully update",
        duration:3000
    });
    toast.present();
    
}

takePhoto()
{
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Handle error
      });
}
}