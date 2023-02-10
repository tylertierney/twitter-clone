import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IUser } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchUsers(q: string) {
    if (!q) return of([]);
    return this.http.get<IUser[]>('/search', { params: { q } });
  }
}
