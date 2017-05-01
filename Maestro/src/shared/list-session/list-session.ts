import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ItemSliding, Loading} from 'ionic-angular';
import {SessionService} from "../../providers/sessions/session.service";
import {SessionInfoPage} from "../../pages/session-info/session-info";
import {Chart} from 'chart.js';

@Component({
  selector: 'list-session',
  templateUrl: 'list-session.html'
})
/**
 *
 */
export class ListSession {
  sessions;
  @Input() showGraph: boolean;
  @Input() amount: number;
  @Output() isLoaded = new EventEmitter();
  loading: Loading;
  loaded:boolean;

  constructor(private loader: LoadingController,  private session_service: SessionService,
              private alertCtrl: AlertController, private nav: NavController) {
  }

  sessionInfo(session, slidingItem: ItemSliding) {
    this.nav.push(SessionInfoPage, {
      session: session
    });
    slidingItem.close();
  }

  showLoading(){
    this.loaded = false;
    this.loading = this.loader.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  ngOnInit(){
    this.showLoading();
    this.getSessions();
  }

  getSessions(){
    this.session_service.getPreviousSessions(10000).then((sess) => {
      if (sess == null){
        this.sessions = [];
      } else {
        this.sessions = sess;
        this.loading.dismiss();
        this.loaded = true;

      }
    }).catch(err => {
      console.log("Error while getting previous sessions");
      throw err;
    });


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

