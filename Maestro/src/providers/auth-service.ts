import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * User object
 */
export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  /**
   * Method to handle Login Authentication
   * (TODO) Replace with real HTTP calls
   */
  public login(credentials){
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point we need to make a request to the backend for a real check.
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Zack', 'ztwalto@gmail.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  /**
   * Method to store user information when registered
   * (TODO) Replace with real HTTP calls
   */
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      // Currently only checking to see if values are entered
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
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
