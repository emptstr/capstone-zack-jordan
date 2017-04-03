import {Injectable} from "@angular/core";
import {DatabaseService} from "../database/db.service";
import {SurveyQuestion} from "./survey.question";

@Injectable()
/**
 * SurveyQuestionService
 * provides an interface to add and retrive survey questions from the database
 */
export class SurveyQuestionService {


  db_service: DatabaseService

  constructor(db_service: DatabaseService){
    this.db_service = db_service
  }

  /**
   * getSurveyQuestion
   * retrieves the survey questions with the provided id
   * @param id
   * @returns {Promise<SurveyQuestion>} - returns null if the questions does not exist
   */
  getSurveyQuestion(id: string): Promise<SurveyQuestion> {
    return this.db_service.fetch(id).then(result => {
       return result
    }).catch(error => {
      throw error
    })

  }

  /**
   * addSurveyQuestion
   * adds the provided survey to the database with the provided id
   * @param id
   * @param survey_question
   */
  addSurveyQuestion(id: string, survey_question: SurveyQuestion) {
      this.db_service.put(survey_question, id).then(result => {
        console.log("Successfully added survey question with id: " + id)
      }).catch(error => {
        console.log("Failed to add survey question with id: " + id)
        throw error
      })

  }

}