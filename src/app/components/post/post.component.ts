import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import {
  filter,
  map,
  ReplaySubject,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { IPost, PostsService } from 'src/app/services/posts/posts.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { PostBodyComponent } from './post-body/post-body.component';
import { PostHeaderComponent } from './post-header/post-header.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PostHeaderComponent,
    PostBodyComponent,
    RxPush,
  ],
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  postSubject = new ReplaySubject<IPost>(1);
  @Input() set post(post: IPost) {
    this.postSubject.next(post);
  }
  // @Input() post: IPost;
  // domain = environment.domain;
  @Input() showToolbar = true;
  @Input() hasReply: boolean = false;
  @Input() showReplyHandle = false;
  @Input() showParent = true;
  @Input() showMedia = true;
  @Input() helperText: TemplateRef<HTMLElement>;

  repliedPost$ = this.postSubject.pipe(
    map(({ replying_to }) => replying_to),
    filter(Boolean),
    switchMap((id) => this.postsService.getPostById(id)),
    shareReplay(1)
  );

  constructor(
    public authService: AuthService,
    public postsService: PostsService
  ) {}

  ngOnInit(): void {
    // if (this.post.replying_to) {
    //   this.repliedPost$ = this.postsService.getPostById(this.post.replying_to);
    // }
    // this.photo_url = this.post.photo_url;
  }

  id$ = this.postSubject.pipe(
    map(({ id }) => id),
    filter(Boolean)
  );

  username$ = this.postSubject.pipe(
    map(({ username }) => username),
    filter(Boolean)
  );

  expandedPostLink$ = this.username$.pipe(
    withLatestFrom(this.id$),
    map(([username, id]) => `/${username}/${id}`)
  );

  name$ = this.postSubject.pipe(
    map(({ name }) => name),
    filter(Boolean)
  );

  altText$ = this.name$.pipe(map((name) => `${name}'s Profile Picture`));

  userLink$ = this.username$.pipe(map((username) => `/${username}`));

  profile_pic$ = this.postSubject.pipe(
    map(({ profile_pic }) => profile_pic),
    filter(Boolean)
  );

  imageSrc$ = this.username$.pipe(
    withLatestFrom(this.profile_pic$),
    map(
      ([username, profile_pic]) =>
        `${environment.domain}/users/${username}/profile_pic/${profile_pic}`
    )
  );

  onError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/user-avatar/gray.svg';
  }

  postDeleted = false;

  currentUser$ = this.authService.userSubject;
}
