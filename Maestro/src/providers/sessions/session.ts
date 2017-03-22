/**
 * Session
 * represents a user's work session
 */
export class Session {

  _id: string // timestamp & user id
  start_time: number[]
  end_time: number[]
  session_duration: number
  notes: string
  private user_id: string
  title: string

  constructor(_id: string, start_time: number[], end_time: number[], session_duration: number, notes: string, user_id: string, title: string) {
    this._id = _id
    this.start_time = start_time
    this.end_time = end_time
    this.session_duration = session_duration
    this.notes = notes
    this.user_id = user_id
    this.title = title
  }
}