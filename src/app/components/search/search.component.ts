import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  tabs = ['Posts', 'Users', 'Topics'];
  selectedTab: string = 'Posts';

  constructor(public location: Location, public searchService: SearchService) {}
}
