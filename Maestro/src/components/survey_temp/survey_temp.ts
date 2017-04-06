import {Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { HomePage } from "../../pages/home/home"

@Component({
  selector: 'survey-temp',
  templateUrl: 'survey_temp.html'
})
export class SurveyTemp {
  survey: any;
  users_answers: any = [];
  @ViewChild(Slides) slides: Slides;
  radioValue: number;


  constructor(private nav: NavController) {

    this.survey = [
      {
        _id: 1,
        question: "What is your name?",
        answers: [
          {id: 1, answer: "Ted"},
          {id: 2, answer: "Zack"},
          {id: 3, answer: "Jordan"},
          {id: 4, answer: "Tim"},
        ],
        isfirstquestion: true,
      },
      {
        _id: 2,
        question: "How old are you?",
        answers: [
          {id: 1, answer: "18"},
          {id: 2, answer: "19"},
          {id: 3, answer: "20"},
          {id: 4, answer: "21"},
        ],
        isfirstquestion: false,
      },
      {
        _id: 3,
        question: "Where do you live?",
        answers: [
          {id: 1, answer: "Boone"},
          {id: 2, answer: "Chapel Hill"},
          {id: 3, answer: "Durham"},
          {id: 4, answer: "Charlotte"},
        ],
        isfirstquestion: false,
      }
    ];

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