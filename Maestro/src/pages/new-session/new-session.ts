import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
import { AuthService } from '../../providers/auth/auth-service';
import { Session } from '../../providers/sessions/session';
import { SessionService } from '../../providers/sessions/session.service';
import {DateArrBuilder} from "../../providers/sessions/date.arr.builder";
import { SessionSurveyPage } from "../session-survey/session-survey"

@Component({
  selector: 'page-new-session',
  templateUrl: 'new-session.html'
})
export class NewSessionPage {
  sessionObj: any = [];
  started: boolean;
  prev_session: boolean;
  end_session: boolean;
  subscription: Subscription;
  session: Session;
  _id: string;

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

  ngOnInit(){
    //TODO: Get previous session-survey
    this.prev_session = true
  }

  toStart(){
    this.prev_session = false
  }

  startSession(){
    let timer = Observable.timer(0, 1000);
    this.subscription = timer.subscribe(t => this.sessionObj.time = convertSec(t));
    this.started = true;
    console.log("Session Started");
    this.sessionObj.start_time = getDateTime();

  }

  endSession(){
    this.subscription.unsubscribe();
    this.started = false;
    this.end_session = true;
    console.log("Session Ended");
    this.sessionObj.end_time = getDateTime();
  }

  sessionSurvey(){
    this.subscription.unsubscribe();
    this._id = this.sessionObj.start_time.toString() + " - " + this.sessionObj.end_time.toString();
    // This is where Session will be stored in Database
    this.session = new Session(this._id, this.sessionObj.start_time, this.sessionObj.end_time, this.sessionObj.time,
      this.sessionObj.notes, this.sessionObj.user_id, this.sessionObj.title);
    console.log(JSON.stringify(this.session));

    this.nav.setRoot(SessionSurveyPage, {
      session: this.session
    });
  }


}


const convertSec = ticks => { return new Date(ticks * 1000).toISOString().substr(11, 8); };


const getDateTime = () => {
  let date = new Date();
  return DateArrBuilder.build(date.getFullYear(), date.getMonth(), date.getDate(),
                              date.getHours(), date.getMinutes(), date.getSeconds());

};




