import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseApi } from '../../api/firebaseApi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  textMaxLength: number = 100;
  map: any;
  selectedMap:any;
  data: any[];
  fbApi: FirebaseApi;
  constructor(public navCtrl: NavController) {
    this.fbApi = FirebaseApi._instance;
    this.data=[];
    this.map = {
      "ads":{
        "imageUrl":"ImageUrl",
        "header":"Company",
        "text":"Description",
        "location":"Location"
      }
    };
    this.selectedMap = this.map.ads;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    var setData = function(snapshot) {
      snapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        var map = this.selectedMap;
        var data = doc.data();
        var val = {"id":doc.id};
        for (var key in map) {
          val[key]=data[map[key]];
        }

        if(val["text"].length>this.textMaxLength) val["text"] = val["text"].substring(0,this.textMaxLength)+"...";

        this.data.push(val);
      });
    }.bind(this);

    //this.fbApi.firestore.getAll("/ads/",setData); 

    this.fbApi.firestore.getOrdered("/ads/", "JobType", false, 12, setData);
  }
}
