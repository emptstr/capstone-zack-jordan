import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { SessionPage } from "../session/session"

/**
 * Component for HomePage/Dashboard
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(private nav: NavController) {}

  /**
   * Navigates to New Session Page
   */
  newSession() {
    this.nav.push(SessionPage);
  }


}
