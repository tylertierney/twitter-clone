import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { PostsService } from 'src/app/services/posts/posts.service';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.postsService.fetchFollowedPosts();
  }
}
