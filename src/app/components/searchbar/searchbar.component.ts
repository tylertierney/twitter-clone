import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SearchService } from '../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchResultComponent } from '../shared/user-search-result/user-search-result.component';
import { TweetSearchResultComponent } from '../shared/tweet-search-result/tweet-search-result.component';
import { TagSearchResultComponent } from '../shared/tag-search-result/tag-search-result.component';
import { RxPush } from '@rx-angular/template/push';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserSearchResultComponent,
    TweetSearchResultComponent,
    TagSearchResultComponent,
    RxPush,
  ],
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild('searchResultsDropdown')
  searchResultsDropdown: ElementRef<HTMLInputElement>;

  domain = environment.domain;

  constructor(public searchService: SearchService, private router: Router) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.input.nativeElement.blur();
    }
  }

  submit() {
    this.input.nativeElement.blur();
    this.searchService.submissionEvent$.next(null);
    this.searchService.searchForm.markAllAsTouched();
    this.router.navigate(['search'], {
      queryParams: { q: this.searchService.searchForm.value.searchTerm },
    });
  }

  searchPreview$ = this.searchService.searchPreview$;

  users$ = this.searchPreview$.pipe(map(({ users }) => users));

  posts$ = this.searchPreview$.pipe(map(({ posts }) => posts));

  tags$ = this.searchPreview$.pipe(map(({ tags }) => tags));
}
