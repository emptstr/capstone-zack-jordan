import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InitSurveyPage } from "../init-survey/init-survey"


@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public nav: NavController, public navParams: NavParams) {}

  gotoSurvey(){
    this.nav.setRoot(InitSurveyPage)
  }
}
