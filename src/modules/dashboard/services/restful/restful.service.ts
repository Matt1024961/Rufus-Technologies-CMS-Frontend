import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestfulService {
  constructor(private httpClient: HttpClient) {}

  getContainer() {
    return this.httpClient.get(`http://localhost:8080/api/dashboard`);
  }

  getOverview(additionalParams = {}) {
    let params = new HttpParams();
    if (
      additionalParams.hasOwnProperty('year') &&
      !additionalParams.hasOwnProperty('month')
    ) {
      params = params.append('year', additionalParams['year']);
    } else if (
      additionalParams.hasOwnProperty('year') &&
      additionalParams.hasOwnProperty('month')
    ) {
      params = params.append('year', additionalParams['year']);
      params = params.append('month', additionalParams['month']);
    }

    return this.httpClient.get(`http://localhost:8080/api/filing/overview`, {
      params,
    });
  }

  getNewest() {
    return this.httpClient.get(`http://localhost:8080/api/filing/newest`);
  }

  getCounts() {
    return this.httpClient.get(`http://localhost:8080/api/filing/counts`);
  }
}
