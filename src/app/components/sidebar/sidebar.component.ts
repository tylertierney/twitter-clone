import { Location } from '@angular/common';
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

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  onSearchPage = window.location.pathname === '/search';

  constructor(
    public location: Location,
    private searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}
