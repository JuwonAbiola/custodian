// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

// /**
//  * Generated class for the DevicesModalPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @IonicPage()
// @Component({
//   selector: 'page-devices-modal',
//   templateUrl: 'devices-modal.html',
// })
// export class DevicesModalPage {

//   constructor(public navCtrl: NavController, public navParams: NavParams) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad DevicesModalPage');
//   }

// }

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InsertCardPage } from '../insert-card/insert-card';
import { EnterPinPage } from '../enter-pin/enter-pin';
import { TransactionDetailsPage } from '../transaction-details/transaction-details';
declare var PaypadFacade: any;
// import { PaymodePage } from '../paymode/paymode';
// import { AccountypePage } from '../accountype/accountype';

/**
 * Generated class for the DevicesModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devices-modal',
  templateUrl: 'devices-modal.html',
})
export class DevicesModalPage {
  dataDevices: Array<any> = [];
  deviceList: Array<any>
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, private alertCtrl: AlertController, public loading: LoadingController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicesModalPage');
    // console.log(JSON.stringify(this.navParams.get('obj')));
    this.deviceList = this.navParams.get('obj');
  }



  bluetoothfunc(name, address) {

    console.log('bluetooth address', address);
    console.log("Got here")
    var loader = this.loading.create({
      content: '<ion-spinner name="bubbles"></ion-spinner> <br />',
    });

    PaypadFacade.connection(address, (response) => {

      console.log('status ', response.status, 'address', address);

      var status = response.status;

      if (status) {

        if (status === "enabling_bluetooth") {
          loader = this.loading.create({
            content: '<ion-spinner name="bubbles"></ion-spinner> <br />Please wait enabling bluetooth...',
          });
          loader.present()
        }
        else if (status === "connecting") {
          loader.dismiss()
          console.log('connecting ', status);
          loader = this.loading.create({
            content: '<ion-spinner name="bubbles"></ion-spinner> <br /> Connecting to pinpad...',
          });

          loader.present()
        } else if (status === "connected") {
          // alert('Yaaaaaaaay');
          loader.dismiss()
          // alert(status)

          console.log("connected from devices page")

          localStorage.setItem("agree", "true");


          var x = localStorage.getItem("terminalId");

          // alert('the terminal Id is ' + x);
          var selectedbank = "Esl";
          PaypadFacade.initialization(x, true, selectedbank, (response) => {
            console.log(response)
            var status = response.status;
            // alert('Initialization status '+ status);
            if (status) {
              if (status === "downloading_keys") {
                loader = this.loading.create({
                  content: '<ion-spinner name="bubbles"></ion-spinner> <br />Please wait, downloading keys...',
                });
                loader.present()

              } else if (status === "loading_keys_to_pinpad") {

                loader.dismiss();

                alert('KEY DOWNLOAD SUCCESSFUL');

                localStorage.setItem("initialization", "true");

                this.navCtrl.setRoot(LoginPage);

                console.log('called payment from devices page')

                this.payment();

              } else if (status == "Already_initialised") {
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

            alert.present();

            localStorage.setItem("initialization", "false");


          });
        } else {
          loader.dismiss();
        }
      }

    }, (response) => {
      // alert("Error "+JSON.stringify(response));
      loader.dismiss();

      localStorage.setItem("initialization", "false");
      let alert = this.alertCtrl.create({
        title: 'Status',
        subTitle: 'Unable to Connect to Pinpad',
        buttons: ['Dismiss']
      });

      alert.present();

    });
  };

  payment() {

    console.log("Got here")

    //alert("PLEASE INSERT CARD")

    // this.navCtrl.push(InsertCardPage);

    var loader = this.loading.create({
      content: '<ion-spinner name="bubbles"></ion-spinner> <br />',
    });


    PaypadFacade.payment({
      "amount":
        localStorage.getItem('inst')

      , "account": "savings"
    }, (data) => {

      console.log("data from payment")
      console.log(data);
      //console.log(JSON.stringify(data))

      if (data.operation === "payment") {

        if (data.status === "processing") {

          loader = this.loading.create({
            content: '<ion-spinner name="bubbles"></ion-spinner> <br />Processing...',
          });

          loader.present()

        } else if (data.status === "enterPin") {

          //alert("PLEASE ENTER PIN")
          // this.navCtrl.push(EnterPinPage);

          loader.dismiss();

        } else {

          // alert(data);
          this.navCtrl.push(TransactionDetailsPage, { result: data });

          loader.dismiss();
        }
      }

    }, (error) => {
      console.log(error);
    });
  };

}