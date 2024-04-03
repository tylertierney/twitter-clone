import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpandedPostComponent } from '../../components/expanded-post/expanded-post.component';
import { ExpandedTagComponent } from '../../components/expanded-tag/expanded-tag.component';
import { FeedComponent } from '../../components/feed/feed.component';
import { HomeComponent } from '../../components/home/home.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { authCanActivate } from '../../components/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authCanActivate()],
    children: [
      { path: '', pathMatch: 'full', component: FeedComponent },
      // { path: 'search', component: SearchComponent },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchModule),
      },
      { path: 'tag/:tag', component: ExpandedTagComponent },
      { path: ':username', component: ProfileComponent },
      { path: ':username/:post_id', component: ExpandedPostComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
