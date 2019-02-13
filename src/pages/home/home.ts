import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { NotificationPage } from '../notification/notification';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  insuredNameField: string;
  insuredOthNameField: string;
  insuredEmailField: string;
  dOBField: string;
  telNumField: string;
  insAddr1Field: string;
  insAddr2Field: string;
  insStateField: string;

  startdateField: string;
  enddateField: string;
  sumInsField: string;
  outPremiumField: string;
  instPremiumField: string;
  mPremiumField: string;

  // gsm: string;
  // email: string;
  // userID: string;

  constructor(public navCtrl: NavController) {

  }
  pay() {
    this.navCtrl.push(PaymentPage);
  }
  notify() {
    this.navCtrl.push(NotificationPage);
  }
  ionViewDidLoad() {
    this.insuredNameField = localStorage.getItem('insuredNameField');
    this.insuredOthNameField = localStorage.getItem('insuredOthNameField');
    this.insuredEmailField = localStorage.getItem('insuredEmailField');
    this.dOBField = localStorage.getItem('dOBField');
    this.telNumField = localStorage.getItem('telNumField');
    this.insAddr1Field = localStorage.getItem('insAddr1Field');
    this.insAddr2Field = localStorage.getItem('insAddr2Field');
    this.insStateField = localStorage.getItem('insStateField');

    this.startdateField = localStorage.getItem('startdateField');
    this.enddateField = localStorage.getItem('enddateField');
    this.sumInsField = localStorage.getItem('sumInsField');
    this.outPremiumField = localStorage.getItem('outPremiumField');
    this.instPremiumField = localStorage.getItem('instPremiumField');
    this.mPremiumField = localStorage.getItem('mPremiumField');

    // this.gsm = localStorage.getItem('gsm');
    // this.email = localStorage.getItem('email');
    // this.userID = localStorage.getItem('userID');
  }
}
