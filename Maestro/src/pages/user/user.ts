import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { LoginPage } from '../login/login';
import { User } from '../../providers/database/user';
import {Chart} from 'chart.js';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: User;
  username: string = "";
  email: string;
  init_answers = [];
  visual_score: number;
  kin_score: number;
  aud_score: number;
  user_category: string;
  first_visit: boolean = false;

  @ViewChild('pieCanvas') pieCanvas;

  constructor(private nav: NavController, private auth: AuthService, public navParams: NavParams) {
    let info = this.auth.getUserInfo();
    this.username = info.firstname + " " + info.lastname;
    this.email = info._id;

  }

  ngOnInit(){
    console.log(this.auth.getUserInfo())
    this.init_answers = this.navParams.get("users_answers");
    this.first_visit = this.navParams.get("first_visit");

    console.log(this.init_answers);
    if (this.first_visit) {
      this.calcInitSurvey();
    }
    //TODO: ELSE pull user category and score information from database
    this.renderChart();
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }

  calcInitSurvey() {
    let visual = this.getVisualAnswers();
    this.visual_score = calculateScore(visual);
    let kinesthetic = this.getKinAnswers();
    this.kin_score = calculateScore(kinesthetic);
    let auditory = this.getAudAnswers();
    this.aud_score = calculateScore(auditory);
    //TODO: Store visual_score, kin_score, aud_score in database
    this.categorizeUser();
    //TODO: Store user_category in database
  }

  categorizeUser(){
    if (this.visual_score > this.kin_score && this.visual_score > this.aud_score) {
      this.user_category = "Visual";
    } else if (this.kin_score > this.visual_score && this.kin_score > this.aud_score) {
      this.user_category = "Kinesthetic";
    } else if (this.aud_score > this.visual_score && this.aud_score > this.kin_score) {
      this.user_category = "Auditory";
    }
  }

  getVisualAnswers(){
    return this.init_answers.filter(a => {
      if (a.section == "Visual") {
        return a;
      } else {
        return false;
      }
    });

  }
  getKinAnswers(){
    return this.init_answers.filter(a => {
      if (a.section == "Auditory") {
        return a;
      } else {
        return false;
      }
    });

  }
  getAudAnswers(){
    return this.init_answers.filter(a => {
      if (a.section == "Kinesthetic") {
        return a;
      } else {
        return false;
      }
    });

  }

  renderChart() {
    let myChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ["Auditory Score", "Kinesthetic Score", "Visual Score"],
        datasets: [{
          backgroundColor: [
            "#2ecc71",
            "#3498db",
            "#e74c3c"
          ],
          data: [this.aud_score, this.kin_score, this.visual_score]
        }]
      }
    });
  }

}


const calculateScore = (answers) => {
  let sum: number = 0;
  for (let i = 0; i < answers.length; i++) {
    sum += Number(answers[i].answer)
  }
  return sum;
}