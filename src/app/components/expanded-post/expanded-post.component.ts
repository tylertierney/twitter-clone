import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { IPost, PostsService } from '../../services/posts/posts.service';
import { NewPostComponent } from '../new-post/new-post.component';
import { SubNavComponent } from '../shared/sub-nav/sub-nav.component';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { PostComponent } from '../post/post.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NewPostComponent,
    SubNavComponent,
    BackButtonComponent,
    PostComponent,
  ],
  selector: 'app-expanded-post',
  templateUrl: './expanded-post.component.html',
  styleUrls: ['./expanded-post.component.css'],
})
export class ExpandedPostComponent {
  postId$ = this.activatedRoute.params.pipe(
    map(({ post_id }) => post_id),
    filter(Boolean),
    shareReplay(1)
  );

  post$: Observable<IPost> = this.postId$.pipe(
    switchMap((id) => this.postsService.getPostById(id))
  );

  replies$: Observable<IPost[]> = this.postId$.pipe(
    switchMap((id) => this.postsService.getRepliesByPostId(id))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    public postsService: PostsService,
    public location: Location
  ) {}
}
