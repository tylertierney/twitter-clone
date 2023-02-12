import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IPost } from '../posts/posts.service';
import { IUser } from '../user/user.service';

export interface ITag {
  post_id: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchUsers(q: string) {
    if (!q) return of([]);
    return this.http.get<IUser[]>('/search/users', { params: { q } });
  }

  searchPosts(q: string) {
    if (!q) return of([]);
    return this.http.get<IPost[]>('/search/posts', { params: { q } });
  }

  searchTags(q: string) {
    if (!q) return of([]);
    return this.http.get<ITag[]>('/search/tags', { params: { q } });
  }
}
