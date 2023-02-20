import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost, PostsService } from 'src/app/services/posts/posts.service';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  selectedFeed$: Observable<IPost[]> = this.postsService.allPosts$;

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  handleTabChange(label: string) {
    if (label === 'Everyone') {
      this.selectedFeed$ = this.postsService.allPosts$;
    } else {
      this.selectedFeed$ = this.postsService.followedPosts$;
    }
  }
}
