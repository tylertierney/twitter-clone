import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/services/posts/posts.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: IPost;
  @Input() expanded: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
