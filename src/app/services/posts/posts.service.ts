import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
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

export interface ITweetForm {
  text: FormControl<string>;
  photo_file: FormControl<File | null>;
  replying_to: FormControl<string | null>;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  userId: string;

  // followedPosts$: Observable<IPost[]>;
  // refreshFollowedPosts$ = new BehaviorSubject<boolean>(false);

  followedPosts$ = new BehaviorSubject<IPost[]>([]);

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private toast: ToastrService
  ) {
    this.authService.user$.subscribe((user) => {
      if (user && user.id) {
        this.userId = user.id;
      }
    });

    // this.authService.user$.pipe(switchMap(({ id }) => {
    //   return this.http.get<IPost[]>(`/posts/${id}/feed`)
    // }))

    // this.followedPosts$.next()

    // this.followedPosts$ = this.authService.user$.pipe(
    //   switchMap(({ id }) => {
    //     return this.http.get<IPost[]>(`/posts/${id}/feed`);
    //   })
    // );
  }

  fetchFollowedPosts() {
    this.authService.user$.subscribe(({ id }) => {
      this.http.get<IPost[]>(`/posts/${id}/feed`).subscribe((posts) => {
        this.followedPosts$.next(posts);
      });
    });
  }

  // getFollowedPosts(userId: string): Observable<IPost[]> {
  //   return this.http.get<IPost[]>(`/posts/${userId}/feed`);
  // }

  createNewPost(form: FormGroup) {
    console.log(form);
    const formData = new FormData();

    // formData.append('text', form.value.text);
    formData.append('text', form.controls['text'].value);
    const photo_file = form.controls['photo_file'].value;
    if (photo_file) {
      formData.append('photo_file', new Blob([photo_file]));
    }
    const replying_to = form.controls['replying_to'].value;
    if (replying_to) {
      formData.append('replying_to', replying_to);
    }
    formData.append('author', this.userId);
    formData.append('tags', JSON.stringify(form.controls['tags'].value));

    return this.http.post('/posts', formData).subscribe((_) => {
      this.toast.success('Your tweet was posted!');
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

  getAllTagsByPostId(post_id: string) {
    return this.http.get<string[]>(`/posts/${post_id}/tags`);
  }

  getRepliesByPostId(post_id: string) {
    return this.http.get<IPost[]>(`/posts/${post_id}/replies`);
  }
}
