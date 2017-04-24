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
  navigate: Component = HomePage;
  session: Session;

  constructor(public navParams: NavParams, private sess: SessionService) {}

  ngOnInit(){
    this.session = this.navParams.get("session");
    this.sess.addSession(this.session);
  }

}
