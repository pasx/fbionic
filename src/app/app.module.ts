import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { HomeRtdbPage } from '../pages/homeRtdb/homeRtdb';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
	LoginPage,
    AboutPage,
    HomePage,
    HomeRtdbPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	LoginPage,
    AboutPage,
    HomePage,
    HomeRtdbPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
