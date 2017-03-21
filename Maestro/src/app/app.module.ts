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
import {SessionService} from "../providers/sessions/session.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UserPage,
    NewSessionPage,
    SessionInfoPage
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
    SessionInfoPage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }, AuthService, DatabaseService, UserService, PasswordService, SessionService]
})
export class AppModule {
}
