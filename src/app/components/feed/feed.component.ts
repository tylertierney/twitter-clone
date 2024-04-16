import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject, withLatestFrom } from 'rxjs';
import {
  IPost,
  NewPost,
  PostsService,
} from 'src/app/services/posts/posts.service';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { CommonModule } from '@angular/common';
import { SubNavComponent } from '../shared/sub-nav/sub-nav.component';
import { NavTabsComponent } from '../shared/tabs/nav-tabs/nav-tabs.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { PostComponent } from '../post/post.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SubNavComponent,
    NavTabsComponent,
    NewPostComponent,
    PostComponent,
  ],
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  selectedFeed$: Observable<IPost[]> = this.postsService.allPosts$;

  // newPostValueSubject = new ReplaySubject<NewPost>(1);

  // newPostSubmissionSubject = new Subject<void>();

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

  ngOnInit(): void {
    // this.newPostSubmissionSubject
    //   .pipe(withLatestFrom(this.newPostValueSubject, (_, form) => form))
    //   .subscribe(console.log);
  }
}
