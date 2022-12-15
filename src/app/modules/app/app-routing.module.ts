import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../../components/user/user.component';
import { FeedComponent } from '../../components/feed/feed.component';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { HomeComponent } from '../../components/home/home.component';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuardService],
  //   children: [
  //     {
  //       path: '',
  //       component: FeedComponent,
  //     },
  //     {
  //       path: ':username',
  //       component: UserComponent,
  //     },
  //   ],
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
