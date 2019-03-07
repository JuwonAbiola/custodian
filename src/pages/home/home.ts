import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { NotificationPage } from '../notification/notification';
import { DetailsPage } from '../details/details';
import { MenuController } from 'ionic-angular';
import { DevicesModalPage } from '../devices-modal/devices-modal';

declare var PaypadFacade: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  InsuredName: string;
  InsuredOthName: string;
  InsuredEmail: string;
  policy_number: string;
  TelNum: string;
  InsAddr1: string;
  InsAddr2: string;
  InsState: string;
  AgenctName: string;
  AgenctNum: string;
  BizUnit: string;


  Startdate: string;
  Enddate: string;
  SumIns: string;
  OutPremium: string;
  InstPremium: string;
  mPremium: string;
  all0: string;
  all1: string;
  all2: string;
  all3: string;
  all4: string;
  all5: string;
  all6: string;
  all7: string;
  all8: string;
  all9: string;
  Inst: string;
  // gsm: string;
  // email: string;
  // userID: string;

  constructor(public menuCtrl: MenuController, public modalCtrl: ModalController, private toastCtrl: ToastController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController) {
    this.menuCtrl.enable(true, 'myMenu');
  }

  openModal(data) {
    let myModal = this.modalCtrl.create(DevicesModalPage, { 'obj': data });
    myModal.present();
  }
  connectToPinpadAndDownloadKeys() {

    localStorage.setItem('Inst', this.mPremium);

    var success = (message) => {

      if (message) {

        var myPopup = null;
        var deviceList = message.devices;

        this.openModal(deviceList);


      } else {

        let alert = this.alertCtrl.create({
          title: 'Important',
          subTitle: 'Unable to complete operation, please try again later',
          buttons: ['Dismiss']
        });

        alert.present();
      }
    }

    var failure = (message) => {
      let alert = this.alertCtrl.create({
        title: 'Important',
        subTitle: 'Unable to complete operation, please try again later',
        buttons: ['Dismiss']
      });

      alert.present();
    };

    var loader = this.loading.create({
      content: '<ion-spinner name="bubbles"></ion-spinner><br />',
    });

    PaypadFacade.connection("", (response) => {

      console.log(response)

      var status = response.status;

      if (status) {

        if (status === "enabling_bluetooth") {
          loader = this.loading.create({
            content: '<ion-spinner name="bubbles"></ion-spinner> <br />Please wait enabling bluetooth...',
          });
          loader.present()
        }
        else if (status == "connecting") {
          loader.dismiss();

          loader = this.loading.create({
            content: '<ion-spinner name="bubbles"></ion-spinner> <br /> Connecting to pinpad...',
          });

          loader.present()
        } else if (status === "connected" || status === "already_connected") {

          var x = localStorage.getItem("terminalId");

          //console.log("i am connected from payment page")

          loader.dismiss();

          var selectedbank = "Esl";

          //var initState = localStorage.getItem("initialization");

          PaypadFacade.reinitialization(x, true, selectedbank, (result) => {

            console.log(result);

            var status = result.status;

            if (status) {

              if (status === "downloading_keys") {
                loader = this.loading.create({
                  content: '<ion-spinner name="bubbles"></ion-spinner> <br />Please wait ...',
                });
                loader.present()
              } else if (status === "loading_keys_to_pinpad") {

                loader.dismiss();

                console.log('called payment from payment page')

                // alert("KEY DOWNLOAD SUCCESSFUL")
                this.navCtrl.push(PaymentPage);
              }
              else if (status == "Already_initialised") {
                alert("already initialized")
              }
            }

          }, (response) => {
            loader.dismiss();

            let alert = this.alertCtrl.create({
              title: 'Status',
              subTitle: 'Unable to Download Keys',
              buttons: ['Dismiss']
            });

            //reject("KEY DOWNLOAD FAILED")

            alert.present();

          });

        } else {

          loader.dismiss();
          // alert("This is else "+ status);
          console.log("listing")
          PaypadFacade.list(success, failure);
        }
      } else {
        // PaypadFacade.list(success,failure);
        console.log("not status");
        console.log(status)
        //reject("no response status from connection")
      }

    }, (response) => {

      loader.dismiss();

      PaypadFacade.list(success, failure);

    });

  }

  pay() {
    this.connectToPinpadAndDownloadKeys();
  }
  notify() {
    this.navCtrl.push(NotificationPage);
  }
  details() {
    this.navCtrl.push(DetailsPage);
  }
  ionViewDidLoad() {

    this.AgenctNum = localStorage.getItem('AgenctNum');
    this.AgenctName = localStorage.getItem('AgenctName');
    this.InsuredName = localStorage.getItem('InsuredName');
    this.InsuredOthName = localStorage.getItem('InsuredOthName');
    this.InsuredEmail = localStorage.getItem('InsuredEmail');
    this.policy_number = localStorage.getItem('policy_number');
    this.TelNum = localStorage.getItem('TelNum');
    this.InsAddr1 = localStorage.getItem('InsAddr1');
    this.InsAddr2 = localStorage.getItem('InsAddr2');
    this.InsState = localStorage.getItem('InsState');

    this.Startdate = localStorage.getItem('Startdate');
    this.Enddate = localStorage.getItem('Enddate');
    this.SumIns = localStorage.getItem('SumIns');
    this.OutPremium = localStorage.getItem('OutPremium');
    this.InstPremium = localStorage.getItem('InstPremium');
    this.mPremium = localStorage.getItem('mPremium');
    this.BizUnit = localStorage.getItem('BizUnit');

    if (localStorage.getItem('AgenctNum') === "NULL") {
      this.AgenctNum = '';
    } if (localStorage.getItem('AgenctName') === "NULL") {
      this.AgenctName = '';
    } if (localStorage.getItem('InsuredName') === "NULL") {
      this.InsuredName = '';
    } if (localStorage.getItem('policy_number') === "NULL") {
      this.policy_number = '';
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
