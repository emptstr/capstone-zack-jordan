import {Component, ViewChild, Input} from '@angular/core';
import {Chart} from 'chart.js';

/**
 * Component to render the user score pie chart
 */
@Component({
  selector: 'user-score',
  template: '<ion-card-content><canvas #pieCanvas></canvas></ion-card-content>'
})

export class UserScore {
  @ViewChild('pieCanvas') pieCanvas;
  @Input() aud_score;
  @Input() kin_score;
  @Input() visual_score;

  /**
   * Initialize the directive/component after Angular first displays the data-bound properties
   * and sets the directive/component's input properties.
   */
  ngOnInit(){
    // Display user learning data
    this.renderChart();
  }

  /**
   * Renders Pie chart of users scores
   */
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
          data: [this.aud_score, this.kin_score, this.visual_score],
        }],
      }
    });
  }
}
