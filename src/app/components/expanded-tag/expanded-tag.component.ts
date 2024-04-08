import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { PostsService } from '../../services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { SubNavComponent } from '../shared/sub-nav/sub-nav.component';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { PostComponent } from '../post/post.component';

@Component({
  standalone: true,
  imports: [CommonModule, SubNavComponent, BackButtonComponent, PostComponent],
  selector: 'app-expanded-tag',
  templateUrl: './expanded-tag.component.html',
  styleUrls: ['./expanded-tag.component.css'],
})
export class ExpandedTagComponent {
  tag$ = this.activatedRoute.params.pipe(
    map(({ tag }) => tag),
    filter(Boolean)
  );

  postsWithThisTag$ = this.tag$.pipe(
    switchMap((tag) => this.postsService.getPostsByTag(tag))
  );

  constructor(
    public activatedRoute: ActivatedRoute,
    public postsService: PostsService
  ) {}
}
