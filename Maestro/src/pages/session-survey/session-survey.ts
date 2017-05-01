import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home"
import {Session} from "../../providers/sessions/session"
import {SessionService} from "../../providers/sessions/session.service"

/**
 * Component for session survey
 *
 * Uses survey-temp reusable component to display survey.
 */
@Component({
  selector: 'page-session-survey',
  templateUrl: 'session-survey.html'
})

export class SessionSurveyPage {

  survey_name: string = "session-survey"; // Survey id to be passed to survey-temp
  navigate: Component = SessionSurveyPage; // navigate to be passed to survey-temp
  session: Session; // Holds session passed form new-session page
  from_session_survey: boolean;
  sess_answers = [];

  constructor(public navParams: NavParams, private sess: SessionService, private nav: NavController) {}

  /**
   * Initialize the directive/component after Angular first displays the data-bound properties
   * and sets the directive/component's input properties.
   */
  ngOnInit(){
    this.session = this.navParams.get("session"); // Get session passed from new-session page
    this.from_session_survey = this.navParams.get("from_session_survey");

    // If coming from session survey. Survey is completed
    if(this.from_session_survey) {

      // Get answers passed from survey-temp
      this.sess_answers = this.navParams.get("answers");

      console.log(this.sess_answers); // Testing

      //TODO: make new session with session answers before adding
      this.session.survey_answers = this.sess_answers;
      console.log(this.session);
      this.sess.addSession(this.session);
      this.nav.setRoot(HomePage); // Navigate to HomePage

    }
  }

}
