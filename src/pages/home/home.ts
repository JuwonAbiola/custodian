import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
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
  insuredNameField: string;
  insuredOthNameField: string;
  insuredEmailField: string;
  dOBField: string;
  telNumField: string;
  insAddr1Field: string;
  insAddr2Field: string;
  insStateField: string;
  agenctNameField: string;
  agenctNumField: string;


  startdateField: string;
  enddateField: string;
  sumInsField: string;
  outPremiumField: string;
  instPremiumField: string;
  mPremiumField: string;
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
  inst: string;
  testRadioOpen: boolean;
  testRadioResult;
  // gsm: string;
  // email: string;
  // userID: string;

  constructor(public menuCtrl: MenuController, public modalCtrl: ModalController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController) {
    this.menuCtrl.enable(true, 'myMenu');
  }

  openModal(data) {
    let myModal = this.modalCtrl.create(DevicesModalPage, { 'obj': data });
    myModal.present();
  }
  connectToPinpadAndDownloadKeys() {

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

    this.startdateField = localStorage.getItem('startdateField');
    this.enddateField = localStorage.getItem('enddateField');
    this.sumInsField = localStorage.getItem('sumInsField');
    this.outPremiumField = localStorage.getItem('outPremiumField');
    this.instPremiumField = localStorage.getItem('instPremiumField');
    this.mPremiumField = localStorage.getItem('mPremiumField');

    let instPremium = parseInt(this.outPremiumField);
    let insta = instPremium;
    var all = new Array();
    for (let current = instPremium; current <= instPremium * 10; current = current + insta) {
      all.push(current);
      console.log(current)
    }

    this.all0 = all[0]
    this.all1 = all[1]
    this.all2 = all[2]
    this.all3 = all[3]
    this.all4 = all[4]
    this.all5 = all[5]
    this.all6 = all[6]
    this.all7 = all[7]
    this.all8 = all[8]
    this.all9 = all[9]

  }

  doRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Installmental Premium:');

    alert.addInput({
      type: 'radio',
      label: '₦' + this.all0,
      value: this.all0,
    });

    alert.addInput({
      type: 'radio',
      label: '₦' + this.all1,
      value: this.all1
    });

    alert.addInput({
      type: 'radio',
      label: '₦' + this.all2,
      value: this.all2
    });

    alert.addInput({
      type: 'radio',
      label: '₦' + this.all3,
      value: this.all3
    });

    alert.addInput({
      type: 'radio',
      label: '₦' + this.all4,
      value: this.all4
    });

    alert.addInput({
      type: 'radio',
      label: '₦' + this.all5,
      value: this.all5
    });

    alert.addInput({
      type: 'radio',
      label: '₦' + this.all6,
      value: this.all6
    });
    alert.addInput({
      type: 'radio',
      label: '₦' + this.all7,
      value: this.all7
    });
    alert.addInput({
      type: 'radio',
      label: '₦' + this.all8,
      value: this.all8
    });
    alert.addInput({
      type: 'radio',
      label: '₦' + this.all9,
      value: this.all9
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.inst = data;
        localStorage.setItem('inst', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }


}
