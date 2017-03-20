import {Injectable} from "@angular/core";
import {DatabaseService} from "./db.service";
import {User} from "./user";

@Injectable()
export class UserService {

  private db_service: DatabaseService;

  constructor(db_service: DatabaseService) {
    this.db_service = db_service;
  }

  public getUser(_id: string): Promise<User> {
    return this.db_service.fetch(_id).then(result => {
      console.log("Successfully retrieved User with  ID " + _id);
      return result
    }).catch(error => {
      console.log("Error while retreiving user with ID" + _id);
      throw error;
    });
  }

  public addUser(user: User, _id: string) {
    return this.db_service.put(user, _id).then(result => {
      console.log("Successfully inserted User with ID: " + _id);
    }).catch(err => {
      console.log("Error while inserting User with ID:" + _id);
      throw err;
    });
  }
}