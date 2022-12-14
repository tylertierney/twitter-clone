import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  mapTo,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
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
  isLoggedIn = false;
  user$ = new BehaviorSubject<any>(null);
  // user$: Observable<any>;

  // user$: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.http
      .post(`${environment.domain}auth/login`, {}, { withCredentials: true })
      .subscribe((user) => {
        console.log(user);
        this.user$.next(user);
        this.isLoggedIn = true;
        this.router.navigate(['']);
      });
  }

  register(formData: {
    email: string;
    password: string;
    username: string;
    name: string;
  }): void {
    const profilePics = [
      'coral',
      'lightblue',
      'lightgreen',
      'orange',
      'palegreen',
      'pink',
      'plum',
      'powderblue',
      'slateblue',
    ];

    const profile_pic =
      '/assets/svg/user-avatar/' +
      profilePics[Math.floor(Math.random() * profilePics.length)] +
      '.svg';

    const body = { ...formData, profile_pic };

    this.http
      .post(`${environment.domain}auth/register`, body, {
        withCredentials: true,
      })
      .pipe(
        catchError((err) => {
          console.log('caught error');
          return of(err);
        })
      )
      .subscribe((user) => {
        console.log('registered user = ', user);
        this.user$.next(user);
        this.isLoggedIn = true;
        this.router.navigate(['']);
      });
  }

  login(formData: { email: string; password: string }): void {
    this.http
      .post(`${environment.domain}auth/login`, formData, {
        withCredentials: true,
      })
      .subscribe((user) => {
        this.user$.next(user);
        this.isLoggedIn = true;
        this.router.navigate(['']);
      });
  }

  logout(): void {
    this.http
      .get(`${environment.domain}auth/logout`, { withCredentials: true })
      .subscribe(() => {
        this.router.navigate(['login']);
        this.user$.next(null);
        this.isLoggedIn = false;
      });
  }

  checkUsernameAvailable(username: string): Observable<boolean> {
    return this.http
      .post<{ isAvailable: boolean }>(
        `${environment.domain}auth/check-username-available`,
        { username }
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.isAvailable;
        })
      );
  }

  checkEmailAvailable(email: string): Observable<boolean> {
    return this.http
      .post<{ isAvailable: boolean }>(
        `${environment.domain}auth/check-email-available`,
        { email }
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.isAvailable;
        })
      );
  }
}
