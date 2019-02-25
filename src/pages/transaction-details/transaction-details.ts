import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ConnectPage } from '../connect/connect';
import { PaymentPage } from '../payment/payment';
// import { PaymentPage } from '../payment/payment';
/**
 * Generated class for the TransactionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-details',
  templateUrl: 'transaction-details.html',
})
@Injectable()
export class TransactionDetailsPage {
  cardh: string;
  res: string;
  cardn: string;
  cardt: string;
  operation: string;
  auth: string;
  rrn: string;
  responsecode: string;
  inst: string;
  aid: string;
  expiry: string;
  transimg: string = "";
  tid: string;
  merchant_id: string;
  policy_number: string;
  bizUnitField: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private http: HttpClient, public navParams: NavParams) {
  }
  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  strFormat = function (value) {
    var v = value + "";
    if (v.length === 1) {
      v = "0" + value;
    }

    return v;
  };



  ionViewDidLoad() {

    const d = new Date();

    const tid = "TT" + d.getFullYear() + this.strFormat(d.getMonth() + 1) + this.strFormat(d.getUTCDate()) + this.strFormat(d.getHours()) + this.strFormat(d.getMinutes()) + this.strFormat(d.getSeconds()) + this.strFormat(d.getMilliseconds());


    const result = this.navParams.get('result');
    this.responsecode = result.responsecode;
    if (result.responsecode == "00") {
      this.transimg = "assets/icon/success.svg";
      this.cardh = result.cardholder;
      this.res = result.responsemessage;
      this.cardn = result.pan;
      this.cardt = result.tendertype;
      this.operation = result.operation;
      this.auth = result.auth;
      this.rrn = result.rrn;
      this.aid = result.aid;
      this.expiry = result.expiry;
      this.inst = localStorage.getItem('inst');
      this.tid = tid;

    }
    else {
      this.transimg = "assets/icon/error.svg";
      this.cardh = result.cardholder;
      this.res = result.responsemessage;
      this.cardn = result.pan;
      this.cardt = result.tendertype;
      this.operation = result.operation;
      this.auth = result.auth;
      this.rrn = result.rrn;
      this.aid = result.aid;
      this.expiry = result.expiry;
      this.inst = localStorage.getItem('inst');
      this.tid = tid;

      const confirm = this.alertCtrl.create({
        title: 'ERROR',
        message: this.res,
        buttons: [
          {
            text: 'Retry',
            handler: () => {
              this.navCtrl.setRoot(PaymentPage);
            }
          },
          {
            text: 'Cancel',
            handler: () => {
              return;
            }
          }
        ]
      });

      confirm.present();
    }
    // const d = new Date();

    // const tid = "TT" + d.getFullYear() + this.strFormat(d.getMonth() + 1) + this.strFormat(d.getUTCDate()) + this.strFormat(d.getHours()) + this.strFormat(d.getMinutes()) + this.strFormat(d.getSeconds()) + this.strFormat(d.getMilliseconds());


    let trans = {
      "username": localStorage.getItem("username"),
      "rrn": this.rrn,
      "cardNo": this.cardn,
      "response": this.rrn,
      "responseCode": this.responsecode,
      "purchase": this.inst,
      "total": this.inst,
      "transactionId": tid,
      "transactionType": "CARD",
      "tenderType": this.cardt,
      "cardHolder": this.cardh,
      "authCode": this.auth,
      "createdOn": new Date(Date.now()),
      "email": localStorage.getItem("email"),
      "accountType": "10",
      "expiry": this.expiry,
      "aid": this.aid,
      "stan": "800670",
      "terminalId": localStorage.getItem("terminalId"),
      "location": "Nigeria",
      "itemPurchased": ""
    }


    let header = {
      "Content-type": "application/json"
    };

    this.http.post('https://ibeta.paypad.com.ng/paypad/webapi/v2/logtransactions', trans, { headers: header })
      .subscribe((res: any) => {
        console.log(res);
        // alert(res.message);
      }, error => {
        console.log(error);
        // alert(error.message);
      });

    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    const bizUnitField = localStorage.getItem('bizUnitField');
    const policy_number = localStorage.getItem('policy_number');
    const merchant_id = localStorage.getItem('merchant_id');
    const rrn = result.rrn;
    const payment_narrtn = result.responsemessage;
    const premium = 'n/a';

    let datas = {
      merchant_id: merchant_id,
      policy_number: policy_number,
      subsidiary: 2,
      biz_unit: bizUnitField,
      reference_no: rrn,
      payment_narrtn: payment_narrtn,
      premium: 0
    }
    console.log(datas);
    console.log(JSON.stringify(datas));

    this.http.post("https://apitest.custodianplc.com.ng/api/Agent/PostTransaction", datas, { headers: new HttpHeaders().set('Authorization', 'NkY4NTQ4MEQ5RThGMUM1RjlGOTlDM0M2QkJCMUJDQ0Y1QjI4MEVCNkUyQjQ1QzFFQzlGRDJFN0U5MDhERTdDNg==') })
      .subscribe((res: any) => {
        console.log(res);
        // alert(res.message);
      }, error => {
        console.log(error);
        // alert(error.message);
      });
  }

}
