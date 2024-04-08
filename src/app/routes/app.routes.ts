import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { ExpandedPostComponent } from '../components/expanded-post/expanded-post.component';
import { ExpandedTagComponent } from '../components/expanded-tag/expanded-tag.component';
import { FeedComponent } from '../components/feed/feed.component';
import { authCanActivate } from '../components/guards/auth-guard';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { SearchPostsComponent } from '../components/search/search-posts/search-posts.component';
import { SearchTagsComponent } from '../components/search/search-tags/search-tags.component';
import { SearchUsersComponent } from '../components/search/search-users/search-users.component';
import { SearchComponent } from '../components/search/search.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authCanActivate()],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', pathMatch: 'full', component: FeedComponent },
      {
        path: 'search',
        component: SearchComponent,
        children: [
          { path: '', redirectTo: 'posts', pathMatch: 'full' },
          { path: 'posts', component: SearchPostsComponent },
          { path: 'people', component: SearchUsersComponent },
          { path: 'tags', component: SearchTagsComponent },
        ],
      },
      { path: 'tag/:tag', component: ExpandedTagComponent },
      { path: ':username', component: ProfileComponent },
      { path: ':username/:post_id', component: ExpandedPostComponent },
    ],
  },
];
