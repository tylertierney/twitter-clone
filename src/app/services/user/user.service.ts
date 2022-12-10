import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IUser {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<any> {
    return this.http.get<IUser>(`http://localhost:8080/api/users/${id}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.domain}/users/`);
  }
}
