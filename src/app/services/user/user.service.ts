import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string;
  profile_pic: string;
  header_pic: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<any> {
    return this.http.get<IUser>(`http://localhost:8080/api/users/${id}`);
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.domain}users/${username}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.domain}/users/`, {
      withCredentials: true,
    });
  }
}
