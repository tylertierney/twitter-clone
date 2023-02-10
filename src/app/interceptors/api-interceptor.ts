import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  DOMAIN = environment.domain;
  constructor() {}

  private formatError(err: any) {
    return throwError(() => new Error(err.error));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      withCredentials: true,
      url: this.DOMAIN + req.url,
    });
    return next.handle(newRequest).pipe(catchError(this.formatError));
  }
}
