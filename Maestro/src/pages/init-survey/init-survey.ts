import {Component, ViewChild } from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';
import { FormBuilder, Validators, FormArray } from "@angular/forms";



@Component({
  selector: 'page-init-survey',
  templateUrl: 'init-survey.html'
})
export class InitSurveyPage {
  survey: any;
  users_answers: any;
  @ViewChild(Slides) slides: Slides;


  constructor(public fb: FormBuilder) {

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

  ionViewDidEnter() {

  }

  nextSlide(){
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
  }

  prevSlide(){
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev();
    this.slides.lockSwipeToPrev(true);
  }


}
