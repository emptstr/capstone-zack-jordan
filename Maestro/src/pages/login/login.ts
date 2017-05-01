import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AuthService} from '../../providers/auth/auth-service';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';

/**
 * Component for Login Page
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}

  /**
   * Click handler for Create new account button
   */
  public createAccount() {
    this.registerCredentials = {email: '', password: ''};
    this.nav.push(RegisterPage);  // Navigate to register page
  }

  /**
   * Click handler for Login button
   */
  public login() {
    // Look for user records in database
    this.auth.login(this.registerCredentials).then(allowed => {
      if (allowed) {
        setTimeout(() => {
          this.nav.setRoot(HomePage); // If credentials are found go to Dashboard
        });
      } else {
        this.showError("Access Denied"); // Credentials are not found
      }
    }).catch(err => {
      this.showError(err);
    })
  }

  /**
   * Display an error prompt if login is unsuccessful
   * @param text message to display
   */
  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
