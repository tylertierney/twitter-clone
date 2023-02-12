import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  combineLatest,
  debounce,
  debounceTime,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { IPost } from '../../services/posts/posts.service';
import { ITag, SearchService } from '../../services/search/search.service';
import { IUser } from '../../services/user/user.service';

interface ISearchResults {
  users: IUser[];
  posts: IPost[];
  tags: ITag[];
}

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  domain = environment.domain;
  searchForm = this.fb.group({
    searchTerm: this.fb.control('', { nonNullable: true }),
  });

  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit(): void {}

  searchResult$: Observable<IUser[]> = this.searchForm.valueChanges.pipe(
    debounceTime(500),
    map((form) => form.searchTerm ?? ''),
    switchMap((q) => this.searchService.searchUsers(q))
  );

  searchResult2$: Observable<ISearchResults> = this.searchForm.valueChanges
    .pipe(
      debounceTime(500),
      map((form) => form.searchTerm ?? ''),
      switchMap((q) => {
        return combineLatest({
          users: this.searchService.searchUsers(q),
          tags: this.searchService.searchTags(q),
          posts: this.searchService.searchPosts(q),
        });
      })
    )
    .pipe(tap(console.log));
}
