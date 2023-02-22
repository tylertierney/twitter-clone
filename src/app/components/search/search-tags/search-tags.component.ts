import { Component } from '@angular/core';
import { SearchService } from '../../../services/search/search.service';

@Component({
  selector: 'app-search-tags',
  templateUrl: './search-tags.component.html',
  styleUrls: ['./search-tags.component.css'],
})
export class SearchTagsComponent {
  constructor(public searchService: SearchService) {}
}
