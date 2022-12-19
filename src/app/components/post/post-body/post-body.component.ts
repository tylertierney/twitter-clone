import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { IPost, PostsService } from '../../../services/posts/posts.service';
import { IUser } from '../../../services/user/user.service';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.css'],
})
export class PostBodyComponent implements OnInit {
  @Input() currentUser: IUser;
  @Input() expanded: boolean;
  @Input() post: IPost;
  isLiked: boolean;

  constructor(
    public postsService: PostsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postsService
      .getPostIsLiked(this.post.id, this.currentUser.id)
      .subscribe((isLiked) => (this.isLiked = isLiked));
  }

  togglePostLiked(post_id: string, user_id: string) {
    this.postsService
      .togglePostLiked(post_id, user_id)
      .subscribe((isLiked) => (this.isLiked = isLiked));
  }
}
