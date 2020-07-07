import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError, Observable, EMPTY, of } from 'rxjs';

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

  getDatatable(additionalParams = null) {
    let params = new HttpParams();

    if (additionalParams) {
      if (additionalParams.hasOwnProperty('page_index')) {
        params = params.append('page', additionalParams['page_index']);
      }
      if (additionalParams.hasOwnProperty('page_size')) {
        params = params.append('size', additionalParams['page_size']);
      }

      if (additionalParams.hasOwnProperty('order')) {
        params = params.append('order', additionalParams['order']);
      }

      if (
        additionalParams.hasOwnProperty('parsing_accomplished') &&
        additionalParams['parsing_accomplished']
      ) {
        params = params.append(
          'parsing_accomplished',
          additionalParams['parsing_accomplished']
        );
      }

      if (
        additionalParams.hasOwnProperty('filing_inline') &&
        additionalParams['filing_inline']
      ) {
        params = params.append(
          'filing_inline',
          additionalParams['filing_inline']
        );
      }

      if (
        additionalParams.hasOwnProperty('filter') &&
        additionalParams['filter']
      ) {
        params = params.append('filter', additionalParams['filter']);
      }

      if (additionalParams.hasOwnProperty('cik') && additionalParams['cik']) {
        params = params.append('cik', additionalParams['cik']);
      }

      if (
        additionalParams.hasOwnProperty('form_type') &&
        additionalParams['form_type']
      ) {
        params = params.append('form_type', additionalParams['form_type']);
      }

      if (
        additionalParams.hasOwnProperty('filing_period') &&
        additionalParams['filing_period']
      ) {
        params = params.append(
          'filing_period',
          additionalParams['filing_period']
        );
      }
    }

    return this.httpClient
      .get(`http://localhost:8080/api/filing`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  getFiling(id, additionalParams = null) {
    let params = new HttpParams();
    if (additionalParams.hasOwnProperty('page_index')) {
      params = params.append('page', additionalParams['page_index']);
    }

    if (additionalParams.hasOwnProperty('page_size')) {
      params = params.append('size', additionalParams['page_size']);
    }

    if (additionalParams.hasOwnProperty('file')) {
      params = params.append('file', additionalParams['file']);
    }

    return this.httpClient
      .get(`http://localhost:8080/api/filing_content/${id}`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  getFiles(id, additionalParams = null) {
    return this.httpClient
      .get(`http://localhost:8080/api/external/${id}`)
      .pipe(catchError(this.handleError));
  }
}
