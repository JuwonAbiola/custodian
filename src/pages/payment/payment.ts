import { Component, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HomeePage } from '../homee/homee';
import { DevicesModalPage } from '../devices-modal/devices-modal';
import { InsertCardPage } from '../insert-card/insert-card';
import { EnterPinPage } from '../enter-pin/enter-pin';
import { TransactionDetailsPage } from '../transaction-details/transaction-details';
declare var PaypadFacade: any;

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  Startdate: string;
  Enddate: string;
  SumIns: string;
  Inst: string;
  InstPremium: string;
  OutPremium: string;
  subsidiary: string;
  in: string;
  private loader;


  constructor(public modalCtrl: ModalController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    this.subsidiary = localStorage.getItem('subsidiary')
    this.Startdate = localStorage.getItem('Startdate');
    this.Enddate = localStorage.getItem('Enddate');
    this.SumIns = localStorage.getItem('SumIns');
    this.Inst = localStorage.getItem('Inst');
    this.InstPremium = localStorage.getItem('InstPremium');
    this.OutPremium = localStorage.getItem('OutPremium');
    this.subsidiary = localStorage.getItem('subsidiary')

    if (this.subsidiary === '1') {
      this.in = "Installmental";
    }

  }

  back() {
    if (this.subsidiary === '1') {
      this.navCtrl.push(HomeePage);
    }
    else {
      this.navCtrl.push(HomePage);

    }

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

  payment() {

    // this.connectToPinpadAndDownloadKeys().then((res) => {

    // alert("PLEASE INSERT CARD");
    this.navCtrl.push(InsertCardPage);

    var loader = this.loading.create({
      content: '<ion-spinner name="bubbles"></ion-spinner> <br />',
    });

    PaypadFacade.payment({
      "amount":
        localStorage.getItem('Inst')
      , "account": "savings"
    }, (data) => {

      console.log(data);
      //console.log(JSON.stringify(data))

      if (data.operation === "payment") {

        //alert("PLEASE INSERT C ARD");

        if (data.status === "processing") {

          loader = this.loading.create({
            content: '<ion-spinner name="bubbles"></ion-spinner> <br />Processing...',
          });

          loader.present()

        } else if (data.status === "enterPin") {

          //alert("PLEASE ENTER PIN")

          this.navCtrl.push(EnterPinPage);

          loader.dismiss();

        } else {


          // alert(data);
          this.navCtrl.push(TransactionDetailsPage, { result: data });

          loader.dismiss();
        }
      }

    }, (error) => {
      console.log(error);
    })
  };

}
