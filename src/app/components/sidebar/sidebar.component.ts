import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, map, startWith, switchMap } from 'rxjs';
import { SearchService } from '../../services/search/search.service';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { WhoToFollowComponent } from '../who-to-follow/who-to-follow.component';
import { TrendingTopicsComponent } from '../trending-topics/trending-topics.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    WhoToFollowComponent,
    TrendingTopicsComponent,
  ],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  onSearchPage = window.location.pathname.includes('/search');

  constructor(
    public location: Location,
    private searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}
