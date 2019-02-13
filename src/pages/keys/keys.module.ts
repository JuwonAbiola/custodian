import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeysPage } from './keys';

@NgModule({
  declarations: [
    KeysPage,
  ],
  imports: [
    IonicPageModule.forChild(KeysPage),
  ],
})
export class KeysPageModule {}
