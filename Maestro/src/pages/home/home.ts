import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { NewSessionPage } from "../new-session/new-session"

/**
 * Component for HomePage/Dashboard
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  navigate = HomePage;

  constructor(private nav: NavController) {}

  /**
   * Navigates to New Session Page
   */
  newSession() {
    this.nav.push(NewSessionPage);
  }


}
