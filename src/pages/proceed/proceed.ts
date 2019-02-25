import { Component } from '@angular/core';
import { SuperTabsModule, SuperTabsController } from 'ionic2-super-tabs';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BusinessPage } from '../business/business';
import { RenewalPage } from '../renewal/renewal';

/**
 * Generated class for the ProceedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proceed',
  templateUrl: 'proceed.html',
})
export class ProceedPage {
  page1: any = BusinessPage;
  page2: any = RenewalPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl: SuperTabsController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProceedPage');
  }

  // ngAfterViewInit() {
  //   // must wait for AfterViewInit if you want to modify the tabs instantly
  //   this.superTabsCtrl.setBadge('homeTab', 5);
  // }

  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }

  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }

  onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }

}
