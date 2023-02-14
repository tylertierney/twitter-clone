import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  // selectedFeed = this.searchService.searchResult$.pipe(map((res) => res.posts));

  tabs = ['Posts', 'Users', 'Topics'];
  selectedTab: string = 'Posts';

  constructor(public location: Location, public searchService: SearchService) {}

  // handleTabChange(label: string) {
  //   if(label === 'Posts') {
  //     this.selec
  //   }
  // }
}
