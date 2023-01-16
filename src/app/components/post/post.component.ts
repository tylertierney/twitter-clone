import { Component, Input, OnInit } from '@angular/core';
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
  @Input() expanded: boolean;
  // @Input() type: 'reply' | 'feed' | 'expanded';
  // @Input() isReply: boolean;
  domain = environment.domain;
  @Input() showToolbar = true;
  @Input() showReplyHandle = false;
  @Input() showParent = true;
  @Input() showMedia = true;

  repliedPost$: Observable<IPost>;

  constructor(
    public authService: AuthService,
    public postsService: PostsService
  ) {}

  ngOnInit(): void {
    if (this.post.replying_to) {
      this.showReplyHandle = true;
      this.repliedPost$ = this.postsService.getPostById(this.post.replying_to);
    }

    this.postsService.getAllTagsByPostId(this.post.id).subscribe((tags) => {
      this.post.tags = tags;
    });
  }
}
