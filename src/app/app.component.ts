import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, Platform, NavController, App, AlertController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { NotificationPage } from '../pages/notification/notification';
import { ActivationPage } from '../pages/activation/activation';
import { HomePage } from '../pages/home/home';
import { HomeePage } from '../pages/homee/homee';
import { timer } from 'rxjs/observable/timer';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = ActivationPage;
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = PolicyPage;
  pages: Array<{ name: string, component: any, icon: string }>;

  showSplash = true;


  constructor(public splashScreen: SplashScreen, public statusBar: StatusBar, public platform: Platform, public app: App, public alertCtrl: AlertController

  ) {
    this.initializeApp();

    this.pages = [
      // { name: 'Redownload Keys', component: KeysPage, icon: "download" },
      { name: 'Notifications', component: NotificationPage, icon: "mail" },
      { name: 'Logout', component: LoginPage, icon: "log-out" },
    ];
  }




  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so te platorm is ready and our plugins are available.

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s

      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // Splashscreen.hide();
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        // Checks if can go back before show up the alert
        if (activeView.name === 'ConnectPage' || activeView.name === 'ActivationPage') {

          this.platform.exitApp();
        }
        if (activeView.name === 'HomePage' || activeView.name === 'HomeePage') {

          this.nav.setRoot(LoginPage);

        }


        if (activeView.name === 'LoginPage') {
          const confirm = this.alertCtrl.create({
            title: 'Exit',
            message: 'Are you sure you want to exit the app?',
            buttons: [
              {
                text: 'Cancel',
                handler: () => {
                  return;
                }
              },
              {
                text: 'Confirm',
                handler: () => {
                  this.platform.exitApp();
                }
              }
            ]
          });
          confirm.present();
        }



        if (localStorage.getItem('subsidiary') === '1' && activeView.name === 'TransactionDetailsPage') {
          this.nav.setRoot(HomeePage);
        }
        else if (localStorage.getItem('subsidiary') === '2' && activeView.name === 'TransactionDetailsPage') {
          this.nav.setRoot(HomePage);
        }

        if (localStorage.getItem('subsidiary') === '1' && activeView.name === 'PaymentPage') {
          this.nav.setRoot(HomeePage);
        }
        else if (localStorage.getItem('subsidiary') === '2' && activeView.name === 'PaymentPage') {
          this.nav.setRoot(HomePage);
        }

        if (localStorage.getItem('subsidiary') === '1' && activeView.name === 'NotificationPage') {
          this.nav.setRoot(HomeePage);
        }
        else if (localStorage.getItem('subsidiary') === '2' && activeView.name === 'NotificationPage') {
          this.nav.setRoot(HomePage);
        }

        if (localStorage.getItem('subsidiary') === '1' && activeView.name === 'DetailsPage') {
          this.nav.setRoot(HomeePage);
        }
        else if (localStorage.getItem('subsidiary') === '2' && activeView.name === 'DetailsPage') {
          this.nav.setRoot(HomePage);
        }

        // else {
        //   this.nav.setRoot(LoginPage);
        // }

        // this.platform.exitApp();
      });
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

