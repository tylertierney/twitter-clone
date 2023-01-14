import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal/modal.service';
import { IPost, PostsService } from '../../../services/posts/posts.service';
import { IUser } from '../../../services/user/user.service';
import { ReplyComponent } from '../../reply/reply.component';

@Component({
  selector: 'app-post-toolbar',
  templateUrl: './post-toolbar.component.html',
  styleUrls: ['./post-toolbar.component.css'],
})
export class PostToolbarComponent implements OnInit {
  @Input() currentUser: IUser;
  @Input() post: IPost;
  isLiked: boolean;
  numOfLikes: number;
  numOfReplies: number;

  constructor(
    public postsService: PostsService,
    public dialog: MatDialog,
    private http: HttpClient,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.postsService
      .getPostIsLiked(this.post.id, this.currentUser.id)
      .subscribe((isLiked) => (this.isLiked = isLiked));

    this.http
      .get<number>(`/posts/${this.post.id}/likes`)
      .subscribe((x) => (this.numOfLikes = x));

    this.http
      .get<number>(`/posts/${this.post.id}/reply-count`)
      .subscribe((x) => {
        this.numOfReplies = x;
      });
  }

  togglePostLiked(post_id: string, user_id: string) {
    this.postsService.togglePostLiked(post_id, user_id).subscribe((isLiked) => {
      this.isLiked = isLiked;
      isLiked ? (this.numOfLikes += 1) : (this.numOfLikes -= 1);
    });
  }

  openModal(template: TemplateRef<ReplyComponent>) {
    this.modalService.open({
      content: template,
    });
  }
}
