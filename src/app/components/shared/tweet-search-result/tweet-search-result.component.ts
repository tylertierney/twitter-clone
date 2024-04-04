import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IPost } from '../../../services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-tweet-search-result',
  templateUrl: './tweet-search-result.component.html',
  styleUrls: ['./tweet-search-result.component.css'],
})
export class TweetSearchResultComponent {
  domain = environment.domain;

  @Input() post: IPost;

  onImageError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/header-pics/gray-header-pic.svg';
  }
}
