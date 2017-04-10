import {Component, ViewChild, Input} from '@angular/core';
import { Slides } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { HomePage } from "../../pages/home/home"
import {SurveyService} from "../../providers/survey/survey.service";

@Component({
  selector: 'survey-temp',
  templateUrl: 'survey_temp.html'
})
export class SurveyTemp {
  survey = [];
  users_answers: any = [];
  @ViewChild(Slides) slides: Slides;
  radioValue: number;
  @Input() survey_id: string;


  constructor(private nav: NavController, private survey_service:SurveyService) {
  }

  getSurvey(){
    this.survey_service.getSurvey(this.survey_id).then(result=>{
      this.survey = result.questions;
    }).catch(err=>{
      throw err;
    })
  }

  ngOnInit(){
    this.getSurvey();
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);
  }

  nextSlide(question_id, question_title) {
    this.users_answers.push({question_title: question_title ,question_id: question_id, answer: this.radioValue});
    console.log(this.users_answers);
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
  }

  prevSlide() {
    this.users_answers.pop();
    console.log(this.users_answers);
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev();
    this.slides.lockSwipeToPrev(true);
  }

  saveSurvey(question_id, question_title){
    this.users_answers.push({question_title: question_title ,question_id: question_id, answer: this.radioValue});
    console.log(this.users_answers);
    this.nav.setRoot(HomePage);
  }

}