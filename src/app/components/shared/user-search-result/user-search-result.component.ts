import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FollowButtonComponent } from '../follow-button/follow-button.component';
import { RxPush } from '@rx-angular/template/push';
import { filter, map, ReplaySubject, withLatestFrom } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FollowButtonComponent, RxPush],
  selector: 'app-user-search-result',
  templateUrl: './user-search-result.component.html',
  styleUrls: ['./user-search-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchResultComponent {
  userSubject = new ReplaySubject<IUser>(1);
  @Input() set user(user: IUser) {
    this.userSubject.next(user);
  }
  @Input() showDescription = false;
  @Input() showFollowButton = false;

  name$ = this.userSubject.pipe(
    map(({ name }) => name),
    filter(Boolean)
  );

  username$ = this.userSubject.pipe(
    map(({ username }) => username),
    filter(Boolean)
  );

  description$ = this.userSubject.pipe(
    map(({ description }) => description),
    filter(Boolean)
  );

  profile_pic$ = this.userSubject.pipe(
    map(({ profile_pic }) => profile_pic),
    filter(Boolean)
  );

  profileLink$ = this.username$.pipe(map((username) => [`/${username}`]));

  profile_pic_link$ = this.username$.pipe(
    withLatestFrom(this.profile_pic$),
    map(
      ([username, profile_pic]) =>
        `${environment.domain}/users/${username}/profile_pic/${profile_pic}`
    )
  );

  currentUser$ = this.authService.userSubject;

  constructor(public authService: AuthService) {}

  stopPropagation(e: MouseEvent) {
    e.stopPropagation();
  }

  onImageError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/user-avatar/gray.svg';
  }
}
