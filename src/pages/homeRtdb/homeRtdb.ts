import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseApi } from '../../api/firebaseApi';

@Component({
  selector: 'page-home-rtbd',
  templateUrl: 'homeRtdb.html'
})
export class HomeRtdbPage {
  messages: any[];
  fbApi: FirebaseApi;

  constructor(public navCtrl: NavController) {
    this.messages = [];
    this.fbApi = FirebaseApi._instance;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    var setMessage = function(data) {
      var val = data.val();
      val.id = data.key;
      this.messages.push(val);
    }.bind(this);

    this.fbApi.database.loadLast("/messages/",setMessage,12); 
  }


}
