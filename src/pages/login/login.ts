import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Injectable } from '@angular/core';
import { MenuController } from 'ionic-angular'
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
  Subsidiary: string = '';
  Policy: string = '';

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, private http: HttpClient, private toastCtrl: ToastController, public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams) {
    this.menuCtrl.enable(false, 'myMenu');
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
    this.Subsidiary = '';
    this.Policy = '';
  }


  login() {
    if (this.Subsidiary === '' || this.Policy == '') {

      let toast = this.toastCtrl.create({
        message: 'Please Fill all fields',
        duration: 3000,
        position: 'top'
      });

      toast.present();
      return;
    }
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let data = {
      merchant_id: "CUST_00004",
      policy_number: this.Policy,
      subsidiary: this.Subsidiary
    }
    console.log(data);

    localStorage.setItem('merchant_id', "CUST_00004");
    localStorage.setItem('policy_number', this.Policy);
    localStorage.setItem('subsidiary', this.Subsidiary);

    this.http.post("https://apitest.custodianplc.com.ng/api/Agent/GetPolicyDetails", data, { headers: new HttpHeaders().set('Authorization', 'NkY4NTQ4MEQ5RThGMUM1RjlGOTlDM0M2QkJCMUJDQ0Y1QjI4MEVCNkUyQjQ1QzFFQzlGRDJFN0U5MDhERTdDNg==') })
      .subscribe((res: any) => {
        if (res.status === 200) {
          localStorage.setItem('insuredNameField', res.data.insuredNameField);
          localStorage.setItem('insuredOthNameField', res.data.insuredOthNameField);
          localStorage.setItem('insuredEmailField', res.data.insuredEmailField);
          localStorage.setItem('dOBField', res.data.dOBField);
          localStorage.setItem('telNumField', res.data.telNumField);
          localStorage.setItem('insAddr1Field', res.data.insAddr1Field);
          localStorage.setItem('insAddr2Field', res.data.insAddr2Field);
          localStorage.setItem('insStateField', res.data.insStateField);
          localStorage.setItem('agenctNumField', res.data.agenctNumField);
          localStorage.setItem('agenctNameField', res.data.agenctNameField);

          localStorage.setItem('startdateField', res.data.startdateField);
          localStorage.setItem('enddateField', res.data.enddateField);
          localStorage.setItem('sumInsField', res.data.sumInsField);
          localStorage.setItem('outPremiumField', res.data.outPremiumField);
          localStorage.setItem('instPremiumField', res.data.instPremiumField);
          localStorage.setItem('mPremiumField', res.data.mPremiumField);
          localStorage.setItem('bizUnitField', res.data.bizUnitField);
          this.navCtrl.setRoot(HomePage);
          loader.dismiss();
        }
        else {
          loader.dismiss();
          const alert = this.alertCtrl.create({
            title: '',
            subTitle: res.message,
            buttons: ['OK']
          });
          alert.present();
        }


      }, error => {
        loader.dismiss();
        console.log(error);
        loader.dismiss();
        // alert(error.message);
        const alert = this.alertCtrl.create({
          title: '',
          subTitle: "Check your Internet Connection",
          buttons: ['OK']
        });
        alert.present();

      });
  }
}

