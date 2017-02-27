import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
//import { AuthService } from '../../providers/auth-service';
import { NewSessionPage } from '../new-session/new-session';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  session_name = '';
  email = '';
  sessions = [];
  constructor(private nav: NavController, private alertCtrl: AlertController) {
    //Hard coded data for now
    this.sessions = [
      {session_title: 'Work Session 1',
       session_time: '01:20:20',
       session_description: 'Today I worked on...' },
      {session_title: 'Work Session 2',
        session_time: '01:20:20',
        session_description: 'Today I worked on...' }];
  }

  /**
   * Navigates to New Session Page
   */
  newSession(){
    this.nav.push(NewSessionPage);
  }

  deletePrompt(){
    let prompt = this.alertCtrl.create({
      title: 'Delete Session',
      message: "Are you sure you would like to delete this work session?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            console.log('Delete Session');
          }
        },
        {
          text: 'No',
          handler: data => {
            console.log('Cancel Delete Session');
          }
        }
      ]
    });
    prompt.present();
  }

}