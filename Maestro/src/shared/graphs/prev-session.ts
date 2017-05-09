import {Component, ViewChild, Input} from '@angular/core';
import {Chart} from 'chart.js';

/**
 * Component to render the users time worked line graph.
 */
@Component({
  selector: 'prev-session',
  template: '<ion-card-content><canvas height="300" #barCanvas></canvas></ion-card-content>'
})

export class PrevSession {
  @ViewChild('barCanvas') barCanvas;
  @Input() session; //The previous session to be displayed


  ngOnInit() {
    this.renderChart();
  }

  /**
   * Renders the Bar Graph of Survey Metrics
   */
  renderChart() {
    return new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["Focus", "Effort", "Comprehension", "Efficiency"],
        datasets: [{
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
            ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
            ],
          label: 'Session Survey Metrics',
          data: [this.session.sessionSurveyMetric.focus_score, this.session.sessionSurveyMetric.effort_score,
                 this.session.sessionSurveyMetric.comprehension_score, this.session.sessionSurveyMetric.efficiency_score]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}

