import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { NewSessionPage } from '../new-session/new-session';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  session_name = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthService) {}

  /**
   * Navigates to New Session Page
   */
  public newSession(){
    this.nav.push(NewSessionPage);
  }

}