import {Component, ViewChild, Input} from '@angular/core';
import {Slides, LoadingController, Loading} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { UserPage } from "../../pages/user/user"
import {SurveyService} from "../../providers/survey/survey.service";


/**
 * A reusable survey component
 */
@Component({
  selector: 'survey-temp',
  templateUrl: 'survey_temp.html'
})

export class SurveyTemp {
  survey = [];
  users_answers: any = [];
  radioValue: number;

  @ViewChild(Slides) slides: Slides;

  @Input() survey_id: string;
  @Input() navigate: Component; // Where to go after the survey saves
  @Input() hideSection: boolean;
  @Input() from_session_survey: boolean; // Variable to keep track if coming from session survey
  @Input() session = [];

  loading: Loading;
  loaded: boolean;


  constructor(private nav: NavController, private survey_service:SurveyService, private loader: LoadingController) {
    this.showLoading();
  }

  ngOnInit(){
    this.getSurvey();

    // Workaround to Ionic 2 slide bug
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);
  }

  /**
   * Get survey from datbase
   */
  getSurvey(){
    this.survey_service.getSurvey(this.survey_id).then(result=>{
      // Survey is found
      this.survey = result.questions;
      // Dismiss loading
      this.loading.dismiss();
      this.loaded = true;
    }).catch(err=>{
      throw err;
    })
  }

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


  /**
   * Click handler for next button on survey.
   * @param question_id
   * @param question_title
   * @param section
   */
  nextSlide(question_id, question_title, section) {
    // Save user answers on stack
    this.users_answers.push({question_title: question_title ,question_id: question_id,
                             answer: this.radioValue, section: section});

    console.log(this.users_answers); //Testing

    this.next();  // Go to next survey question

  }

  /**
   * Click handler for prev button on survey
   */
  prevSlide() {
    // If user goes back pop off last answer from stack.
    this.users_answers.pop();

    console.log(this.users_answers); //Testing

    this.prev();  // Go to previous survey question
  }

  /**
   * Workaround to Ionic 2 slide bug.
   * Go to previous slide using button
   */
  prev() {
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev();
    this.slides.lockSwipeToPrev(true);
  }

  /**
   * Workaround to Ionic 2 slide bug.
   * Go to next slide using button
   */
  next() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);

  }

  /**
   * Click handler for save button on survey.
   * Passes answers array, sessions, and from_session_survey to specified location navigate
   * @param question_id
   * @param question_title
   * @param section
   */
  saveSurvey(question_id, question_title, section){
    //Push last answer onto answer stack
    this.users_answers.push({question_title: question_title ,question_id: question_id,
                             answer: this.radioValue, section: section});
    console.log(this.users_answers); // Tesing

    // After Save button is pressed go to specified location
    this.nav.setRoot(this.navigate, {
      answers: this.users_answers,  // User answers array
      from_session_survey: this.from_session_survey,  // If coming from session survey
      session: this.session // Session being passed for session-sruvey
    });
  }

}