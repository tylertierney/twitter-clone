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
  posts$: Observable<any[]>;

  constructor(
    private postsService: PostsService,
    public authService: AuthService,
    private http: HttpClient,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();
  }

  getUser() {
    this.authService.user$.subscribe(console.log);
  }

  getNewPosts() {
    this.posts$ = this.postsService.getAllPosts();
  }
}
