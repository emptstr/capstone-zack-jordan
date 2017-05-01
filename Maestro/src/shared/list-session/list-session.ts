import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NavController, LoadingController, AlertController, ItemSliding, Loading} from 'ionic-angular';
import {SessionService} from "../../providers/sessions/session.service";
import {SessionInfoPage} from "../../pages/session-info/session-info";
import {HomePage} from "../../pages/home/home"

/**
 * A reusable component to display the users sessions.
 */
@Component({
  selector: 'list-session',
  templateUrl: 'list-session.html'
})

export class ListSession {
  sessions; // Hold users sessions
  @Input() showGraph: boolean; // Whether or not graph should be rendered
  @Input() amount: number;  // How many sessions to show

  @Output() isLoaded = new EventEmitter();
  loading: Loading;
  loaded: boolean;

  constructor(private loader: LoadingController,  private session_service: SessionService,
              private alertCtrl: AlertController, private nav: NavController) {}

  /**
   * Initialize the directive/component after Angular first displays the data-bound properties
   * and sets the directive/component's input properties.
   */
  ngOnInit() {
    this.showLoading();
    this.getSessions();
  }

  /**
   * Creates and displays loading prompt waiting on sessions to be retrieved.
   */
  showLoading(){
    this.loaded = false;
    this.loading = this.loader.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  /**
   * Get user sessions from database.
   */
  getSessions(){
    this.session_service.getPreviousSessions(10000).then((sess) => {
      if (sess == null){
        this.sessions = []; // User doesn't have any sessions
      } else {
        this.sessions = sess;
        this.loading.dismiss(); // Dismiss Loading
        this.loaded = true;

      }
    }).catch(err => {
      console.log("Error while getting previous sessions");
      throw err;
    });

  }

  /**
   * Click handler to navigate to SessionInfoPage
   * @param session the session which was selected
   * @param slidingItem
   */
  sessionInfo(session, slidingItem: ItemSliding) {
    this.nav.push(SessionInfoPage, {
      session: session // Pass session info to be displayed
    });
    slidingItem.close(); // Close slider so it will be closed upon user return

  }

  /**
   * Click handler when delete button is pressed.
   */
  deletePrompt(w) {
    let prompt = this.alertCtrl.create({
      title: 'Delete Session',
      message: "Are you sure you would like to delete this work session?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            console.log('Delete Session');
            this.session_service.deleteSession(w); // Call session service and delete session
            this.nav.setRoot(HomePage);

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

