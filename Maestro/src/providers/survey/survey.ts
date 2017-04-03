import {SurveyQuestion} from "./survey.question";

/**
 * Survey
 * a base template for all surveys
 */
export abstract class Survey {
  questions: SurveyQuestion[]
  _id: string
  num_questions: number
}