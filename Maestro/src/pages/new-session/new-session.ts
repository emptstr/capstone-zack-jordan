import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
import { AuthService } from '../../providers/auth/auth-service';
import { Session } from '../../providers/sessions/session';
import { SessionService } from '../../providers/sessions/session.service';
import {DateArrBuilder} from "../../providers/sessions/date.arr.builder";
import { SessionSurveyPage } from "../session-survey/session-survey"

/**
 * Component for starting a new work session.
 */
@Component({
  selector: 'page-new-session',
  templateUrl: 'new-session.html'
})

export class NewSessionPage {

  // Values to show and hide html components
  started: boolean; // True if session has started
  prev_session: boolean; // True if user is looking at previous session survey
  end_session: boolean; // True if session timer has ended

  subscription: Subscription; // Used for session timer

  sessionObj: any = []; // Store session values before Session object is created
  session: Session; // Session object being created
  _id: string;  // Field for session id

  constructor(private nav: NavController, private auth: AuthService, private sess: SessionService) {

    this.sessionObj = {
      title: '',
      notes: '',
      time: '',
      start_time: '',
      end_time: '',
      user_id: this.auth.getUserInfo()._id,
    };

    this.started = false;
    this.end_session = false;
  }

  /**
   * Initialize the directive/component after Angular first displays the data-bound properties
   * and sets the directive/component's input properties.
   */
  ngOnInit(){
    //TODO: Get previous session-survey
    this.prev_session = true
  }

  /**
   * Click handler for Next button on previous session survey page
   */
  toStart(){
    this.prev_session = false; // Display start of survey components
  }

  /**
   * Click handler for Start session button
   */
  startSession(){
    let timer = Observable.timer(0, 1000);  // Create Timer
    this.subscription = timer.subscribe(t => this.sessionObj.time = convertSec(t)); // Display timer HH:MM:SS
    this.started = true;
    console.log("Session Started"); // Testing
    this.sessionObj.start_time = getDateTime(); // Get start time stamp for session object

  }

  /**
   * Click handler for End button for timer
   */
  endSession(){
    this.subscription.unsubscribe();  // Stop timer
    this.started = false;
    this.end_session = true;
    console.log("Session Ended"); // Testing
    this.sessionObj.end_time = getDateTime(); // Get end time stamp for session object
  }

  /**
   * Click handler for Next button to go to session survey.
   */
  sessionSurvey(){
    this.subscription.unsubscribe();
    this._id = this.sessionObj.start_time.toString() + " - " + this.sessionObj.end_time.toString(); // Create session id

    // Create Session object to be passed to session survey page.
    this.session = new Session(this._id, this.sessionObj.start_time, this.sessionObj.end_time, this.sessionObj.time,
      this.sessionObj.notes, this.sessionObj.user_id, this.sessionObj.title);

    console.log(JSON.stringify(this.session)); // Testing

    // Goto session survey page
    this.nav.setRoot(SessionSurveyPage, {
      session: this.session // Pass session object
    });
  }


}

/**
 * Converts seconds into formatted HH:MM:SS
 * @param ticks how many seconds have occured
 * @returns {string} HH:MM:SS
 */
const convertSec = ticks => { return new Date(ticks * 1000).toISOString().substr(11, 8); };

/**
 * Build a timestamp into an array
 * @returns {Array} year, month, date, hour, min, sec
 */
const getDateTime = () => {
  let date = new Date();
  return DateArrBuilder.build(date.getFullYear(), date.getMonth(), date.getDate(),
                              date.getHours(), date.getMinutes(), date.getSeconds());

};




