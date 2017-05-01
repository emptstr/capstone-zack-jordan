import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home"
import {Session} from "../../providers/sessions/session"
import {SessionService} from "../../providers/sessions/session.service"

@Component({
  selector: 'page-session-survey',
  templateUrl: 'session-survey.html'
})
export class SessionSurveyPage {

  survey_name: string = "session-survey";
  navigate: Component = SessionSurveyPage;
  session: Session;
  from_session_survey: boolean;
  sess_answers = [];

  constructor(public navParams: NavParams, private sess: SessionService, private nav: NavController) {}

  ngOnInit(){
    this.session = this.navParams.get("session");
    this.from_session_survey = this.navParams.get("from_session_survey");

    if(this.from_session_survey) {

      this.sess_answers = this.navParams.get("answers");
      console.log(this.sess_answers);

      //TODO: make new session with session answers before adding
      this.sess.addSession(this.session);
      this.nav.setRoot(HomePage);

    }
  }

}
