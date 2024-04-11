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
  userSubject = new ReplaySubject<IUser>(1);

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<IUser>(`/auth`).subscribe((user) => {
      if (user) this.userSubject.next(user);
    });
  }

  register(formData: {
    email: string;
    password: string;
    username: string;
    name: string;
  }): Observable<IUser> {
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

    return this.http.post<IUser>(`/auth/register`, body);
  }

  login(formData: { email: string; password: string }) {
    return this.http.post<IUser>(`/auth/login`, formData, {
      withCredentials: true,
    });
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
    return this.http.get<IUser>(`/auth`);
  }
}
