import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { IUser } from '../user/user.service';

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
    const profilePics = ['coral', 'bluejeans', 'aeroblue', 'pastelpink'];

    const profile_pic =
      profilePics[Math.floor(Math.random() * profilePics.length)];

    const body = { ...formData, profile_pic };

    this.http
      .post(`/auth/register`, body, {})
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
    this.http.post<IUser>(`/auth/login`, formData, {}).subscribe((user) => {
      this.user$.next(user);
      this.router.navigate(['../home']);
    });
  }

  logout(): void {
    this.http.get(`/auth/logout`, {}).subscribe(() => {
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
