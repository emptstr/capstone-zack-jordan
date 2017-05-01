import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { LoginPage } from '../login/login';
import { User } from '../../providers/database/user';
import { UserService } from '../../providers/database/user.service'
import {KnowledgeBaseService} from "../../providers/knowledge-base/knowlege.base.service"
import {LearningStrategiesService} from "../../providers/learning-strategies/learning.strategies.service"
import {DatabaseService} from "../../providers/database/db.service"

/**
 * Component for user page
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {
  user: User;
  username: string = "";
  email: string;
  init_answers = [];  // Answers passed from survey-temp

  // Scores from initial answer
  visual_score: number;
  kin_score: number;
  aud_score: number;

  user_category: string; // What category the user is placed in

  knowledge: any;

  constructor(private nav: NavController, private auth: AuthService, public navParams: NavParams,
              private userService: UserService, private db : DatabaseService, private kb: KnowledgeBaseService,
              private ls: LearningStrategiesService) {


  }

  /**
   * Initialize the directive/component after Angular first displays the data-bound properties
   * and sets the directive/component's input properties.
   */
  ngOnInit(){
    //TODO: Grab from database
    this.knowledge = this.kb.getKnowledgeBase()

    console.log(this.knowledge);
    //console.log(this.ls.getStrategies());

    this.init_answers = this.navParams.get("answers");  // Get answers from initial-survey

    this.user = this.auth.getUserInfo(); // Get current user

    this.username = this.user.firstname + " " + this.user.lastname; // Populate user name
    this.email = this.user._id; // Populate email

    console.log(this.init_answers); // Tesing

    //If user came from initial survey
    if (this.user.user_score == null) {
      this.calcInitSurvey();  // Calculate user scores
    } else {
      // If user is not coming from initial survey grab scores from database
      this.aud_score = this.user.user_score.aud_score;
      this.kin_score = this.user.user_score.kin_score;
      this.visual_score = this.user.user_score.visual_score;
      // Calculate user
      this.categorizeUser()
    }
  }

  /**
   * Click handler for the logout button
   */
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage); //Go to login page
    });
  }

  /**
   * Calculate the answers from the initial survey
   */
  calcInitSurvey() {

    let visual = this.getVisualAnswers(); // Get scores from visual section
    this.visual_score = calculateScore(visual); // Calculate score

    let kinesthetic = this.getKinAnswers(); // Get scores from kinesthetic section
    this.kin_score = calculateScore(kinesthetic); // Calculate score

    let auditory = this.getAudAnswers();  // Get scores from auditory section
    this.aud_score = calculateScore(auditory);  // Calculate score

    // Put users scores into the User object
    this.user.user_score = {
      visual_score: this.visual_score,
      kin_score: this.kin_score,
      aud_score: this.aud_score
    };

    //Add initial survey score to user
    this.userService.addUser(this.user, this.user._id);

    this.categorizeUser();  // Calculate user category
  }

  /**
   * Takes the users scores and puts them in a category
   */
  categorizeUser(){
    if (this.visual_score > this.kin_score && this.visual_score > this.aud_score) {
      this.user_category = "Visual";
    } else if (this.kin_score > this.visual_score && this.kin_score > this.aud_score) {
      this.user_category = "Kinesthetic";
    } else if (this.aud_score > this.visual_score && this.aud_score > this.kin_score) {
      this.user_category = "Auditory";
    } else if (this.aud_score == this.visual_score && this.aud_score > this.kin_score && this.visual_score > this.kin_score) {
      this.user_category = "Auditory/Visual";
    } else if (this.kin_score == this.visual_score && this.kin_score > this.aud_score && this.visual_score > this.aud_score) {
      this.user_category = "Kinesthetic/Visual";
    } else if (this.kin_score == this.aud_score && this.kin_score > this.visual_score && this.aud_score > this.visual_score) {
      this.user_category = "Kinesthetic/Auditory";
    } else {
      this.user_category = "Kinesthetic/Auditory/Visual";
    }
  }

  /**
   * Gets the visual scores from the users answers.
   * @returns {any[]}
   */
  getVisualAnswers(){
    return this.init_answers.filter(a => {
      if (a.section == "Visual") {
        return a;
      } else {
        return false;
      }
    });

  }

  /**
   * Gets Kinesthetic scores from users answers.
   * @returns {any[]}
   */
  getKinAnswers(){
    return this.init_answers.filter(a => {
      if (a.section == "Auditory") {
        return a;
      } else {
        return false;
      }
    });

  }

  /**
   * Get auditory scores from user answers
   * @returns {any[]}
   */
  getAudAnswers(){
    return this.init_answers.filter(a => {
      if (a.section == "Kinesthetic") {
        return a;
      } else {
        return false;
      }
    });

  }

}

/**
 * Sum up scores from a section of the initial survey
 * @param answers section answers
 * @returns {number} user score
 */
const calculateScore = (answers) => {
  let sum: number = 0;
  for (let i = 0; i < answers.length; i++) {
    sum += Number(answers[i].answer)
  }
  return sum;
}
