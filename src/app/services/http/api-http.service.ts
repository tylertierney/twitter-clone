import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  DOMAIN = environment.domain;

  constructor(private http: HttpClient) {}

  get(
    path: string,
    options: {
      body?: any;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      context?: HttpContext;
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType: 'arraybuffer';
      withCredentials?: boolean;
    }
  ) {
    return this.http.get(this.DOMAIN + path, options);
  }

  post(
    path: string,
    body: any | null,
    options: {
      body?: any;
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      context?: HttpContext;
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType: 'arraybuffer';
      withCredentials?: boolean;
    }
  ) {
    return this.http.post(this.DOMAIN + path, body, options);
  }
}
