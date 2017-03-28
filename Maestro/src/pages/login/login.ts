import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AuthService} from '../../providers/auth/auth-service';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController,
              private auth: AuthService,
              private alertCtrl: AlertController) {
  }

  public createAccount() {
    this.registerCredentials = {email: '', password: ''};
    this.nav.push(RegisterPage);
  }

  public login() {
    this.auth.login(this.registerCredentials).then(allowed => {
      if (allowed) {
        setTimeout(() => {
          this.nav.setRoot(HomePage);
        });
      } else {
        this.showError("Access Denied");
      }
    }).catch(err => {
      this.showError(err);
    })
  }


  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
