import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { IPost } from '../posts/posts.service';
import { IUser } from '../user/user.service';

export interface ITag {
  text: string;
  count: number;
}

export interface ISearchResults {
  users: IUser[];
  posts: IPost[];
  tags: ITag[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchQueryFromRoute = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchForm.controls.searchTerm.setValue(params['q'] ?? '');
    });
  }

  searchForm = this.fb.group({
    searchTerm: this.fb.control('', {
      nonNullable: true,
    }),
  });

  submissionEvent$ = new Subject<null>();

  searchPreview$: Observable<ISearchResults> =
    this.searchForm.valueChanges.pipe(
      debounceTime(500),
      map((form) => form.searchTerm ?? ''),
      switchMap((q) => {
        return combineLatest({
          users: this.searchUsers(q),
          tags: this.searchTags(q),
          posts: this.searchPosts(q),
        });
      })
    );

  // searchResult$ = this.submissionEvent$.pipe(
  //   withLatestFrom(this.searchPreview$),
  //   map(([x, y]) => y)
  // );

  searchResult$ = this.activatedRoute.queryParams.pipe(
    switchMap((params) =>
      combineLatest({
        users: this.searchUsers(params['q']),
        tags: this.searchTags(params['q']),
        posts: this.searchPosts(params['q']),
      })
    )
  );

  searchUsers(q: string) {
    // if (!q) return of([]);
    return this.http.get<IUser[]>('/search/users', { params: { q: q ?? '' } });
  }

  searchPosts(q: string) {
    // if (!q) return of([]);
    return this.http.get<IPost[]>('/search/posts', { params: { q: q ?? '' } });
  }

  searchTags(q: string) {
    // if (!q) return of([]);
    return this.http.get<ITag[]>('/search/tags', { params: { q: q ?? '' } });
  }
}
