import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {Response} from '@angular/http';
import {Dot} from './LabWork4Test/MainPage/Area/Dot';
import {Observable} from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {SessionService} from './session.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./LabWork4Test/Login/User";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) {
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throwError(error.statusText);
  }

  public getAllDots(): Observable<Dot[]> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${usernamePasswordBasic}`,
      'cache-control': 'no-cache'
    });
    return this.http
      .get(URL + '/main/dots', {headers: headers})
      .map(response => {
        return response as Dot[];
      }).catch(this.handleError);
  }

  public addDot(dot: Dot): Observable<Dot> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${usernamePasswordBasic}`,
      'cache-control': 'no-cache'
    });
    return this.http
      .post(URL + '/main/add', dot, {headers: headers})
      .map(response => {
        return response as Dot;
      })
      .catch(this.handleError);
  }

  public deleteAllDots() {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${usernamePasswordBasic}`,
      'cache-control': 'no-cache'
    });
    return this.http
      .post(URL + '/main/delete', null, {headers: headers})
      .catch(this.handleError);
  }

  public signIn(username: string, password: string): Observable<User> {
    usernamePasswordBasic = btoa(username + ':' + password);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${usernamePasswordBasic}`,
      'cache-control': 'no-cache'
    });
    return this.http
      .get(URL + '/auth/info', {headers: headers})
      .map(response => {
        return response as User;
      })
      // .catch(this.handleError);
  }

  public logout() {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${usernamePasswordBasic}`,
      'cache-control': 'no-cache'
    });
    return this.http
      .post(URL + '/auth/logout', null, {headers: headers})
      .map(response => null)
      .catch(this.handleError);
  }

  public signUp(username: string, password: string): Observable<User> {
    usernamePasswordBasic = btoa(username + ':' + password);
    return this.http
      .post(URL + '/auth/registration', {
        username,
        password
      })
      .map(response => response as User)
      .catch(this.handleError);
  }
}

const URL = environment.apiUrl;

let usernamePasswordBasic: string;

