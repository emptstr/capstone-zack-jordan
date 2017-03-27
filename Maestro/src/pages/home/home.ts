import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, ItemSliding} from 'ionic-angular';
import {NewSessionPage} from '../new-session/new-session';
import {SessionInfoPage} from '../session-info/session-info';
import {SessionService} from "../../providers/sessions/session.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sessions = [];

  constructor(private nav: NavController, private alertCtrl: AlertController, private session_service: SessionService,
              private loader: LoadingController) {
  }

}
