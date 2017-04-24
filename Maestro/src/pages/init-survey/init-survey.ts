import {Component} from '@angular/core';
import {UserPage} from "../../pages/user/user"


@Component({
  selector: 'page-init-survey',
  templateUrl: 'init-survey.html'
})
export class InitSurveyPage {

  survey_name: string = "init-survey";
  navigate: Component = UserPage;

  constructor() {
  }

}
