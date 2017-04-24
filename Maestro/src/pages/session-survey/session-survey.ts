import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-session-survey',
  templateUrl: 'session-survey.html'
})
export class SessionSurveyPage {

  survey_name: string = "sessions-survey";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

}
