import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface IPost {
  date: string;
  username: string;
  text: string;
  name: string;
  user_id: string;
  profile_pic: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  userId: string;

  constructor(private http: HttpClient, public authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      if (user && user.id) {
        this.userId = user.id;
      }
    });
  }

  getFollowedPosts(userId: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(`/posts/${userId}/feed`);
  }

  createNewPost(text: string) {
    return this.http
      .post('/posts', {
        text,
        author: this.userId,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  getPostsByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`/posts/${username}`);
    // return of([]);
  }
}
