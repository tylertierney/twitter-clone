import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  filter,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ITag } from '../search/search.service';

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
  likes: string[];
  reply_count: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private userId$ = this.authService.userSubject.pipe(
    map(({ id }) => id),
    filter(Boolean)
  );

  fetchAllPostsSubject = new ReplaySubject<void>(1);

  readonly allPosts$ = this.fetchAllPostsSubject.pipe(
    switchMap(() => this.http.get<IPost[]>(`/posts/`)),
    shareReplay(1)
  );

  fetchFollowedPostsSubject = new ReplaySubject<void>(1);

  readonly followedPosts$ = this.fetchFollowedPostsSubject.pipe(
    withLatestFrom(this.userId$, (_, id) => id),
    switchMap((userId) => this.http.get<IPost[]>(`/posts/${userId}/feed`))
  );

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private toast: ToastrService
  ) {
    this.fetchAllPostsSubject.next();
    this.fetchFollowedPostsSubject.next();
  }

  createNewPost(form: FormGroup) {
    return this.userId$
      .pipe(
        switchMap((userId) => {
          const formData = new FormData();
          formData.append('text', form.controls['text'].value);
          const photo_file = form.controls['photo_file'].value;
          if (photo_file) {
            formData.append('photo_file', photo_file);
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
        this.fetchAllPostsSubject.next();
        this.fetchFollowedPostsSubject.next();
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

  getTrendingTags(): Observable<ITag[]> {
    return this.http
      .get<{ text: string; count: string }[]>(`/tags`)
      .pipe(
        map((arr) =>
          arr.map((tag) => ({ ...tag, count: parseInt(tag.count, 10) }))
        )
      );
  }

  getPostsByTag(tag: string) {
    return this.http.get<IPost[]>(`/tags/${tag}`);
  }
}
