import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertCardPage } from './insert-card';

@NgModule({
  declarations: [
    InsertCardPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertCardPage),
  ],
})
export class InsertCardPageModule {}
