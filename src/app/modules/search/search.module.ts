import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchPostsComponent } from '../../components/search/search-posts/search-posts.component';
import { SearchTagsComponent } from '../../components/search/search-tags/search-tags.component';
import { SearchUsersComponent } from '../../components/search/search-users/search-users.component';
import { SearchComponent } from '../../components/search/search.component';
import { PostModule } from '../post/post.module';
import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [CommonModule, SearchRoutingModule, PostModule, SharedModule],
  declarations: [
    SearchComponent,
    SearchPostsComponent,
    SearchUsersComponent,
    SearchTagsComponent,
  ],
})
export class SearchModule {}
