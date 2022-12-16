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
  tap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../user/user.service';

// export interface IUser {
//   uid: string;
//   email: string;
//   handle: string;
//   photoURL?: string;
//   displayName?: string;
// }

export interface IRegistration {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

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
        // withCredentials: true,
      })
      .pipe(
        catchError((err) => {
          console.log('caught error');
          return of(err);
        })
      )
      .subscribe((user) => {
        this.user$.next(user);
        this.router.navigate(['']);
      });
  }

  login(formData: { email: string; password: string }): void {
    this.http
      .post<IUser>(`${environment.domain}auth/login`, formData, {})
      .subscribe((user) => {
        this.user$.next(user);
        this.router.navigate(['../home']);
      });
  }

  logout(): void {
    this.http.get(`${environment.domain}auth/logout`, {}).subscribe(() => {
      this.router.navigate(['login']);
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
          return res.isAvailable;
        })
      );
  }

  isAuthenticated() {
    return this.http.get<IUser>(`${environment.domain}auth`, {});
  }
}
