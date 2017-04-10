import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AuthService} from '../../providers/auth/auth-service'
import {DatabaseService} from "../../providers/database/db.service";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  constructor(private nav: NavController,
              private auth: AuthService,
              private alertCtrl: AlertController,
              private db_service: DatabaseService) {
  }

  public register() {
    this.auth.register(this.registerCredentials).then(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
        this.db_service.syncFrom("https://couchdb-743f41.smileupps.com/maestro-demo")
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    }).catch(error => {
      this.showPopup("Error", error);
    });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
