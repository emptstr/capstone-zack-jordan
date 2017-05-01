import {Component, ViewChild, Input, SimpleChanges} from '@angular/core';
import {Chart} from 'chart.js';

/**
 * Component to render the users time worked line graph.
 */
@Component({
  selector: 'time-worked',
  template: '<ion-card-content><canvas #lineCanvas></canvas></ion-card-content>'
})

export class TimeWorked {
  lineChart: any;
  @ViewChild('lineCanvas') lineCanvas;
  @Input() sessions = []; // session will be passed from list-session.ts

  ngOnInit() {
    this.renderChart()
  }

  /**
   * Displays Line Chart for Time Worked in Current Month
   */
  renderChart() {
    let mapData = this.getChartData();
    let chartScale = this.getChartScale();
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: chartScale.reverse(),
        datasets: [{
          label: "Time worked",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: mapData.reverse(),
          spanGaps: false
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            title: function (tooltipItems) {
              return "Day: " + tooltipItems[0].xLabel;
            },
            label: function (tooltipItems) {
              return "Time Worked: " + new Date(tooltipItems.yLabel * 1000).toISOString().substr(11, 8);
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function (label) {
                  return new Date(label * 1000).toISOString().substr(11, 8);
                }
              }
            }
          ]
        },

      }

    });
  }

  graphOptions() {

  }

  /**
   * Creates an array of values to be used as the x axis of the line graph
   * @returns {string[]} the scale for the x axis Month/Day
   */
  getChartScale() {
    // Get value from current month
    let filtered = getCurrentMonthSess(this.sessions);
    return filtered.map(s => {
      return s.start_time[1] + "/" + s.start_time[2];
    })
  }

  /**
   * Creates an array of values to be used as the data for the line graph.
   * Uses values only from current month.
   *
   * @returns {number[]} line graph data
   */
  getChartData() {
    // Gets sessions from current month
    let filtered = getCurrentMonthSess(this.sessions);
    // Formats values
    return filtered.map(sess => {
      let a = sess.session_duration.split(':');
      //Format HH:MM:SS
      return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    })
  }
}

/**
 * Returns sessions from current month
 * @param sessions array of objects
 */
const getCurrentMonthSess = (sessions) => {
  let date = new Date();
  return sessions.filter(sess => {
    if (sess.start_time[1] == (date.getMonth() + 1)) {
      return sess;
    } else {
      return false;
    }
  });
}
