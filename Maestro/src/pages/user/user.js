var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {LoginPage} from '../login/login';
export var UserPage = (function () {
    function UserPage(nav, auth) {
        this.nav = nav;
        this.auth = auth;
        this.username = '';
        this.email = '';
        //let info = this.auth.getUserInfo();
        //For Dev hard code
        this.username = 'Zack Walton'; //info.name;
        this.email = 'ztwalto@gmail.com'; //info.email;
    }

    UserPage.prototype.logout = function () {
        var _this = this;
        this.auth.logout().subscribe(function (succ) {
            _this.nav.setRoot(LoginPage);
        });
    };
    UserPage = __decorate([
        Component({
            selector: 'page-user',
            templateUrl: 'user.html'
        }),
        __metadata('design:paramtypes', [NavController, AuthService])
    ], UserPage);
    return UserPage;
}());
//# sourceMappingURL=user.js.map