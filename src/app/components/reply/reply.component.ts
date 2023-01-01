import { Component, Input } from '@angular/core';
import { IPost, PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent {
  constructor(public postsService: PostsService) {}
  @Input() post: IPost;
}
