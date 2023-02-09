import { NgModule } from '@angular/core';
import {
  BaseRouteReuseStrategy,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { ExpandedPostComponent } from '../../components/expanded-post/expanded-post.component';
import { FeedComponent } from '../../components/feed/feed.component';
import { HomeComponent } from '../../components/home/home.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';
import { HomeRouteReuseStrategy } from './home-route-reuse-strategy';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', pathMatch: 'full', component: FeedComponent },
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
