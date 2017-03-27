import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ItemSliding} from 'ionic-angular';
import {SessionService} from "../../providers/sessions/session.service";
import {SessionInfoPage} from '../session-info/session-info';


@Component({
  selector: 'page-session-hist',
  templateUrl: 'session-hist.html'
})
export class SessionHistPage {
  sessions = [];
  constructor(private loader: LoadingController,  private session_service: SessionService, private alertCtrl: AlertController,
              private nav: NavController) {
  }

  sessionInfo(session, slidingItem: ItemSliding) {
    this.nav.push(SessionInfoPage, {
      session: session
    });
    slidingItem.close();
  }

  ngOnInit(){
    let loading = this.loader.create({
      content: "Please Wait...",
    });

    loading.present().then(() => {
      this.getSessions();
      loading.dismiss();
    });
  }

  getSessions(){
    this.session_service.getPreviousSessions(10000).then((sess) => {
      if (sess == null){
        this.sessions = [];
      } else {
        this.sessions = sess;
      }
    }).catch(err => {
      console.log("Error while getting previous sessions");
      throw err;
    })
  }

  deletePrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Delete Session',
      message: "Are you sure you would like to delete this work session?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            // Call session service and delete session
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
