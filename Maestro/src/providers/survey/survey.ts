import {SurveyQuestion} from "./survey.question";

/**
 * Survey
 * a base template for all surveys
 */
export class Survey {
  _id: string
  questions: SurveyQuestion[]
}