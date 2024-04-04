import { Component, Input } from '@angular/core';
import { IPost, PostsService } from '../../services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, PostComponent, NewPostComponent, RouterModule],
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent {
  constructor(public postsService: PostsService) {}
  @Input() post: IPost;
}
