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
  policyNoField: string;
  policyEBusinessField: string;
  agenctNumField: string;
  agenctNameField: string;

  insuredNumField: string;
  insuredNameField: string;
  insuredOthNameField: string;
  insAddr1Field: string;
  insAddr2Field: string;
  insAddr3Field: string;
  telNumField: string;
  insuredTelNumField: string;
  insuredEmailField: string;
  dOBField: string;
  insLGAField: string;
  insStateField: string;
  mPremiumField: string;
  // policyNoField:string;
  // policyNoField:string;
  // policyNoField:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.agenctNumField = localStorage.getItem('agenctNumField');
    this.agenctNameField = localStorage.getItem('agenctNameField');
    this.insuredNameField = localStorage.getItem('insuredNameField');
    this.insuredOthNameField = localStorage.getItem('insuredOthNameField');
    this.insuredEmailField = localStorage.getItem('insuredEmailField');
    this.dOBField = localStorage.getItem('dOBField');
    this.telNumField = localStorage.getItem('telNumField');
    this.insAddr1Field = localStorage.getItem('insAddr1Field');
    this.insAddr2Field = localStorage.getItem('insAddr2Field');
    this.insStateField = localStorage.getItem('insStateField');
    this.mPremiumField = localStorage.getItem('mPremiumField');
    this.policyNoField = localStorage.getItem(' policyNoFieldss');
    this.policyNoField = localStorage.getItem(' insLGAField');

  }
}
