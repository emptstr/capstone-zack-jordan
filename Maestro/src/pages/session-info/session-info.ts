import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import { SessionService } from '../../providers/sessions/session.service';


/**
 * Component for displaying more info about a session.
 *
 * Navigate to this page after more button is pressed on list-session reusable component
 */
@Component({
  selector: 'page-session-info',
  templateUrl: 'session-info.html'
})

export class SessionInfoPage {

  public session; // Session being accessed
  public edit: boolean = false; // True if edit button is pressed

  constructor(public navParams: NavParams, public sess: SessionService) {
    this.session = navParams.get("session"); // Get session passed from list-session component
    console.log(this.session); // Testing
  }

  /**
   * Click handler for edit session button.
   *
   * Displays session information in editable form fields
   */
  editSession(){
    this.edit = true;
  }

  /**
   * Click handler for save button after session is edited
   */
  saveSession(){
    this.sess.addSession(this.session); // Update session information
    console.log(this.session);  // Testing
    this.edit = false;  // Editing is done
  }

}
