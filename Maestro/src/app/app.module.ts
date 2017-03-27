import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AuthService} from '../providers/auth/auth-service'
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {HomePage} from '../pages/home/home';
import {UserPage} from '../pages/user/user';
import {NewSessionPage} from '../pages/new-session/new-session';
import {SessionInfoPage} from "../pages/session-info/session-info";
import {DatabaseService} from "../providers/database/db.service";
import {UserService} from "../providers/database/user.service";
import {PasswordService} from "../providers/auth/password.service";
import {SessionService} from "../providers/sessions/session.service"
import { SessionHistPage } from "../pages/session-hist/session-hist";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UserPage,
    NewSessionPage,
    SessionInfoPage,
    SessionHistPage
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
    SessionHistPage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }, AuthService, DatabaseService, UserService, PasswordService, SessionService]
})
export class AppModule {
}
