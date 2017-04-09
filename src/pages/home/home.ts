import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';
import { EventsPage } from '../events/events';

import md5 from 'crypto-md5';
import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profilePicture: any = "https://www.gravatar.com/avatar/"

  constructor(
    public navCtrl: NavController,
    public user:User,
    public auth:Auth,
    private platform: Platform,
    private alertController: AlertController
  ) {
    console.log(user);
    this.profilePicture = "https://www.gravatar.com/avatar/" + md5(user.data.data["email"].toLowerCase(), 'hex');
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  public scan() {
    this.platform.ready().then(() => {
      BarcodeScanner.scan().then((data) => {
        if (data && data.text != '') {
          let alert = this.alertController.create({
            title: "Attention!",
            subTitle: "Success",
            buttons: ["Close"]
          });
          alert.present();
        }
      }, (err) => {
        let alert = this.alertController.create({
          title: "Attention!",
          subTitle: err,
          buttons: ["Close"]
        });
        alert.present();
      });
    });
  }

  public showEvents() {
    this.navCtrl.setRoot(EventsPage);
  }

}
