/**
 *SurveyQuestion
 * a template for all survey questions
 */
export abstract class SurveyQuestion {
  question: string
  _id: string
  answer_choices: string[]
  num_answers: number
}