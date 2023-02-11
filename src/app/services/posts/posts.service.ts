import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  map,
  Observable,
  of,
  ReplaySubject,
  share,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
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
  replying_to: null | string;
  tags: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  userId$ = new ReplaySubject<string>();
  followedPosts$ = new ReplaySubject<IPost[]>();

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private toast: ToastrService
  ) {
    this.authService.user$.subscribe(({ id }) => this.userId$.next(id));

    this.userId$
      .pipe(
        shareReplay(1),
        switchMap((userId) => {
          return userId
            ? this.http.get<IPost[]>(`/posts/${userId}/feed`)
            : of([]);
        })
      )
      .subscribe((posts) => {
        this.followedPosts$.next(posts);
      });
  }

  fetchFollowedPosts() {
    this.userId$
      .pipe(
        shareReplay(1),
        switchMap((userId) => this.http.get<IPost[]>(`/posts/${userId}/feed`))
      )
      .subscribe((posts) => {
        this.followedPosts$.next(posts);
      });
  }

  createNewPost(form: FormGroup) {
    return this.userId$
      .pipe(
        switchMap((userId) => {
          const formData = new FormData();
          formData.append('text', form.controls['text'].value);
          const photo_file = form.controls['photo_file'].value;
          if (photo_file) {
            formData.append('photo_file', new Blob([photo_file]));
          }
          const replying_to = form.controls['replying_to'].value;
          if (replying_to) {
            formData.append('replying_to', replying_to);
          }
          formData.append('tags', JSON.stringify(form.controls['tags'].value));
          formData.append('author', userId);
          return this.http.post('/posts', formData);
        })
      )
      .subscribe(() => {
        this.fetchFollowedPosts();
        this.toast.success('Your tweet was posted');
        form.reset();
      });
  }

  getPostsByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`/users/${username}/posts`);
  }

  getPostIsLiked(post_id: string, user_id: string) {
    return this.http.get<boolean>(`/posts/like/${post_id}/${user_id}`);
  }

  getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`/posts/${id}`);
  }

  togglePostLiked(post_id: string, user_id: string) {
    return this.http.post<boolean>(`/posts/like/${post_id}/${user_id}`, {});
  }

  getRepliesByPostId(post_id: string) {
    return this.http.get<IPost[]>(`/posts/${post_id}/replies`);
  }

  deletePostById(post_id: string) {
    return this.http.delete<any>(`/posts/${post_id}`);
  }

  getTrendingTags() {
    return this.http.get<any[]>(`/tags`);
  }
}
