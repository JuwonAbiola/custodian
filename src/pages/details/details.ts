import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  PolicyNo: string;
  PolicyEBusiness: string;
  AgenctNum: string;
  AgenctName: string;

  InsuredNum: string;
  InsuredName: string;
  InsuredOthName: string;
  InsAddr1: string;
  InsAddr2: string;
  InsAddr3: string;
  TelNum: string;
  InsuredTelNum: string;
  InsuredEmail: string;
  dOB: string;
  InsLGA: string;
  InsState: string;
  mPremium: string;
  // PolicyNo:string;
  // PolicyNo:string;
  // PolicyNo:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.AgenctNum = localStorage.getItem('AgenctNum');
    this.AgenctName = localStorage.getItem('AgenctName');
    this.InsuredName = localStorage.getItem('InsuredName');
    this.InsuredOthName = localStorage.getItem('InsuredOthName');
    this.InsuredEmail = localStorage.getItem('InsuredEmail');
    this.dOB = localStorage.getItem('dOB');
    this.TelNum = localStorage.getItem('TelNum');
    this.InsAddr1 = localStorage.getItem('InsAddr1');
    this.InsAddr2 = localStorage.getItem('InsAddr2');
    this.InsState = localStorage.getItem('InsState');
    this.mPremium = localStorage.getItem('mPremium');
    this.PolicyNo = localStorage.getItem(' PolicyNoss');
    this.InsLGA = localStorage.getItem('InsLGA');

    if (localStorage.getItem('AgenctNum') === "NULL") {
      this.AgenctNum = '';
    } if (localStorage.getItem('AgenctName') === "NULL") {
      this.AgenctName = '';
    } if (localStorage.getItem('InsuredName') === "NULL") {
      this.InsuredName = '';
    } if (localStorage.getItem('InsuredOthName') === "NULL") {
      this.InsuredOthName = '';
    } if (localStorage.getItem('TelNum') === "NULL") {
      this.TelNum = '';
    } if (localStorage.getItem('InsAddr1') === "NULL") {
      this.InsAddr1 = '';
    } if (localStorage.getItem('InsAddr2') === "NULL") {
      this.InsAddr2 = '';
    } if (localStorage.getItem('InsState') === "NULL") {
      this.InsState = '';
    } if (localStorage.getItem('InsuredEmail') === "NULL") {
      this.InsuredEmail = '';
    }
  }
}
