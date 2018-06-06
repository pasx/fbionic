import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseApi } from '../../api/firebaseApi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fbApi: FirebaseApi;
  messageInput: HTMLElement;
  messageList: HTMLElement;
  MESSAGE_TEMPLATE =
    '<div class="message-container">' +
    '<div class="spacing"><div class="pic"></div></div>' +
    '<div class="message"></div>' +
    '<div class="name"></div>' +
    '</div>';
  LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

  constructor(public navCtrl: NavController) {
    this.fbApi = FirebaseApi._instance;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.messageList = document.getElementById('messages');
    this.messageInput = document.getElementById('message');

    var setMessage = function(data) {
      var val = data.val();
      this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
    }.bind(this);

    this.fbApi.database.loadLast("/messages/",setMessage,12); 
  }

  displayMessage(key, name, text, picUrl, imageUri) {
    var div = document.getElementById(key);
    // If an element for that message does not exists yet we create it.
    if (!div) {
      var container = document.createElement('div');
      container.innerHTML = this.MESSAGE_TEMPLATE;
      div = container.firstChild as HTMLElement;
      div.setAttribute('id', key);
      this.messageList.appendChild(div);
    }
    if (picUrl) {
      (div.querySelector('.pic') as HTMLElement).style.backgroundImage = 'url(' + picUrl + ')';
    }
    div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.message');
    if (text) { // If the message is text.
      messageElement.textContent = text;
      // Replace all line breaks by <br>.
      messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    } else if (imageUri) { // If the message is an image.
      var image = document.createElement('img');
      image.addEventListener('load', function () {
        this.messageList.scrollTop = this.messageList.scrollHeight;
      }.bind(this));
      this.setImageUrl(imageUri, image);
      messageElement.innerHTML = '';
      messageElement.appendChild(image);
    }
    // Show the card fading-in and scroll to view the new message.
    setTimeout(function () { div.classList.add('visible') }, 1);
    this.messageList.scrollTop = this.messageList.scrollHeight;
    this.messageInput.focus();
  };

  setImageUrl(imageUri, imgElement) {
    // If the image is a Cloud Storage URI we fetch the URL.
    if (imageUri.startsWith('gs://')) {
      imgElement.src = this.LOADING_IMAGE_URL; // Display a loading image first.
      this.fbApi.database.storage.refFromURL(imageUri).getMetadata().then(function (metadata) {
        imgElement.src = metadata.downloadURLs[0];
      });
    } else {
      imgElement.src = imageUri;
    }
  };

}
