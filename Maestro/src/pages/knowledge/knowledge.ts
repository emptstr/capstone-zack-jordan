import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Component for knowledge base page
 */
@Component({
  selector: 'page-knowledge',
  templateUrl: 'knowledge.html'
})

export class KnowledgePage {

  knowledge;
  learning_style;

  show_learning: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.knowledge = this.navParams.get("knowledge");
    console.log(this.knowledge);
    this.learning_style = this.navParams.get("learning");
    console.log(this.learning_style);
  }

  /**
   * Click handler for button to show learning styles
   */
  showLearning() {
    this.show_learning = !this.show_learning;
  }
}
