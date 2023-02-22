import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { SearchPostsComponent } from '../../components/search/search-posts/search-posts.component';
import { SearchUsersComponent } from '../../components/search/search-users/search-users.component';
import { SearchTagsComponent } from '../../components/search/search-tags/search-tags.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'posts', component: SearchPostsComponent },
      { path: 'people', component: SearchUsersComponent },
      { path: 'tags', component: SearchTagsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
