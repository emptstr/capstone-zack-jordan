import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewSessionPage } from "../new-session/new-session"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loaded: boolean = false;
  sessions: any = [];

  constructor(private nav: NavController) {}

  /**
   * Navigates to New Session Page
   */
  newSession() {
    this.nav.push(NewSessionPage);
  }

}
