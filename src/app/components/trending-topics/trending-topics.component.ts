import { Component } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-trending-topics',
  templateUrl: './trending-topics.component.html',
  styleUrls: ['./trending-topics.component.css'],
})
export class TrendingTopicsComponent {
  showingMore = false;

  trendingTags = this.postsService.getTrendingTags();

  constructor(public postsService: PostsService) {}
}
