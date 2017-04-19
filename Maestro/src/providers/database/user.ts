export class User {

  name: Name;
  _id: string;
  credentials: Credentials;
  firstname: string;
  lastname: string;

  constructor(firstname: string, lastname: string, email: string, password: string, salt: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this._id = email;
    this.credentials = {password: password, salt: salt}
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