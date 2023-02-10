import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  map,
  Observable,
  of,
  ReplaySubject,
  tap,
  throwError,
} from 'rxjs';
import { IUser } from '../user/user.service';

export interface IRegistration {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new ReplaySubject<IUser>();

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<IUser>(`/auth`).subscribe((user) => {
      if (user) this.user$.next(user);
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
      'bluejeans',
      'aeroblue',
      'pastelpink',
      'lightblue',
      'lightgreen',
      'mediumslateblue',
      'deepskyblue',
      'plum',
    ];

    const profile_pic = profilePics[~~(Math.random() * profilePics.length)];

    const body = { ...formData, profile_pic };

    this.http
      .post<IUser>(`/auth/register`, body)
      .pipe(
        catchError((err) => {
          return throwError(() => new Error(err.error));
        })
      )
      .subscribe((user) => {
        this.user$.next(user);
        this.router.navigate(['']);
      });
  }

  login(formData: { email: string; password: string }): void {
    this.http
      .post<IUser>(`/auth/login`, formData, {})
      .pipe(
        tap(() => {
          this.router.navigate(['../home']);
        })
      )
      .subscribe((_) => this.user$.next(_));
  }

  logout(): void {
    this.http.get(`/auth/logout`).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  checkUsernameAvailable(username: string): Observable<boolean> {
    return this.http
      .post<{ isAvailable: boolean }>(`/auth/check-username-available`, {
        username,
      })
      .pipe(
        map((res) => {
          return res.isAvailable;
        })
      );
  }

  checkEmailAvailable(email: string): Observable<boolean> {
    return this.http
      .post<{ isAvailable: boolean }>(`/auth/check-email-available`, { email })
      .pipe(
        map((res) => {
          return res.isAvailable;
        })
      );
  }

  isAuthenticated() {
    return this.http.get<IUser>(`/auth`, {});
  }
}
