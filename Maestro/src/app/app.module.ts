import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {HomePage} from '../pages/home/home';
import {UserPage} from '../pages/user/user';
import {NewSessionPage} from '../pages/new-session/new-session';
import {SessionInfoPage} from "../pages/session-info/session-info";
import { SessionHistPage } from "../pages/session-hist/session-hist";
import { InitSurveyPage } from  "../pages/init-survey/init-survey";
import { SessionSurveyPage } from "../pages/session-survey/session-survey";

import { ListSession } from "../components/list-session/list-session";
import { SurveyTemp } from "../components/survey_temp/survey_temp";

import {DatabaseService} from "../providers/database/db.service";
import {UserService} from "../providers/database/user.service";
import {PasswordService} from "../providers/auth/password.service";
import {SessionService} from "../providers/sessions/session.service";
import {AuthService} from '../providers/auth/auth-service'
import {SurveyService} from '../providers/survey/survey.service'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UserPage,
    NewSessionPage,
    SessionInfoPage,
    SessionHistPage,
    ListSession,
    InitSurveyPage,
    SurveyTemp,
    SessionSurveyPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UserPage,
    NewSessionPage,
    SessionInfoPage,
    SessionHistPage,
    ListSession,
    InitSurveyPage,
    SurveyTemp,
    SessionSurveyPage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }, AuthService, DatabaseService, UserService, PasswordService, SessionService, SurveyService]
})
export class AppModule {
}
