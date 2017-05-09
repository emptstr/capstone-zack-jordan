import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { InitSurveyPage } from "../init-survey/init-survey"

/**
 * Component for welcome page
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public nav: NavController) {}

  /**
   * Click handler for Start Survey button
   */
  gotoSurvey(){
    this.nav.setRoot(InitSurveyPage); // Navigate to initial survey page
  }
}
