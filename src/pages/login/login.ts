import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HomeePage } from '../homee/homee';
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
        position: 'top',
        cssClass: 'normalToast'

      });

      toast.present();
      return;
    }

    if (this.Subsidiary === '1') {
      const loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      let headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');

      let data = {
        merchant_id: "CUST_WEB_00004",
        policy_number: this.Policy,
        subsidiary: this.Subsidiary
      }
      console.log(data);

      localStorage.setItem('merchant_id', "CUST_WEB_00004");
      localStorage.setItem('policy_number', this.Policy);
      localStorage.setItem('subsidiary', this.Subsidiary);

      this.http.post("https://api.custodianplc.com.ng/api/Agent/GetPolicyDetails", data, { headers: new HttpHeaders().set('Authorization', 'ODc4QUMxRjJEOEVEQTkwN0U0QzFBMTBFMjkxOTc1RDYwMTUwRjhBRkJCRkUyQzFDRjNCMkE2ODcwQTcxMjlFQQ==') })
        .subscribe((res: any) => {
          if (res.status === 200) {
            localStorage.setItem('InsuredName', res.data.insuredNameField);
            localStorage.setItem('InsuredOthName', res.data.insuredOthNameField);
            localStorage.setItem('InsuredEmail', res.data.insuredEmailField);
            localStorage.setItem('DOB', res.data.dOBField);
            localStorage.setItem('TelNum', res.data.telNumField);
            localStorage.setItem('InsAddr1', res.data.insAddr1Field);
            localStorage.setItem('InsAddr2', res.data.insAddr2Field);
            localStorage.setItem('InsState', res.data.insStateField);
            localStorage.setItem('AgenctNum', res.data.agenctNumField);
            localStorage.setItem('AgenctName', res.data.agenctNameField);
            localStorage.setItem('InsLGA', res.data.insLGAField);

            localStorage.setItem('Startdate', res.data.startdateField);
            localStorage.setItem('Enddate', res.data.enddateField);
            localStorage.setItem('SumIns', res.data.sumInsField);
            localStorage.setItem('OutPremium', res.data.outPremiumField);
            localStorage.setItem('InstPremium', res.data.instPremiumField);
            localStorage.setItem('mPremium', res.data.mPremiumField);
            localStorage.setItem('BizUnit', res.data.bizUnitField);
            this.navCtrl.setRoot(HomeePage);
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
    else {
      const loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      let headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');

      let data = {
        merchant_id: "CUST_WEB_00004",
        policy_number: this.Policy,
        subsidiary: this.Subsidiary
      }
      console.log(data);

      localStorage.setItem('merchant_id', "CUST_WEB_00004");
      localStorage.setItem('policy_number', this.Policy);
      localStorage.setItem('subsidiary', this.Subsidiary);

      this.http.post("https://api.custodianplc.com.ng/api/Agent/GetPolicyDetails", data, { headers: new HttpHeaders().set('Authorization', 'ODc4QUMxRjJEOEVEQTkwN0U0QzFBMTBFMjkxOTc1RDYwMTUwRjhBRkJCRkUyQzFDRjNCMkE2ODcwQTcxMjlFQQ==') })
        .subscribe((res: any) => {
          if (res.status === 200) {
            localStorage.setItem('InsuredName', res.data.insuredNameField);
            localStorage.setItem('InsuredOthName', res.data.insuredOthNameField);
            localStorage.setItem('InsuredEmail', res.data.insuredEmailField);
            localStorage.setItem('DOB', res.data.dOBField);
            localStorage.setItem('TelNum', res.data.telNumField);
            localStorage.setItem('InsAddr1', res.data.insAddr1Field);
            localStorage.setItem('InsAddr2', res.data.insAddr2Field);
            localStorage.setItem('InsState', res.data.insStateField);
            localStorage.setItem('AgenctNum', res.data.agenctNumField);
            localStorage.setItem('AgenctName', res.data.agenctNameField);
            localStorage.setItem('InsLGA', res.data.insLGAField);

            localStorage.setItem('Startdate', res.data.startdateField);
            localStorage.setItem('Enddate', res.data.enddateField);
            localStorage.setItem('SumIns', res.data.sumInsField);
            localStorage.setItem('OutPremium', res.data.outPremiumField);
            localStorage.setItem('InstPremium', res.data.instPremiumField);
            localStorage.setItem('mPremium', res.data.mPremiumField);
            localStorage.setItem('BizUnit', res.data.bizUnitField);
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
}

