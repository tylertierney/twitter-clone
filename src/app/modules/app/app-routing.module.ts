import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { HomeRouteReuseStrategy } from '../home/home-route-reuse-strategy';

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
  //       component: ProfileComponent,
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
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
