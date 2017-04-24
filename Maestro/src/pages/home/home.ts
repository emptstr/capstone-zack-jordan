import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { NewSessionPage } from "../new-session/new-session"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loaded: boolean = false;
  sessions: any = [];
  sess_answers = [];
  from_session_survey = false;


  constructor(private nav: NavController, public navParams: NavParams) {}

  ngOnInit(){
    this.from_session_survey = this.navParams.get("from_session_survey");

    if(this.from_session_survey) {
      this.sess_answers = this.navParams.get("answers");
      console.log(this.sess_answers);
      //TODO: Add session survey to database

    }
  }

  /**
   * Navigates to New Session Page
   */
  newSession() {
    this.nav.push(NewSessionPage);
  }


}
