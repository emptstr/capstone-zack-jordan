import {Injectable} from "@angular/core";
import {DatabaseService} from "../database/db.service";


@Injectable()
/**
 * KnowledgeBaseService
 * - service returns the modaltites of the knowledge bases
 */
export class KnowledgeBaseService {

  private db_service: DatabaseService
  private knowledge_base_query;

  /**
   * fetches the knowledge base from the database
   * @param db_service
   */
  constructor(db_service: DatabaseService){
    this.db_service = db_service
    this.knowledge_base_query = function (doc, emit) {
      if (doc._id == "knowledge-base") {
        emit(doc);
      }
    }
  }

  /**
   * returns the knowlege_base arrays
   * @returns {Array}
   */
  public getKnowledgeBase(){
      return this.db_service.query(this.knowledge_base_query, {}).then(result => {
        console.log(result.rows)
        return result.rows
      }).catch(err => {
    throw err
  })
  }
}


