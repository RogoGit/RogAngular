import {Component} from '@angular/core';
import {User} from './User';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {ApiService} from '../../api.service';
import {headersToString} from 'selenium-webdriver/http';

@Component({
  selector: 'app-reg-form',
  templateUrl: './authorizationForm.component.html',
  styleUrls: ['./pagedesign.component.css'],
  providers: []
})

export class AuthorizationFormComponent {
  constructor(
    private _router: Router,
    private api: ApiService,
    private auth: AuthService,
  ) {
  }
  submitted = false;
  model = new User('', '');
  failed = false;
  busy = false;
  notExist = false;
  onSubmit() {
    this.submitted = true;
    this.failed = false;
    this.busy = false;
    this.notExist = false;
    const buttonName = document.activeElement.getAttribute('name');
    if (buttonName === 'in') {
      this.doSignIn();
    } else {
      this.doSignUp();
    }
  }

  newUser() {
    this.model = new User('', '');
  }

  public doSignIn() {
    this._router.navigate(['/MainPage']);
    this.api
      .signIn(this.model.username, this.model.password)
      .subscribe(
        (response) => {
          this.auth.doSignIn(
            response.username,
            response.password,
          );

          this._router.navigate(['/MainPage']);
        },
        (error) => {
          if (error.status === 401) { this.notExist = true; } else {
            this.failed = true; }
        }
      );
  }

  public doSignUp() {
    this.api
      .signUp(this.model.username, this.model.password)
      .subscribe(
        (response) => {
          if (response != null) {
            this.auth.doSignIn(
              response.username,
              response.password,
            );
          } else {
            this.busy = true;
          }
          this._router.navigate(['/MainPage']);
        },
        (error) => {
          this.failed = true;
        }
      );
  }
}
