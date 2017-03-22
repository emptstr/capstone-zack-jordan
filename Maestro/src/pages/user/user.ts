import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { LoginPage } from '../login/login';
import { User, Name } from '../../providers/database/user';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: User;
  username: string = "";
  email: string;

  constructor(private nav: NavController, private auth: AuthService) {
    let info = this.auth.getUserInfo();
    console.log(JSON.stringify(info.name));
    this.username = info.name.firstname + " " + info.name.lastname;
    this.email = info._id;
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }

}
