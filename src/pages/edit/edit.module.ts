import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPage } from './edit';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    EditPage
  ],
  imports: [
    IonicPageModule.forChild(EditPage),FormsModule,ReactiveFormsModule
  ],
})
export class EditPageModule {}
