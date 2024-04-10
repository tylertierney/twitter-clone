import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  DestroyRef,
  inject,
  Input,
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
})
export class PostToolbarComponent {
  @Input() currentUser: IUser;

  postSubject = new ReplaySubject<IPost>(1);

  @Input() set post(post: IPost) {
    this.postSubject.next(post);
  }

  likes$ = this.postSubject.pipe(
    map(({ likes }) => likes),
    filter(Boolean)
  );

  numOfLikes$ = this.likes$.pipe(map((likes) => likes.length));

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
    )
  );

  isLiked$ = merge(this.initialPostIsLiked$, this.likeToggleApiResult$);

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
}
