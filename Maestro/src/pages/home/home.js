var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NewSessionPage } from '../new-session/new-session';
import { SessionInfoPage } from '../session-info/session-info';
export var HomePage = (function () {
    function HomePage(nav, alertCtrl) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.session_name = '';
        this.email = '';
        this.sessions = [];
        //Hard coded data for now
        this.sessions = [
            { session_id: 1,
                session_title: 'Work Session 1',
                session_time: '01:20:20',
                session_description: 'Today I worked on...' },
            { session_id: 2,
                session_title: 'Work Session 2',
                session_time: '01:20:20',
                session_description: 'Today I worked on...' }];
    }
    /**
     * Navigates to New Session Page
     */
    HomePage.prototype.newSession = function () {
        this.nav.push(NewSessionPage);
    };
    HomePage.prototype.sessionInfo = function () {
        this.nav.push(SessionInfoPage);
    };
    HomePage.prototype.deletePrompt = function () {
        var prompt = this.alertCtrl.create({
            title: 'Delete Session',
            message: "Are you sure you would like to delete this work session?",
            buttons: [
                {
                    text: 'Yes',
                    handler: function (data) {
                        console.log('Delete Session');
                    }
                },
                {
                    text: 'No',
                    handler: function (data) {
                        console.log('Cancel Delete Session');
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }), 
        __metadata('design:paramtypes', [NavController, AlertController])
    ], HomePage);
    return HomePage;
}());
//# sourceMappingURL=home.js.map