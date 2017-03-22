import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {UserService} from "../database/user.service";
import {User, Credentials} from "../database/user";
import {PasswordService} from "./password.service";

@Injectable()
export class AuthService {
  currentUser: User;
  user_service: UserService;
  password_service: PasswordService;

  /**
   * Method to handle Login Authentication
   * (TODO) Replace with real HTTP calls
   */

  constructor(user_service: UserService, password_service: PasswordService) {
    this.user_service = user_service;
    this.password_service = password_service;
  }

  public login(credentials): Promise<boolean> {
    if (credentials.email === null || credentials.password === null) {
      throw new Error("Incomplete login form");
    } else {
      return this.user_service.getUser(credentials.email).then(result => {
        if (result === null) {
          return false;
        }
        let actual_credentials: Credentials = result.credentials;
        let provided_password = this.password_service.hashPassword(credentials.password, actual_credentials.salt);
        if (provided_password === actual_credentials.password) {
          this.currentUser = result;
          return true;
        }
        return false;
      }).catch(err => {
        throw err;
      })
    }
  }

  /**
   * Method to store user information when registered
   * (TODO) Replace with real HTTP calls
   */
  public register(credentials): Promise<boolean> {
    if (credentials.email === null || credentials.password === null) {
      throw new Error("Incomplete registration form");
    }
    else {
      return this.user_service.getUser(credentials.email).then(result => {
        if (result != null) {
          throw new Error("A User with this email already exists");
        }
        let user_salt = this.password_service.genSalt();
        let user_password = this.password_service.hashPassword(credentials.password, user_salt);
        let new_user: User = new User(credentials.first_name, credentials.last_name, credentials.email, user_password, user_salt);
        return this.user_service.addUser(new_user, new_user._id);
      }).catch(err => {
        console.log("Error while creating account" + err);
        return false;
      }).then(result => {
        return true;
      }).catch(err => {
        console.log("Error while creating account" + err);
        return false;
      })
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    // TODO Replace with real Http calls
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
