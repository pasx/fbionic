import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeRtdbPage } from '../homeRtdb/homeRtdb';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { FirebaseApi } from '../../api/firebaseApi';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  fbApi: FirebaseApi;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {

    this.navCtrl = navCtrl;
    //add login code here
    //cf.:https://scotch.io/tutorials/build-an-ionic-app-with-user-authentication

    this.httpClient.get("assets/firebase-config.json")
      .subscribe(response => {
        this.initFirebase(response);
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  initFirebase(config) {
    new FirebaseApi(config);
    this.fbApi = FirebaseApi._instance;
    this.fbApi.login.onAuthStateChangedCallback = this.onAuthStateChanged;
  }

  get loggedIn(): boolean {
    return this.fbApi && !!this.fbApi.login.currentUser;
  }

  signIn() {
    this.fbApi.login.signIn(this);
  }

  rtdb() {
    this.navCtrl.push(HomeRtdbPage);
  }

  firestore() {
    this.navCtrl.push(HomePage);
  }

  about() {
    this.navCtrl.push(AboutPage);
  }

  signOut() {
    this.fbApi.login.signOut();
  }

  onAuthStateChanged(context: any, user: any) {
    if (user) { // User is signed in!

      // // Get profile pic and user's name from the Firebase user object.
      // var profilePicUrl = user.photoURL;

      var userName = user.displayName;
      //alert(userName);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
