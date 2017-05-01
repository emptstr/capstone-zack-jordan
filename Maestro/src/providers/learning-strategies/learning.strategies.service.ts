import {Injectable} from "@angular/core";
import {DatabaseService} from "../database/db.service";

@Injectable()
/**
 * LearningStrategiesService
 * returns the learning strategies object from the database
 */
export class LearningStrategiesService {

 private db_service: DatabaseService
 private learning_strategies_query
  /**
   * fetches the learning strategies from the database
   * @param db_service
   */
 constructor(db_service: DatabaseService){
    this.db_service = db_service;
    this.learning_strategies_query = function(doc, emit) {
      if(doc.strategies){
        emit(doc.strategies,doc)
      }
    }
 }

  /**
   * getStrategies
   * - returns the strategies array
   * @returns {Array}
   */
 getStrategies(){
   return this.db_service.query(this.learning_strategies_query, {}).then(result => {
     let strategies = []
     let rows = result.rows
     for(let row of rows){
        strategies.push(row.value.strategies)
     }
    return strategies
   }).catch(err => {
     throw err
   })
 }
}