import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PostsService } from 'src/app/services/posts/posts.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  user$: Observable<any>;
  // posts$: Observable<any[]>;

  posts$ = new BehaviorSubject<any[]>([]);

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    private http: HttpClient,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.getFollowedPosts(user.id);
      // this.postsService
      //   .getFollowedPosts(user.id)
      //   .subscribe((posts) => this.posts$.next(posts));
    });
    // this.user$ = this.authService.user$;
    // this.posts$ = this.postsService.getFollowedPosts();
  }

  getUser() {
    this.authService.user$.subscribe(console.log);
  }

  getFollowedPosts(userId: string) {
    this.postsService
      .getFollowedPosts(userId)
      .subscribe((posts) => this.posts$.next(posts));
  }
}
