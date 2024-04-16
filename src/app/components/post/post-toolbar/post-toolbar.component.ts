import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { RxPush } from '@rx-angular/template/push';
import {
  filter,
  map,
  merge,
  ReplaySubject,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { ModalService } from '../../../services/modal/modal.service';
import { IPost, PostsService } from '../../../services/posts/posts.service';
import { IUser } from '../../../services/user/user.service';
import { ReplyComponent } from '../../reply/reply.component';
import { PostButtonComponent } from '../post-button/post-button.component';

@Component({
  standalone: true,
  imports: [CommonModule, PostButtonComponent, ReplyComponent, RxPush],
  selector: 'app-post-toolbar',
  templateUrl: './post-toolbar.component.html',
  styleUrls: ['./post-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostToolbarComponent implements OnInit {
  @Input() currentUser: IUser;

  postSubject = new ReplaySubject<IPost>(1);

  @Input() set post(post: IPost) {
    this.postSubject.next(post);
  }

  likes$ = this.postSubject.pipe(
    map(({ likes }) => likes),
    filter(Boolean)
  );

  likeToggleClickSubject = new Subject<void>();

  initialPostIsLiked$ = this.likes$.pipe(
    map((likes) => likes.includes(this.currentUser.id))
  );

  destroyRef = inject(DestroyRef);

  likeToggleApiResult$ = this.likeToggleClickSubject.pipe(
    takeUntilDestroyed(this.destroyRef),
    withLatestFrom(this.postSubject, (_, post) => post.id),
    switchMap((post_id) =>
      this.postsService.togglePostLiked(post_id, this.currentUser.id)
    ),
    shareReplay(1)
  );

  isLiked$ = merge(this.initialPostIsLiked$, this.likeToggleApiResult$).pipe(
    shareReplay(1)
  );

  numOfLikes = 0;

  ngOnInit(): void {
    this.likes$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(({ length }) => length)
      )
      .subscribe((num) => {
        this.numOfLikes = num;
      });

    this.likeToggleApiResult$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((liked) => {
        if (liked) {
          this.numOfLikes = this.numOfLikes + 1;
        } else {
          this.numOfLikes = this.numOfLikes - 1;
        }
      });

    // this.retweetClicked$.pipe(switchMap(() => this.postsService.createNewPost()))
  }

  replyCount$ = this.postSubject.pipe(
    map(({ reply_count }) => reply_count),
    filter(Boolean),
    startWith(0)
  );

  constructor(
    public postsService: PostsService,
    public dialog: MatDialog,
    private http: HttpClient,
    public modalService: ModalService
  ) {}

  openModal(template: TemplateRef<ReplyComponent>) {
    this.modalService.open({
      content: template,
    });
  }

  retweetClicked$ = new Subject<void>();
}
