var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { DatabaseService } from "./db.service";
export var UserService = (function () {
    function UserService(db_service) {
        this.db_service = db_service;
    }
    UserService.prototype.getUser = function (_id) {
        return this.db_service.fetch(_id).then(function (result) {
            console.log("Successfully retrieved User with  ID " + _id);
            return result;
        }).catch(function (error) {
            console.log("Error while retreiving user with ID" + _id);
            throw error;
        });
    };
    UserService.prototype.addUser = function (user, _id) {
        return this.db_service.put(user, _id).then(function (result) {
            console.log("Successfully inserted User with ID: " + _id);
        }).catch(function (err) {
            console.log("Error while inserting User with ID:" + _id);
            throw err;
        });
    };
    UserService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [DatabaseService])
    ], UserService);
    return UserService;
}());
//# sourceMappingURL=user.service.js.map