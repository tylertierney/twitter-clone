import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay, startWith } from 'rxjs';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { TrendingTopicsComponent } from '../trending-topics/trending-topics.component';
import { WhoToFollowComponent } from '../who-to-follow/who-to-follow.component';

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
  showSearchBar$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.location.path().includes('search')),
    startWith(this.location.path().includes('search')),
    map((onSearchRoute) => !onSearchRoute),
    shareReplay(1)
  );

  constructor(public location: Location, private router: Router) {}
}
