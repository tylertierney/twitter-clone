import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { SearchService } from '../../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../post/post.component';
import { map, shareReplay } from 'rxjs';
import { RxPush } from '@rx-angular/template/push';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [CommonModule, PostComponent, RxPush],
  selector: 'app-search-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.css', '../search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPostsComponent {
  constructor(private searchService: SearchService) {}

  destroyRef = inject(DestroyRef);

  posts$ = this.searchService.searchResult$.pipe(
    takeUntilDestroyed(this.destroyRef),
    map(({ posts }) => posts),
    shareReplay(1)
  );

  postsListLength$ = this.posts$.pipe(map((posts) => posts.length));
}
