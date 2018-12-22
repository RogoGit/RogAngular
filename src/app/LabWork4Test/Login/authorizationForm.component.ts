import { Component } from '@angular/core';
import {User} from './User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reg-form',
  templateUrl: './authorizationForm.component.html',
  styleUrls: ['./pagedesign.component.css']
})

export class AuthorizationFormComponent {
  constructor(private _router: Router) {}
  submitted = false;
  model = new User('', '');
  onSubmit() {
    this.submitted = true;
    this._router.navigate(['/MainPage']);
  }

    newUser() {
      this.model = new User('',  '');
    }
}
