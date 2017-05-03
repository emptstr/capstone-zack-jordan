import {Injectable} from "@angular/core";
import {SessionSurveyMetric} from "./session.survey.metric";
import {Session} from "./session";
/**
 * Created by jordan on 5/2/17.
 */

@Injectable()
export class SessionSurveyResultsAnalyzer{

  public analyze(session:Session): SessionSurveyMetric{

    let survey_answers = session.survey_answers
    let sessionSurveyMetric: SessionSurveyMetric

    sessionSurveyMetric.focus_score = this.getScore(this.filterAnswersBySection(survey_answers, 'Focus'))
    sessionSurveyMetric.effort_score = this.getScore(this.filterAnswersBySection(survey_answers, 'Effort'))
    sessionSurveyMetric.comprehension_score = this.getScore(this.filterAnswersBySection(survey_answers, 'Comprehension'))
    sessionSurveyMetric.effeciency_score = this.getScore(this.filterAnswersBySection(survey_answers, 'Efficiency'))

    return sessionSurveyMetric
  }

  private getScore(arr: any[]): number{
    let answerTotal = this.sumAnswers(arr);
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

  private sumAnswers(arr: any[]){
    let sum: number = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += Number(arr[i].answer)
    }
    return sum;
  }

}

