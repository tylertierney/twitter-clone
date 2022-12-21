import { Component, Input } from '@angular/core';
import { IPost } from '../../services/posts/posts.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent {
  @Input() post: IPost;
}
