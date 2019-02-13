import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, Platform } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { NotificationPage } from '../pages/notification/notification';
import { ActivationPage } from '../pages/activation/activation';
import { KeysPage } from '../pages/keys/keys';
import { PaymentPage } from '../pages/payment/payment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = ActivationPage;
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = PolicyPage;
  pages: Array<{ name: string, component: any, icon: string }>;



  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { name: 'Redownload Keys', component: KeysPage, icon: "download" },
      { name: 'Notifications', component: NotificationPage, icon: "mail" },
      { name: 'Logout', component: LoginPage, icon: "log-out" },
    ];
  }




  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so te platorm is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

