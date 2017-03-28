import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ItemSliding, Loading} from 'ionic-angular';
import {SessionService} from "../providers/sessions/session.service";
import {SessionInfoPage} from "../pages/session-info/session-info";
import {Chart} from 'chart.js';

@Component({
  selector: 'list-session',
  templateUrl: 'list-session.html'
})
export class ListSession {
  sessions = [];
  @Input() showGraph: boolean;
  @Input() amount: number;
  @Output() isLoaded = new EventEmitter();
  loading: Loading;

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  loaded:boolean;

  constructor(private loader: LoadingController,  private session_service: SessionService, private alertCtrl: AlertController,
              private nav: NavController) {
  }

  sessionInfo(session, slidingItem: ItemSliding) {
    this.nav.push(SessionInfoPage, {
      session: session
    });
    slidingItem.close();
  }

  showLoading(){
    this.loaded = false;
    this.loading = this.loader.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  ngOnInit(){
    this.showLoading();
    this.getSessions();

  }

  getSessions(){
    this.session_service.getPreviousSessions(10000).then((sess) => {
      if (sess == null){
        this.sessions = [];
      } else {
        this.sessions = sess;
        if (this.showGraph) {
          this.renderChart();
        }
        this.loading.dismiss();
        this.loaded = true;

      }
    }).catch(err => {
      console.log("Error while getting previous sessions");
      throw err;
    });


  }

  deletePrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Delete Session',
      message: "Are you sure you would like to delete this work session?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            // Call session service and delete session
            console.log('Delete Session');
          }
        },
        {
          text: 'No',
          handler: data => {
            console.log('Cancel Delete Session');
          }
        }
      ]
    });
    prompt.present();
  }

  renderChart() {
    let mapData = this.getChartData();
    let chartScale = this.getChartScale();
    console.log(chartScale);
    console.log(mapData);
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

  getChartScale(){
    let date = new Date();
    return this.sessions.map(s => {
      if(s.start_time[1] == (date.getMonth() + 1)){
        return s.start_time[1] + "/" + s.start_time[2];
      }
    })
  }

  getChartData(){
    let date = new Date();
    return this.sessions.map(s => {
      if(s.start_time[1] == (date.getMonth() + 1)){
        let a = s.session_duration.split(':');
        return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
      }
    })
  }

}

