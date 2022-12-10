import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  posts$: Observable<any[]>;

  // posts$ = new Subject([]);
  // posts$ = new BehaviorSubject<any[]>([]);

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();
    // this.postsService.getAllPosts().subscribe(this.posts$.next);
    // this.postsService.getAllPosts().subscribe((res) => console.log(res));
  }
}
