import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Dot } from './LabWork4Test/MainPage/Area/Dot';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const URL = environment.apiUrl;

@Injectable()
export class ApiService {
  constructor(
    private http: Http
  ) {
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  // get
  public getAllDots(): Observable<Dot[]> {
    return this.http
      .get(URL + '/dots')
      .map(response => {
        const dots = response.json();
        return dots.map((dot) => new dots(dot));
      })
      .catch(this.handleError);
  }

  // post
  public addDot(dot: Dot): Observable<Dot> {
    return this.http
      .post(URL + '/dots', dot)
      .map(success => success.status)
     //  .map(response => {
    // const dots = response.json();
    //  return dots;
      // })
      .catch(this.handleError);
  }

// delete
  public deleteAllDots(): Observable<null> {
    return this.http
      .delete(URL + '/dots')
      .map(response => null)
      .catch(this.handleError);
  }
}

