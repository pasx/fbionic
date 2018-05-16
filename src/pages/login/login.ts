import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseApi } from '../../api/firebaseApi';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  fbApi: FirebaseApi;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {

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
    // Initialize Firebase
    new FirebaseApi(config);

    this.fbApi = FirebaseApi._instance;
    let firebase = this.fbApi.firebase;

    this.fbApi.login.onAuthStateChangedCallback = this.onAuthStateChanged;
  }

  signIn() {
    this.fbApi.login.signIn();
  }

  onAuthStateChanged(user: any) {
    alert(user);
    if (user) { // User is signed in!
      // Get profile pic and user's name from the Firebase user object.
      var profilePicUrl = user.photoURL;
      var userName = user.displayName;
      alert(userName);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
