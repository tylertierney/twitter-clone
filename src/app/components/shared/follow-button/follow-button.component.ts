import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { PostsService } from '../../../services/posts/posts.service';
import { IUser, UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  map,
  ReplaySubject,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RxPush } from '@rx-angular/template/push';

@Component({
  standalone: true,
  imports: [CommonModule, RxPush],
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowButtonComponent implements OnInit {
  currentUserSubject = new ReplaySubject<IUser>(1);
  @Input() set currentUser(user: IUser) {
    this.currentUserSubject.next(user);
  }

  targetUserSubject = new ReplaySubject<IUser>(1);
  @Input() set targetUser(user: IUser) {
    this.targetUserSubject.next(user);
  }

  isFollowingSubject = new BehaviorSubject(false);

  constructor(
    public userService: UserService,
    public postsService: PostsService
  ) {}

  clickSubject = new Subject<void>();

  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.currentUserSubject
      .pipe(
        withLatestFrom(this.targetUserSubject),
        switchMap(([currentUser, targetUser]) =>
          this.userService.getFollowingUser(currentUser.id, targetUser.id)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(this.isFollowingSubject);

    this.clickSubject
      .pipe(
        withLatestFrom(
          this.currentUserSubject,
          (_, currentUser) => currentUser
        ),
        withLatestFrom(this.targetUserSubject),
        withLatestFrom(this.isFollowingSubject),
        switchMap(([[currentUser, targetUser], isFollowing]) =>
          this.userService.followUser(
            currentUser.id,
            targetUser.id,
            isFollowing
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((isFollowing) => {
        this.isFollowingSubject.next(isFollowing);
        this.postsService.fetchFollowedPostsSubject.next();
        this.postsService.fetchAllPostsSubject.next();
      });
  }

  click(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.clickSubject.next();
  }

  text$ = this.isFollowingSubject.pipe(
    map((isFollowing) => (isFollowing ? 'Following' : 'Follow'))
  );
}
