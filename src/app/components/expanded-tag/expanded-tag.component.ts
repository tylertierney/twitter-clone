import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-expanded-tag',
  templateUrl: './expanded-tag.component.html',
  styleUrls: ['./expanded-tag.component.css'],
})
export class ExpandedTagComponent {
  tag$ = this.activatedRoute.params.pipe(map((params) => params['tag']));

  postsWithThisTag$ = this.tag$.pipe(
    switchMap((tag) => this.postsService.getPostsByTag(tag))
  );

  constructor(
    public activatedRoute: ActivatedRoute,
    public postsService: PostsService
  ) {}
}
