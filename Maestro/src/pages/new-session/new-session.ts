import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'page-new-session',
  templateUrl: 'new-session.html'
})
export class NewSessionPage {
  session: any = {};
  started: boolean;
  end_session: boolean;
  subscription: Subscription;

  constructor(public nav: NavController) {
    this.session = {
      title: '',
      notes: '',
      time: '',
      start_time: '',
      end_time: '',
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
    console.log("Session Title: " + this.session.title);
    console.log("Session Notes: " + this.session.notes);
    console.log("Start Time: " + this.session.start_time);
    console.log("End Time: " + this.session.end_time);
    console.log("Time of session: " + this.session.time);
  }

}


const convertSec = ticks => { return new Date(ticks * 1000).toISOString().substr(11, 8); };


const getDateTime = () => {
  let dateTime;
  let date = new Date();
  dateTime = date.toLocaleDateString();
  dateTime += " " + date.toLocaleTimeString();
  return dateTime;
};




