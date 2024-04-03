import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { IPost, PostsService } from 'src/app/services/posts/posts.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: IPost;
  domain = environment.domain;
  @Input() showToolbar = true;
  @Input() hasReply: boolean = false;
  @Input() showReplyHandle = false;
  @Input() showParent = true;
  @Input() showMedia = true;
  @Input() helperText: TemplateRef<HTMLElement>;

  repliedPost$: Observable<IPost>;

  constructor(
    public authService: AuthService,
    public postsService: PostsService
  ) {}

  ngOnInit(): void {
    if (this.post.replying_to) {
      this.repliedPost$ = this.postsService.getPostById(this.post.replying_to);
    }

    this.photo_url = this.post.photo_url;
  }

  photo_url = '';

  get altText() {
    return `${this.post.name}'s Profile Picture`;
  }

  onError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/user-avatar/gray.svg';
  }
}
