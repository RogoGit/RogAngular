import { Component } from '@angular/core';
import { User} from './User';
import { Router} from '@angular/router';
import { AuthService} from '../../auth.service';
import { ApiService} from '../../api.service';
import { HttpModule } from '@angular/http';

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
    ) {}
    failed = true;
  busy = false;
  submitted = false;
  model = new User('', '');
  onSubmit() {
    this.submitted = true;
    this.doSignIn();
   // this._router.navigate(['/MainPage']);
  }

    newUser() {
      this.model = new User('',  '');
    }
  public doSignIn() {
    this.api
      .signIn(this.model.name, this.model.password)
      .subscribe(
        (response) => {
          this.auth.doSignIn(
            response.token,
            response.name
          );
          this._router.navigate(['/MainPage']);
        },
        (error) => {
          this.failed = true;
        }
      );
  }
}
