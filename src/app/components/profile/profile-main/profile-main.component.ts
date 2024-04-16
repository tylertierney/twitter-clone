import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { combineLatest, filter, map, shareReplay, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { PostsService } from '../../../services/posts/posts.service';
import { ThemeService } from '../../../services/theme/theme.service';
import { PostComponent } from '../../post/post.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { SubNavComponent } from '../../shared/sub-nav/sub-nav.component';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SubNavComponent,
    BackButtonComponent,
    ProfileHeaderComponent,
    PostComponent,
    RxPush,
    RouterModule,
  ],
  selector: 'profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMainComponent {
  username$ = this.activatedRoute.params.pipe(
    map(({ username }) => username),
    filter(Boolean)
  );
  user$ = this.username$.pipe(
    switchMap((username) => this.userService.getUserByUsername(username)),
    shareReplay(1)
  );
  name$ = this.user$.pipe(
    map(({ name }) => name),
    filter(Boolean)
  );
  description$ = this.user$.pipe(
    map(({ description }) => description),
    filter(Boolean)
  );
  created_at$ = this.user$.pipe(
    map(({ created_at }) => created_at),
    filter(Boolean)
  );

  posts$ = this.username$.pipe(
    switchMap((username) => this.postsService.getPostsByUsername(username)),
    shareReplay(1)
  );
  numOfFollowing$ = this.username$.pipe(
    switchMap((username) =>
      this.userService.getFollowingListForAUser(username)
    ),
    map((arr) => arr.length)
  );

  numOfFollowers$ = this.username$.pipe(
    switchMap((username) =>
      this.userService.getFollowersListForAUser(username)
    ),
    map((arr) => arr.length)
  );
  numOfFollowersText$ = this.numOfFollowers$.pipe(
    map((num) => (num === 0 ? 'Followers' : num > 1 ? 'Followers' : 'Follower'))
  );

  isEditable$ = combineLatest([this.authService.userSubject, this.user$]).pipe(
    map(([currentUser, targetUser]) => currentUser.id === targetUser.id)
  );

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {}
}
