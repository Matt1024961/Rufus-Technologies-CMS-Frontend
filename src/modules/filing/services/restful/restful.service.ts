import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestfulService {
  constructor(private httpClient: HttpClient) {}

  getDatatable(additionalParams = null) {
    let params = new HttpParams();
    // console.log(additionalParams);
    if (additionalParams) {
      if (additionalParams.hasOwnProperty('pageIndex')) {
        params = params.append('page', additionalParams['pageIndex']);
      }
      if (additionalParams.hasOwnProperty('pageSize')) {
        params = params.append('size', additionalParams['pageSize']);
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
    }
    // console.log(params);

    return this.httpClient.get(`http://localhost:8080/api/filing`, {
      params,
    });
  }
}
