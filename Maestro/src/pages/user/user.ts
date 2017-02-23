import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  username = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthService) {
    //let info = this.auth.getUserInfo();
    //For Dev hard code
    this.username = 'Zack Walton'; //info.name;
    this.email = 'ztwalto@gmail.com';//info.email;
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }

}
