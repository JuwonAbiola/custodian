import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ConnectPage } from '../connect/connect';
import { Injectable } from '@angular/core';
import { MenuController } from 'ionic-angular'

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
/**
 * Generated class for the ActivationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
@Injectable()
export class ActivationPage {
  activationCode: string = '';

  constructor(public menuCtrl: MenuController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private http: HttpClient, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {

    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivationPage');
    const activated = localStorage.getItem('activated');
    if (activated == null) {

    }
    else if (activated == 'false') {

    }
    else if (activated == 'true') {
      this.navCtrl.setRoot(LoginPage);

    }
  }

  act() {

    if (this.activationCode == '') {

      let toast = this.toastCtrl.create({
        message: 'Please Enter Activation Code',
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

    let header = {
      "Content-type": "application/json"
    };

    let data = {
      activationCode: this.activationCode
    }

    this.http.post("https://ibeta.paypad.com.ng/paypad/webapi/v2/activateterminal", data, { headers: header })
      .subscribe((res: any) => {
        if (res.requestResponse[0]['status-code'] === '00') {
          localStorage.setItem("terminalId", res.requestResponse[0]["terminalDetails"]["terminalId"]);
          console.log(res.requestResponse[0]["terminalDetails"]["terminalId"]);
          localStorage.setItem("businessName", res.requestResponse[0]["accountDetails"]["merchantDetails"]["businessName"]);
          localStorage.setItem("bankId", res.requestResponse[0]["accountDetails"]["merchantDetails"]["bankId"]);
          localStorage.setItem("merchantId", res.requestResponse[0]["accountDetails"]["merchantDetails"]["merchantId"]);
          localStorage.setItem("email", res.requestResponse[0]["accountDetails"]["merchantDetails"]["email"]);
          localStorage.setItem("mccCode", res.requestResponse[0]["accountDetails"]["merchantDetails"]["mccCode"]);
          localStorage.setItem("username", res.requestResponse[0]["accountDetails"]["merchantAdmins"][0]["username"]);
          localStorage.setItem('activated', 'true')
          this.navCtrl.setRoot(ConnectPage);
          loader.dismiss();

        }
        else {
          loader.dismiss();
          const alert = this.alertCtrl.create({
            title: '',
            subTitle: 'invalid activation code',
            buttons: ['OK']
          });
          alert.present();

        }

      }, error => {
        loader.dismiss();

        console.log(error);
        let toast = this.toastCtrl.create({
          message: 'Could not activate',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        alert(error.message);
        loader.dismiss();
        localStorage.setItem('activated', 'false')

      });




  }
}