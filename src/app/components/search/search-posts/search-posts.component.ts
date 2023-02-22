import { Component } from '@angular/core';
import { SearchService } from '../../../services/search/search.service';

@Component({
  selector: 'app-search-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.css'],
})
export class SearchPostsComponent {
  constructor(public searchService: SearchService) {}
}
