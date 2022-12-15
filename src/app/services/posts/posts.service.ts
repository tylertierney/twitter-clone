import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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

  getFollowedPosts(userId: string): Observable<any[]> {
    return this.http
      .get<IPost[]>(`${environment.domain}posts/${userId}/feed`)
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  createNewPost(text: string) {
    return this.http
      .post('http://localhost:8080/api/posts', {
        text,
        author: this.userId,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  getPostsByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.domain}posts/${username}`);
  }
}
