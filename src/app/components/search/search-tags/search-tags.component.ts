import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { SearchService } from '../../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { TagSearchResultComponent } from '../../shared/tag-search-result/tag-search-result.component';
import { RxPush } from '@rx-angular/template/push';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TagSearchResultComponent, RxPush],
  selector: 'app-search-tags',
  templateUrl: './search-tags.component.html',
  styleUrls: ['./search-tags.component.css', '../search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTagsComponent {
  constructor(private searchService: SearchService) {}

  destroyRef = inject(DestroyRef);

  tags$ = this.searchService.searchResult$.pipe(
    takeUntilDestroyed(this.destroyRef),
    map(({ tags }) => tags),
    shareReplay(1)
  );

  tagsListLength$ = this.tags$.pipe(map((tags) => tags.length));
}
