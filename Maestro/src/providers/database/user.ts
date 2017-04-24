import {UserScore} from "../../pages/user/user.score";
export class User {

  name: Name;
  _id: string;
  credentials: Credentials;
  firstname: string;
  lastname: string;
  user_score: UserScore

  constructor(firstname: string, lastname: string, email: string, password: string, salt: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this._id = email;
    this.credentials = {password: password, salt: salt}
    this.user_score = null;
  }
}

export interface Name {
  firstname: string,
  lastname: string
}

export interface Credentials {
  password: string,
  salt: string
}