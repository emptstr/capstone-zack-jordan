import {Session} from "./session";
/**
 * Created by jordan on 5/3/17.
 */
export interface SessionSurveyMetric {
  session: Session
  focus_score: number
  effort_score: number
  comprehension_score: number
  effeciency_score: number
}