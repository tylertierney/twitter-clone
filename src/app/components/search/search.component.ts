import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { IRoutedTab } from '../shared/tabs/routed-nav-tabs/routed-nav-tabs.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  tabs = ['Posts', 'Users', 'Topics'];
  selectedTab: string = 'Posts';
  newTabs: IRoutedTab[] = [
    { label: 'Posts', routerLink: 'posts' },
    { label: 'People', routerLink: 'people' },
    { label: 'Topics', routerLink: 'tags' },
  ];

  constructor(public location: Location, public searchService: SearchService) {}
}
