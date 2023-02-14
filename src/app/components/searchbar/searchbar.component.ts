import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  domain = environment.domain;

  onSearchPage = window.location.pathname === '/search';

  constructor(public searchService: SearchService, private router: Router) {}

  submit() {
    this.input.nativeElement.blur();
    this.searchService.submissionEvent$.next(null);
    this.searchService.searchForm.markAllAsTouched();
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchService.searchForm.value.searchTerm },
    });
  }
}
