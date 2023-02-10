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
      // this.hasReply = true;
      this.repliedPost$ = this.postsService.getPostById(this.post.replying_to);
    }
  }

  test() {
    this.postsService.getPostById(this.post.id).subscribe(console.log);
  }
}
