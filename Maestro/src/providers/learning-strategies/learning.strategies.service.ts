import {Injectable} from "@angular/core";
import {DatabaseService} from "../database/db.service";

@Injectable()
/**
 * LearningStrategiesService
 * returns the learning strategies object from the database
 */
export class LearningStrategiesService {

 private static readonly LEARNING_STRATEGIES_ID = "learning_strategies"
 private db_service: DatabaseService
 private strategies = [];

  /**
   * fetches the learning strategies from the database
   * @param db_service
   */
 constructor(db_service: DatabaseService){
  db_service.fetch(LearningStrategiesService.LEARNING_STRATEGIES_ID).then(result => {
    this.strategies = result.stategies
  }).catch(err => {
    console.log(err)
    throw err
  })
 }

  /**
   * getStrategies
   * - returns the strategies array
   * @returns {Array}
   */
 getStrategies(){
   return this.strategies
 }
}