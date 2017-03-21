import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-new-session',
  templateUrl: 'new-session.html'
})
export class NewSessionPage {
  session_title: string = '';
  session_notes: string = '';
  start_time: string;
  end_time: string;
  started: boolean;
  end_session: boolean;

  constructor(public nav: NavController) {
    this.started = false;
    this.end_session = false;
  }

  startSession(){
    this.started = true;
    console.log("Session Started");
    this.start_time = getDateTime();
  }

  endSession(){
    this.started = false;
    this.end_session = true;
    console.log("Session Ended");
    this.end_time = getDateTime();
  }

  saveSession(){
    console.log("Session Title: " + this.session_title);
    console.log("Session Notes: " + this.session_notes);
    console.log("Start Time: " + this.start_time);
    console.log("End Time: " + this.end_time);
  }


}

const getDateTime = () => {
  let dateTime;
  let date = new Date();
  dateTime = date.toLocaleDateString();
  dateTime += " " + date.toLocaleTimeString();
  return dateTime;
}



