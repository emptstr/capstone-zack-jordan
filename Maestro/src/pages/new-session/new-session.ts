import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StartSessionPage } from '../start-session/start-session'

@Component({
  selector: 'page-new-session',
  templateUrl: 'new-session.html'
})
export class NewSessionPage {
  session_title = '';
  constructor(public nav: NavController, public navParams: NavParams) {

  }

  startSession(){
    this.nav.push(StartSessionPage)
  }

}
