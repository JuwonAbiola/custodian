import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  startdateField: string;
  enddateField: string;
  sumInsField: string;
  outPremiumField: string;
  instPremiumField: string;
  mPremiumField: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  back() {
    this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
    this.startdateField = localStorage.getItem('startdateField');
    this.enddateField = localStorage.getItem('enddateField');
    this.sumInsField = localStorage.getItem('sumInsField');
    this.outPremiumField = localStorage.getItem('outPremiumField');
    this.instPremiumField = localStorage.getItem('instPremiumField');
    this.mPremiumField = localStorage.getItem('mPremiumField');
  }

}
