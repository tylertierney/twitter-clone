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

export interface NewPost {
  text: string;
  photo_file: File | undefined;
  replying_to: string | undefined;
  tags: string[];
}

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

  createNewPost(post: NewPost) {
    return this.userId$.pipe(
      switchMap((userId) => {
        const formData = new FormData();
        formData.append('text', post.text);
        if (post.photo_file) {
          formData.append('photo_file', post.photo_file);
        }
        if (post.replying_to) {
          formData.append('replying_to', post.replying_to);
        }
        formData.append('tags', JSON.stringify(post.tags ?? []));
        formData.append('author', userId);
        return this.http.post('/posts', formData);
      })
    );
  }

  getPostsByUsername(username: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(`/users/${username}/posts`);
  }

  getPostIsLiked(post_id: string, user_id: string): Observable<boolean> {
    return this.http.get<boolean>(`/posts/like/${post_id}/${user_id}`);
  }

  getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`/posts/${id}`);
  }

  togglePostLiked(post_id: string, user_id: string): Observable<boolean> {
    return this.http.post<boolean>(`/posts/like/${post_id}/${user_id}`, {});
  }

  getRepliesByPostId(post_id: string): Observable<IPost[]> {
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

  getPostsByTag(tag: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(`/tags/${tag}`);
  }
}
