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
      if (doc.modalities) {
        emit(doc.modalities, doc);
      }
    }
  }

  /**
   * returns the knowlege_base arrays
   * @returns {Array}
   */
  public getKnowledgeBase(){
      return this.db_service.query(this.knowledge_base_query, {}).then(result => {
      let modalities = []
      let rows = result.rows;
      for (let row of rows){
        modalities.push(row.value.modalities)
      }
      return modalities
    }).catch(err => {
    throw err
  })
  }
}


