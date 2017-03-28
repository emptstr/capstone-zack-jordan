import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { SessionService } from '../../providers/sessions/session.service';



@Component({
  selector: 'page-session-info',
  templateUrl: 'session-info.html'
})
export class SessionInfoPage {

  public session;
  public edit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sess: SessionService) {
    this.session = navParams.get("session");
    console.log(this.session);
  }

  editSession(){
    this.edit = true;
  }

  saveSession(){
    this.sess.addSession(this.session);
    console.log(this.session);
    this.edit = false;
  }

}
