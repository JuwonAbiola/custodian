import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ConnectPage } from '../pages/connect/connect';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ActivationPage } from '../pages/activation/activation';
import { PaymentPage } from '../pages/payment/payment';
import { NotificationPage } from '../pages/notification/notification';
import { KeysPage } from '../pages/keys/keys';
import { TransactionDetailsPage } from '../pages/transaction-details/transaction-details';
import { EnterPinPage } from '../pages/enter-pin/enter-pin';
import { InsertCardPage } from '../pages/insert-card/insert-card';
import { DetailsPage } from '../pages/details/details';
import { ProceedPage } from '../pages/proceed/proceed';
import { BusinessPage } from '../pages/business/business';
import { RenewalPage } from '../pages/renewal/renewal';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { SuccessPage } from '../pages/success/success';
import { FailedPage } from '../pages/failed/failed';
//import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ResultmodalPage } from '../pages/resultmodal/resultmodal';
import { DevicesModalPage } from '../pages/devices-modal/devices-modal';


@NgModule({
  declarations: [
    MyApp,
    TransactionDetailsPage,
    HomePage,
    InsertCardPage,
    EnterPinPage,
    LoginPage,
    ActivationPage,
    PaymentPage,
    NotificationPage,
    DevicesModalPage,
    KeysPage,
    DetailsPage,
    ProceedPage,
    BusinessPage,
    RenewalPage,
    SuccessPage,
    FailedPage,
    ConnectPage,
    ResultmodalPage
  ],
  imports: [
    BrowserModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EnterPinPage,
    InsertCardPage,
    TransactionDetailsPage,
    LoginPage,
    ActivationPage,
    PaymentPage,
    NotificationPage,
    DevicesModalPage,
    KeysPage,
    DetailsPage,
    ProceedPage,
    BusinessPage,
    RenewalPage,
    SuccessPage,
    FailedPage,
    ConnectPage,
    ResultmodalPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
