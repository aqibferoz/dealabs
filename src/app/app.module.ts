import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { ListPage } from '../pages/list/list';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig  } from '../environment';

import { AngularFireStorageModule } from 'angularfire2/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { UploadealsPage } from '../pages/uploadeals/uploadeals';
import { Login1Page } from '../pages/login1/login1';
import { CpasswordPage } from '../pages/cpassword/cpassword';
import { UsernamePage } from '../pages/username/username';
import { DeleteAccountPage } from '../pages/delete-account/delete-account';
import { DataRequestPage } from '../pages/data-request/data-request';
import { DealPage } from '../pages/deal/deal';
import { AddealsPage } from '../pages/addeals/addeals';
import { AddealsPageModule } from '../pages/addeals/addeals.module';
import { AdddealsProvider } from '../providers/adddeals/adddeals';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UpdateDealsPage } from "../pages/update-deals/update-deals";
import { UpdateDealsPageModule } from '../pages/update-deals/update-deals.module';
import { HelperProvider } from '../providers/helper/helper';

import {SelectSearchableModule} from 'ionic-select-searchable'
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LoginPageModule } from '../pages/login/login.module';
import { StartingPage } from '../pages/starting/starting';
// import { ViewDealPage } from '../pages/view-deal/view-deal';
import { ViewDealPageModule } from '../pages/view-deal/view-deal.module';
import { Login1PageModule } from '../pages/login1/login1.module';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner  } from "@ionic-native/barcode-scanner";
import { UsernamePageModule } from '../pages/username/username.module';
// import { TabhomePage } from '../pages/tabhome/tabhome';
import { TabhomePageModule } from '../pages/tabhome/tabhome.module';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    // LoginPage,
    UploadealsPage,
    // Login1Page,
    CpasswordPage,
    // UsernamePage,
    DeleteAccountPage,
    DataRequestPage,
    DealPage,
    StartingPage,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AddealsPageModule,
    AngularFirestoreModule,
    UpdateDealsPageModule,
    LoginPageModule,
    AngularFireStorageModule
,   UsernamePageModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ViewDealPageModule,
    Login1PageModule,
    NgxQRCodeModule,
    TabhomePageModule,
    SelectSearchableModule,
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    UploadealsPage,
    Login1Page,
    CpasswordPage,
    UsernamePage,
    DeleteAccountPage,
    DataRequestPage,
    DealPage,
    AddealsPage,
    StartingPage,
    
    
  
    
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, 
    AngularFireAuthModule,
    AngularFireAuth,
    FirestoreProvider,
    AdddealsProvider,
    HelperProvider,
    BarcodeScanner,
    Camera,
    AndroidPermissions

  ]
})
export class AppModule {}
