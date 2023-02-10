import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounce, debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchService } from '../../services/search/search.service';
import { IUser } from '../../services/user/user.service';

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
  // .subscribe(console.log);
}
