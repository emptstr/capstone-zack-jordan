import {Injectable} from "@angular/core";
import {SessionSurveyMetric} from "./session.survey.metric";
/**
 * Created by jordan on 5/2/17.
 */

@Injectable()
export class SessionSurveyResultsAnalyzer{

  public analyze(survey_answers: any[]): SessionSurveyMetric{

    let sessionSurveyMetric: SessionSurveyMetric = {
      focus_score: 0,
      effort_score: 0,
      comprehension_score: 0,
      efficiency_score: 0
    }

    sessionSurveyMetric.focus_score = Math.trunc(this.getScore(this.filterAnswersBySection(survey_answers, 'Focus')))
    sessionSurveyMetric.effort_score = Math.trunc(this.getScore(this.filterAnswersBySection(survey_answers, 'Effort')))
    sessionSurveyMetric.comprehension_score = Math.trunc(this.getScore(this.filterAnswersBySection(survey_answers, 'Comprehension')))
    sessionSurveyMetric.efficiency_score = Math.trunc(this.getScore(this.filterAnswersBySection(survey_answers, 'Efficiency')))

    return sessionSurveyMetric
  }

  private getScore(arr: any[]): number{
    console.log("Inside getScore" + arr)
    let answerTotal: number = this.sumAnswers(arr);
    console.log("getScore " + answerTotal)
    return this.getPercentage(answerTotal, arr.length * 3);
  }

  private getPercentage(numberone: number, numbertwo: number): number{
    return (100 * numberone) / numbertwo
  }


  private filterAnswersBySection(arr: any[], section: string ){
    return arr.filter(a => {
      if (a.section == section) {
        return a;
      } else {
        return false;
      }
    });
  }

  private sumAnswers(arr: any[]): number {
    let sum: number = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += Number(arr[i].answer)
    }
    return sum;
  }

}

