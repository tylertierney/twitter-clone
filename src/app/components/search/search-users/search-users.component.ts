import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { SearchService } from '../../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { UserSearchResultComponent } from '../../shared/user-search-result/user-search-result.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';
import { RxPush } from '@rx-angular/template/push';

@Component({
  standalone: true,
  imports: [CommonModule, UserSearchResultComponent, RxPush],
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css', '../search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchUsersComponent {
  constructor(private searchService: SearchService) {}

  destroyRef = inject(DestroyRef);

  users$ = this.searchService.searchResult$.pipe(
    takeUntilDestroyed(this.destroyRef),
    map(({ users }) => users),
    shareReplay(1)
  );
}
