import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ITag } from '../../../services/search/search.service';

@Component({
  selector: 'app-tag-search-result',
  templateUrl: './tag-search-result.component.html',
  styleUrls: ['./tag-search-result.component.css'],
})
export class TagSearchResultComponent {
  domain = environment.domain;
  @Input() tag: ITag;
}
