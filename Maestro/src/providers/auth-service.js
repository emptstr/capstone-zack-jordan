var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/**
 * User object
 */
export var User = (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
    }
    return User;
}());
export var AuthService = (function () {
    function AuthService() {
    }
    /**
     * Method to handle Login Authentication
     * (TODO) Replace with real HTTP calls
     */
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        }
        else {
            return Observable.create(function (observer) {
                // At this point we need to make a request to the backend for a real check.
                var access = (credentials.password === "pass" && credentials.email === "email");
                _this.currentUser = new User('Zack', 'ztwalto@gmail.com');
                observer.next(access);
                observer.complete();
            });
        }
    };
    /**
     * Method to store user information when registered
     * (TODO) Replace with real HTTP calls
     */
    AuthService.prototype.register = function (credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        }
        else {
            // At this point store the credentials to your backend!
            // Currently only checking to see if values are entered
            return Observable.create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthService.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        // TODO Replace with real Http calls
        return Observable.create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    AuthService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthService);
    return AuthService;
}());
//# sourceMappingURL=auth-service.js.map