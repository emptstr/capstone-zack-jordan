import {Injectable} from "@angular/core";
import {DatabaseService} from "../database/db.service";
import {Survey} from "./survey";

@Injectable()
/**
 * SurveyService
 * provides an interface to add and retrieve surveys from the database
 */
export class SurveyService {


  db_service: DatabaseService

  constructor(db_service: DatabaseService){
    this.db_service = db_service
  }

  /**
   * getQuestion
   * retrieves the survey with the provided id
   * @param id
   * @returns {Promise<SurveyQuestion>} - returns null if the survey does not exist
   */
  getSurvey(id: string): Promise<Survey>{
    return this.db_service.fetch(id).then(result =>{
      return result
    }).catch(error =>{
      throw error
      })
  }

  /**
   * addSurvey
   * adds the provided survey to the database with the provided id
   * @param id
   * @param survey
   */
  addSurvey(id: string, survey: Survey){
    return this.db_service.put(survey, id).then(result => {
      console.log("Successfully added survey with ID: " + id)
    }).catch(error => {
      throw error
    })
  }
}