import { Component } from '@angular/core';
import { SearchService } from '../../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../post/post.component';

@Component({
  standalone: true,
  imports: [CommonModule, PostComponent],
  selector: 'app-search-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.css'],
})
export class SearchPostsComponent {
  constructor(public searchService: SearchService) {}
}
