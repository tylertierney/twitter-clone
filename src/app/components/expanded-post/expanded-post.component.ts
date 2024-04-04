import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
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
export class ExpandedPostComponent implements OnInit {
  post$: Observable<IPost>;
  replies$: Observable<IPost[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    public postsService: PostsService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.post$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        const id = params['post_id'];
        return this.postsService.getPostById(id);
      })
    );

    this.replies$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        const id = params['post_id'];
        return this.postsService.getRepliesByPostId(id);
      })
    );
  }
}
