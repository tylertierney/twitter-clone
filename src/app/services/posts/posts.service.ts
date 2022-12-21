import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface IPost {
  id: string;
  date: string;
  username: string;
  text: string;
  name: string;
  user_id: string;
  profile_pic: string;
  photo_url: string;
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
    return this.http
      .get<IPost[]>(`/posts/${userId}/feed`)
      .pipe(tap(console.log));
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
  }

  getPostIsLiked(post_id: string, user_id: string) {
    return this.http.get<boolean>(`/posts/like/${post_id}/${user_id}`);
  }

  togglePostLiked(post_id: string, user_id: string) {
    return this.http.post<boolean>(`/posts/like/${post_id}/${user_id}`, {});
  }
}
