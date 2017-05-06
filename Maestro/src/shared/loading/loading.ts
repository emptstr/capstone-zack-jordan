import {Component} from '@angular/core';
import {LoadingController, Loading} from 'ionic-angular';


/**
 * A reusable loading component
 */
@Component({
  selector: 'loading',
  templateUrl: 'survey_temp.html'
})

export class LoadingComponent {
  loading: Loading;
  loaded: boolean;

  constructor (private loader: LoadingController) {}

  /**
   * Start loading prompt
   */
  showLoading(){
    this.loaded = false;
    this.loading = this.loader.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}