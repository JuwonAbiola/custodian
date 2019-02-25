import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterPinPage } from './enter-pin';

@NgModule({
  declarations: [
    EnterPinPage,
  ],
  imports: [
    IonicPageModule.forChild(EnterPinPage),
  ],
})
export class EnterPinPageModule {}
