import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
@Injectable()
export class LoginPage {
  MerchantID: String = '';
  MerchantPWD: String = '';

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, private http: HttpClient, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }
  // login() {
  //   this.navCtrl.push(HomePage);
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  alertService = (response) => {

    return this.alertCtrl.create({
      title: 'Status',
      subTitle: response,
      buttons: ['Dismiss']
    });

  }
  clearData = () => {
    this.MerchantID = '';
    this.MerchantPWD = '';
  }


  login() {
    // if (this.surname == undefined || this.email == undefined) {

    //   let toast = this.toastCtrl.create({
    //     message: 'Please Fill all fields',
    //     duration: 3000,
    //     position: 'top'
    //   });

    //   toast.present();
    //   return;
    // }

    // const loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    // loader.present();

    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let data = {
      merchant_id: "CUST_00004",
      policy_number: "HO/V/29/B0001235",
      subsidiary: 2
    }

    this.http.post("https://apitest.custodianplc.com.ng/api/Agent/GetPolicyDetails", data, { headers: new HttpHeaders().set('Authorization', 'NkY4NTQ4MEQ5RThGMUM1RjlGOTlDM0M2QkJCMUJDQ0Y1QjI4MEVCNkUyQjQ1QzFFQzlGRDJFN0U5MDhERTdDNg==') })
      .subscribe((res: any) => {
        localStorage.setItem('insuredNameField', res.data.insuredNameField);
        localStorage.setItem('insuredOthNameField', res.data.insuredOthNameField);
        localStorage.setItem('insuredEmailField', res.data.insuredEmailField);
        localStorage.setItem('dOBField', res.data.dOBField);
        localStorage.setItem('telNumField', res.data.telNumField);
        localStorage.setItem('insAddr1Field', res.data.insAddr1Field);
        localStorage.setItem('insAddr2Field', res.data.insAddr2Field);
        localStorage.setItem('insStateField', res.data.insStateField);

        localStorage.setItem('startdateField', res.data.startdateField);
        localStorage.setItem('enddateField', res.data.enddateField);
        localStorage.setItem('sumInsField', res.data.sumInsField);
        localStorage.setItem('outPremiumField', res.data.outPremiumField);
        localStorage.setItem('instPremiumField', res.data.instPremiumField);
        localStorage.setItem('mPremiumField', res.data.mPremiumField);
        this.navCtrl.setRoot(HomePage);
      }, error => {
        console.log(error);
      });
  }
}

