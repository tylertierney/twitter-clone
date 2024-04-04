import { Component } from '@angular/core';
import { SearchService } from '../../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { UserSearchResultComponent } from '../../shared/user-search-result/user-search-result.component';

@Component({
  standalone: true,
  imports: [CommonModule, UserSearchResultComponent],
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css'],
})
export class SearchUsersComponent {
  constructor(public searchService: SearchService) {}
}
