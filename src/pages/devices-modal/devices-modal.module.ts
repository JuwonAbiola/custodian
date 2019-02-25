import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevicesModalPage } from './devices-modal';

@NgModule({
  declarations: [
    DevicesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DevicesModalPage),
  ],
})
export class DevicesModalPageModule {}
