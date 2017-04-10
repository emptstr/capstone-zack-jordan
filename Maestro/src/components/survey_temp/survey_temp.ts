import {Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { HomePage } from "../../pages/home/home"
import {SurveyService} from "../../providers/survey/survey.service";
import {Survey} from "../../providers/survey/survey";

@Component({
  selector: 'survey-temp',
  templateUrl: 'survey_temp.html'
})
export class SurveyTemp {
  survey: Survey;
  users_answers: any = [];
  @ViewChild(Slides) slides: Slides;
  radioValue: number;


  constructor(private nav: NavController, private survey_service:SurveyService) {
    this.survey_service.getSurvey("init-survey").then(result=>{
      this.survey = result
      console.log(this.survey)
    }).catch(err=>{
      throw err;
    })
  }


  ngOnInit(){
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