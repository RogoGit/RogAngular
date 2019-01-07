import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Http, Response, Request, Headers, RequestOptions} from '@angular/http';
import {Dot} from './LabWork4Test/MainPage/Area/Dot';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {SessionService} from './session.service';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {User} from "./LabWork4Test/Login/User";

const URL = environment.apiUrl;

@Injectable()
export class ApiService {
  usernamePasswordBasic: string;

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) {
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  public getAllDots(): Observable<Dot[]> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${this.usernamePasswordBasic}`,
      'cache-control': 'no-cache'
    });
    return this.http
      .get(URL + '/main/dots', {headers: headers})
      .map(response => {
        let dots = response as Dot[];
        console.log(dots);
        return dots;//я присылаю json он вроде должен сам интепретирвоать их как Dot
      }).catch(this.handleError);
  }

  public addDot(dot: Dot): Observable<Dot> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${this.usernamePasswordBasic}`,
      'cache-control': 'no-cache'
    });
    return this.http
      .post(URL + '/main/add', dot, {headers: headers})
      .map(response => {
        return response as Dot; //я присылаю json он вроде должен сам интепретирвоать их как Dot
      })
      .catch(this.handleError);
  }

  public deleteAllDots(): Observable<null> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${this.usernamePasswordBasic}`,
      'cache-control': 'no-cache'
    });
    return this.http
      .post(URL + '/main/delete', {headers: headers})
      .map(response => null)
      .catch(this.handleError);
  }

  public signIn(username: string, password: string): Observable<User> {
    this.usernamePasswordBasic = btoa(username + ':' + password);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${this.usernamePasswordBasic}`, //это такая авторизация
      'cache-control': 'no-cache'
    });
    return this.http
      .get(URL + '/auth/info', {headers: headers})
      .map(response => {
        let user = response as User;
        console.log(user);
        return user;// возможно это не работает
      })
      .catch(this.handleError);
  }

  public logout() {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${this.usernamePasswordBasic}`,
      'cache-control': 'no-cache'
    });
    return this.http
      .post(URL + '/auth/logout', null, {headers: headers})
      .map(response => null)
      .catch(this.handleError);
  }

  public signUp(username: string, password: string): Observable<User> {
    return this.http
      .post(URL + '/auth/registration', {
        username,
        password
      })
      .map(response => response as User)
      .catch(this.handleError);
  }
}

