import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { DevicesModalPage } from '../devices-modal/devices-modal';
import { LoginPage } from '../login/login';
declare var PaypadFacade: any;
/**
 * Generated class for the ConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage {

  constructor(public modalCtrl: ModalController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectPage');
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
                  content: '<ion-spinner name="bubbles"></ion-spinner> <br />Please wait downloading keys...',
                });
                loader.present()
              } else if (status === "loading_keys_to_pinpad") {

                loader.dismiss();

                console.log('called payment from payment page')

                alert("KEY DOWNLOAD SUCCESSFUL")
                this.navCtrl.setRoot(LoginPage);
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
}
