import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response, Request, Headers, RequestOptions } from '@angular/http';
import { Dot } from './LabWork4Test/MainPage/Area/Dot';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SessionService} from './session.service';

const URL = environment.apiUrl;

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
  private session: SessionService
  ) {
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  // get
  public getAllDots(): Observable<Dot[]> {
    const options = this.getRequestOptions();
    return this.http
      .get(URL + '/dots', options)
      .map(response => {
        const dots = response.json();
        return dots.map((dot) => new dots(dot));
      })
      .catch(this.handleError);
  }

  // post
  public addDot(dot: Dot): Observable<Dot> {
    const options = this.getRequestOptions();
    return this.http
      .post(URL + '/dots', dot, options)
      .map(success => success.status)
     //  .map(response => {
    // const dots = response.json();
    //  return dots;
      // })
      .catch(this.handleError);
  }

// delete
  public deleteAllDots(): Observable<null> {
    const options = this.getRequestOptions();
    return this.http
      .delete(URL + '/dots', options)
      .map(response => null)
      .catch(this.handleError);
  }
  public signIn(username: string, password: string) {
    return this.http
      .post(URL + '/sign-in', {
        username,
        password
      })
      .map(response => response.json())
      .catch(this.handleError);
  }
  private getRequestOptions() {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.session.accessToken
    });
    return new RequestOptions({ headers });
  }
}

