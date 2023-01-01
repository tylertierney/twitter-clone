import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  DOMAIN = environment.domain;
  constructor(private toast: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      withCredentials: true,
      url: this.DOMAIN + req.url,
    });
    return next.handle(newRequest).pipe(
      catchError((err) => {
        console.log(err);
        this.toast.error(err.error);
        return of(err);
      })
    );
  }
}
