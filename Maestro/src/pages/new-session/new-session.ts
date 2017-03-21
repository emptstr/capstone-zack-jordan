import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
import { AuthService } from '../../providers/auth/auth-service';
import { Session } from '../../providers/sessions/session';
import { SessionService } from '../../providers/sessions/session.service';
import {DateArrBuilder} from "../../providers/sessions/date.arr.builder";


@Component({
  selector: 'page-new-session',
  templateUrl: 'new-session.html'
})
export class NewSessionPage {
  session: any = {};
  started: boolean;
  end_session: boolean;
  subscription: Subscription;

  constructor(public nav: NavController, private auth: AuthService) {
    this.session = {
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

  startSession(){
    let timer = Observable.timer(0, 1000);
    this.subscription = timer.subscribe(t => this.session.time = convertSec(t));
    this.started = true;
    console.log("Session Started");
    this.session.start_time = getDateTime();

  }

  endSession(){
    this.subscription.unsubscribe();
    this.started = false;
    this.end_session = true;
    console.log("Session Ended");
    this.session.end_time = getDateTime();
  }

  saveSession(){
    this.subscription.unsubscribe();

    // This is where Session will be stored in Database
    console.log(JSON.stringify(this.session));

    this.nav.pop();
  }

}


const convertSec = ticks => { return new Date(ticks * 1000).toISOString().substr(11, 8); };


const getDateTime = () => {
  let date = new Date();
  return DateArrBuilder.build(date.getFullYear(), date.getMonth(), date.getDate(),
                              date.getHours(), date.getMinutes(), date.getSeconds());

};




