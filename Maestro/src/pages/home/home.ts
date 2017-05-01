import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { NewSessionPage } from "../new-session/new-session"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loaded: boolean = false;

  constructor(private nav: NavController, public navParams: NavParams) {}

  /**
   * Navigates to New Session Page
   */
  newSession() {
    this.nav.push(NewSessionPage);
  }


}
