import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { filter, map, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { PostsService } from '../../services/posts/posts.service';
import { ThemeService } from '../../services/theme/theme.service';
import { PostComponent } from '../post/post.component';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { SubNavComponent } from '../shared/sub-nav/sub-nav.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SubNavComponent,
    BackButtonComponent,
    RxPush,
    RouterModule,
  ],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  username$ = this.activatedRoute.params.pipe(
    map(({ username }) => username),
    filter(Boolean)
  );
  user$ = this.username$.pipe(
    switchMap((username) => this.userService.getUserByUsername(username))
  );
  posts$ = this.username$.pipe(
    switchMap((username) => this.postsService.getPostsByUsername(username))
  );

  postsLength$ = this.posts$.pipe(map((posts) => posts.length));

  postsText$ = this.postsLength$.pipe(
    map((num) => `${num} Tweet${num === 0 || num > 1 ? 's' : ''}`)
  );

  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {}
}
