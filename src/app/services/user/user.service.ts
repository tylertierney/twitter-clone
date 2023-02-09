import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string;
  profile_pic: string;
  header_pic: string;
  created_at: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<any> {
    return this.http.get<IUser>(`/users/${id}`);
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(`/users/${username}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<IUser[]>(`/users/`, {
      // withCredentials: true,
    });
  }
}
