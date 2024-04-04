import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import {
  IRoutedTab,
  RoutedNavTabsComponent,
} from '../shared/tabs/routed-nav-tabs/routed-nav-tabs.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { PostComponent } from '../post/post.component';
import { SubNavComponent } from '../shared/sub-nav/sub-nav.component';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    PostComponent,
    SubNavComponent,
    BackButtonComponent,
    RoutedNavTabsComponent,
    RouterModule,
  ],
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
