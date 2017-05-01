import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AuthService} from '../../providers/auth/auth-service'
import {DatabaseService} from "../../providers/database/db.service";
import { WelcomePage } from "../welcome/welcome"

/**
 * Component for register page
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {
  createSuccess = false;

  // Credentials to register the user
  registerCredentials = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,
              private db_service: DatabaseService) {}

  /**
   * Click handler for register button
   */
  public register() {
    this.auth.register(this.registerCredentials).then(success => {
      if (success) {
        this.createSuccess = true; // Account created successful
        this.showPopup("Success", "Account created."); // Display popup
        this.db_service.syncFrom("https://couchdb-743f41.smileupps.com/maestro-demo"); // Sync from couchdb
      } else {
        this.showPopup("Error", "Problem creating account."); // Account not created successfully
      }
    }).catch(error => {
      this.showPopup("Error", error);
    });
  }

  /**
   * Display alert after account creation attempt
   * @param title
   * @param text - message to be displayed
   */
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.setRoot(WelcomePage); // Go to welcome page if account was successfully created
            }
          }
        }
      ]
    });
    alert.present();
  }
}
