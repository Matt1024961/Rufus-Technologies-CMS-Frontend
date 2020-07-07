import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestfulService {
  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `${error.message}`;
    } else {
      // Server-side errors
      errorMessage = `${error.message}`;
    }
    return throwError(errorMessage);
  }

  getContainer() {
    return this.httpClient
      .get(`http://localhost:8080/api/dashboard`)
      .pipe(catchError(this.handleError));
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
