import { Component } from '@angular/core';
import { SearchService } from '../../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { TagSearchResultComponent } from '../../shared/tag-search-result/tag-search-result.component';

@Component({
  standalone: true,
  imports: [CommonModule, TagSearchResultComponent],
  selector: 'app-search-tags',
  templateUrl: './search-tags.component.html',
  styleUrls: ['./search-tags.component.css'],
})
export class SearchTagsComponent {
  constructor(public searchService: SearchService) {}
}
