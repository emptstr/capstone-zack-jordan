import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { NewSessionPage } from '../new-session/new-session';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthService) {}


  public newSession(){
    this.nav.push(NewSessionPage);
  }

}