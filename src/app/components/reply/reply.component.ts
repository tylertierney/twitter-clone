import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { IPost, PostsService } from '../../services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { RouterModule } from '@angular/router';
import { filter, map, ReplaySubject } from 'rxjs';
import { RxPush } from '@rx-angular/template/push';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => PostComponent),
    NewPostComponent,
    RouterModule,
    RxPush,
  ],
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplyComponent {
  postSubject = new ReplaySubject<IPost>(1);
  @Input() set post(post: IPost) {
    this.postSubject.next(post);
  }

  id$ = this.postSubject.pipe(
    map(({ id }) => id),
    filter(Boolean)
  );

  username$ = this.postSubject.pipe(
    map(({ username }) => username),
    filter(Boolean)
  );
  constructor(public postsService: PostsService) {}
  // @Input() post: IPost;
}
