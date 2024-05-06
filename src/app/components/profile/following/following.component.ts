import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { IUser, UserService } from '../../../services/user/user.service';
import {
  IRoutedTab,
  RoutedNavTabsComponent,
} from '../../shared/tabs/routed-nav-tabs/routed-nav-tabs.component';
import { ActivatedRoute } from '@angular/router';
import {
  filter,
  iif,
  map,
  ReplaySubject,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RxPush } from '@rx-angular/template/push';
import { SubNavComponent } from '../../shared/sub-nav/sub-nav.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { UserSearchResultComponent } from '../../shared/user-search-result/user-search-result.component';

@Component({
  standalone: true,
  selector: 'following',
  templateUrl: 'following.component.html',
  styleUrl: `following.component.css`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RoutedNavTabsComponent,
    RxPush,
    SubNavComponent,
    BackButtonComponent,
    UserSearchResultComponent,
  ],
})
export class FollowingComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  followersSubject = new ReplaySubject<IUser[]>(1);
  followingSubject = new ReplaySubject<IUser[]>(1);

  username$ = this.activatedRoute.parent?.params.pipe(
    map(({ username }) => username),
    filter(Boolean),
    shareReplay(1)
  );

  route$ = this.activatedRoute.url.pipe(
    map((url) => url.at(-1)),
    filter(Boolean),
    map((segment) => segment.path)
  );

  selectedList$ = this.route$.pipe(
    switchMap((route) =>
      iif(
        () => route === 'followers',
        this.followersSubject,
        this.followingSubject
      )
    )
  );

  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.username$
      ?.pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((username) =>
          this.userService.getFollowersListForAUser(username)
        )
      )
      .subscribe(this.followersSubject);

    this.username$
      ?.pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((username) =>
          this.userService.getFollowingListForAUser(username)
        )
      )
      .subscribe(this.followingSubject);
  }

  tabs: IRoutedTab[] = [
    { label: 'Followers', routerLink: '../followers' },
    { label: 'Following', routerLink: '../following' },
  ];
}
