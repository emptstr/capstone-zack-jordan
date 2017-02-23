import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthService) {}


}