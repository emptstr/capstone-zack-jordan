import {Injectable} from "@angular/core";
import {DatabaseService} from "../database/db.service";


@Injectable()
/**
 * KnowledgeBaseService
 * - service returns the modaltites of the knowledge bases
 */
export class KnowledgeBaseService {

  private static readonly  KNOWLEDGE_BASE_ID = 'knowledge_base'
  private knowledge_base = [];

  /**
   * fetches the knowledge base from the database
   * @param db_service
   */
  constructor(db_service: DatabaseService){
    db_service.fetch(KnowledgeBaseService.KNOWLEDGE_BASE_ID).then(result => {
      this.knowledge_base = result.modalities;
    }).catch(err => {
      console.log(err)
      throw err
    })
  }

  /**
   * returns the knowlege_base arrays
   * @returns {Array}
   */
  public getKnowledgeBase(){
    return this.knowledge_base;
  }
}


