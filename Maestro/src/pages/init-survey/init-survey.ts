import {Component} from '@angular/core';
import {UserPage} from "../../pages/user/user"

/**
 * Component for initial survey page
 */
@Component({
  selector: 'page-init-survey',
  templateUrl: 'init-survey.html'
})
export class InitSurveyPage {
  survey_name: string = "init-survey";  // Survey name used by survey_temp component
  navigate: Component = UserPage;       // navigate value used by survey_temp component
}
