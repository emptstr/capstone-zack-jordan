import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController} from 'ionic-angular';
import {SessionService} from "../../providers/sessions/session.service";


@Component({
  selector: 'page-session-hist',
  templateUrl: 'session-hist.html'
})
export class SessionHistPage {
  sessions = [];
  constructor(private loader: LoadingController,  private session_service: SessionService, private alertCtrl: AlertController,
              private nav: NavController) {
  }

}
