import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IPost } from '../../../services/posts/posts.service';

@Component({
  selector: 'app-tweet-search-result',
  templateUrl: './tweet-search-result.component.html',
  styleUrls: ['./tweet-search-result.component.css'],
})
export class TweetSearchResultComponent {
  domain = environment.domain;

  @Input() post: IPost;
}
