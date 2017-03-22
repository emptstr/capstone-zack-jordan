//import {DesignDoc} from "./db.design.doc";
import {Injectable} from "@angular/core";
import * as PouchDB from "pouchdb"

@Injectable()
/**
 * Database Service
 * provides an interface to the PouchDB datastore
 */
export class DatabaseService {

  //private static readonly VIEW_NAME_QUERY_PREFIX: string = "_design/";
  private static readonly NOT_FOUND_ERROR: string = "404";
  private static readonly DB_NAME: string = "MAESTRO-1";
  private _db;
  private bootstrap_function;

  constructor() {
    this._db = new PouchDB(DatabaseService.DB_NAME, {adapter: 'websql'});
    this.bootstrap_function =
      function bootstrap(view_name: string) {
        console.log("bootstraping " + view_name)
        return this._db.query(view_name, {limit: 0})
      }
  }

  /**
   * setDB
   * setter for the database, used primarly for testing
   * @param _db
   */
  public setDB(_db) {
    this._db = _db;
  }

  /**
   * fetch
   * fetches the document described by the provided id from the databse
   * @param _id
   */
  public fetch(_id: string) {
    return this._db.get(_id).then(result => {
      return result;
    }).catch(error => {
      if (error.status == DatabaseService.NOT_FOUND_ERROR) {
        console.log("Document with ID " + _id + " not found");
        return null;
      }
      throw error;
    });
  }

  /**
   * fetch
   * fetches all records from the database
   */
  public fetchAll() {
    return this._db.allDocs({include_docs: true});
  }


  /**
   * query
   * queries a existing view descirbed by the viewname with the provided options
   * @param view_name
   * @param options
   */

  public query(view_name, options: {}) {
    return this._db.query(view_name, options);
  }

  /**
   * put
   * inserts an nonexisting document into the databse or updates the existing database.
   * @param document
   * @param _id
   */
  public put(document: any, _id: string) {
    return this._db.get(_id).then((result) => {
      document._rev = result._rev;
      return this._db.put(document);
    }).catch((error) => {
      error;
      if (error.status == DatabaseService.NOT_FOUND_ERROR) {
        return this._db.put(document);
      } else {
        throw error;
      }
    })
  }

  //todo implement a delete doc function
}
