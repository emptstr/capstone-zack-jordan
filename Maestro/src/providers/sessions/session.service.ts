import {Injectable} from "@angular/core";
import {DatabaseService} from "../database/db.service";
//import {SessionServiceDesignDoc} from "./session.service.design.doc";
import {Session} from "./session";

@Injectable()
/**
 * SessionService
 * provides the interface to create and manipulate user sessions
 */
export class SessionService {

  private db_service: DatabaseService
  private sessionsByDate;

  constructor(db_service: DatabaseService) {
    this.db_service = db_service
    this.sessionsByDate = function (doc, emit) {
      if (doc.start_time) {
        emit(doc.start_time, doc);
      }
    }
  }

  /**
   * addSession
   * adds a session object to the database
   * @param session
   */
  public addSession(session: Session) {
    this.db_service.put(session, session._id).then(result => {
      console.log("Successfully added session")
    }).catch(err => {
      console.log("Error while inserting session with ID: " + session._id + "into database")
      throw err;
    })
  }

  /**
   * getSessionsInRange
   * returns the sessions that fall between the two provivded start dates
   * @param start_date
   * @param end_date
   * @param limit - represents the maximum number of sessions to return
   * @returns {Promise<TResult|T>}
   */
  public getSessionsInRange(start_date: number[], end_date: number[], limit: number): Promise<Session[]> {
    return this.db_service.query(this.sessionsByDate, {
      startkey: start_date,
      endkey: end_date,
      limit: limit
    }).then(result => {
      let sessions: Session[] = []
      let rows = result.rows;
      for (let row of rows) {
        let session: Session = row.value
        sessions.push(session)
      }
      return sessions;
    }).catch(err => {
      throw err;
    })
  }

  /**
   * getPreviousSessions
   * returns mamximum limit previous working sessions
   * @param limit
   * @returns {Promise<TResult|T>}
   */
  public getPreviousSessions(limit: number): Promise<Session[]> {
    return this.db_service.query(this.sessionsByDate, {descending: true, limit: limit}).then(result => {
      let sessions: Session[] = []
      let rows = result.rows;
      for (let row of rows) {
        let session: Session = row.value
        sessions.push(session)
      }
      return sessions;
    }).catch(err => {
      console.log("failed to query service");
      throw err;
    })
  }

  /**
   * getSession
   * retuns a session for specific date
   * @param date
   * @returns {Promise<TResult|T>}
   */
  public getSession(date: number[]): Promise<Session> {
    return this.db_service.query(this.sessionsByDate, {key: date}).then(result => {
      return result.rows.value;
    }).catch(err => {
      throw err;
    })
  }

  //todo implement a delete session function
}
