import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IUser {
  uid: string;
  email: string;
  handle: string;
  photoURL?: string;
  displayName?: string;
}

export interface IRegistration {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: any;

  constructor(private http: HttpClient) {}

  register(formData: {
    email: string;
    password: string;
    username: string;
    displayName: string;
    photoURL: string;
  }) {
    console.log('register called');
    // console.log(environment.domain + 'auth/register');
    // return this.http.post(`${environment.domain}auth/register`, formData).pipe(
    //   map((res) => {
    //     console.log(res);
    //     return res;
    //   })
    // );

    this.http
      .post(`${environment.domain}auth/register`, formData)
      .pipe(
        catchError((err) => {
          console.log('caught error');
          return of(err);
        })
      )
      .subscribe(console.log);
  }
}
