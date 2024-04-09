import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { IPost } from '../posts/posts.service';
import { IUser } from '../user/user.service';
import { Location } from '@angular/common';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.activatedRoute.queryParams.subscribe(({ q }) => {
      this.searchForm.controls.searchTerm.setValue(q ?? '');
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
      }),
      shareReplay(1)
    );

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
    return this.http.get<IUser[]>('/search/users', { params: { q: q ?? '' } });
  }

  searchPosts(q: string) {
    return this.http.get<IPost[]>('/search/posts', { params: { q: q ?? '' } });
  }

  searchTags(q: string) {
    return this.http.get<ITag[]>('/search/tags', { params: { q: q ?? '' } });
  }

  onSearchRoute$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.location.path().includes('search')),
    startWith(this.location.path().includes('search')),
    shareReplay(1)
  );
}
