import { Component } from '@angular/core';
import { SearchService } from '../../../services/search/search.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css'],
})
export class SearchUsersComponent {
  constructor(public searchService: SearchService) {}
}
