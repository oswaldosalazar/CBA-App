import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  FB_APP_ID: number = 1226196227426470;

  constructor(public navCtrl: NavController) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFbLogin(){
    let permissions = new Array<string>();
    console.log("Logging in")
    let nav = this.navCtrl;

    permissions= ["public_profile"];

    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        console.log(user)
        user.picture = "https://graph.facebook.com/" + userId + "picture?type=large";
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(UserPage);
        }, function(error){
          console.log(error)
        })
      })
    }, function(error){
      console.log(error)
    });
  }
}
