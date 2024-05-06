import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { filter, map, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { PostsService } from '../../services/posts/posts.service';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { SubNavComponent } from '../shared/sub-nav/sub-nav.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SubNavComponent,
    BackButtonComponent,
    RxPush,
    RouterModule,
    MatMenuModule,
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

  name$ = this.user$.pipe(
    map(({ name }) => name),
    filter(Boolean)
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
