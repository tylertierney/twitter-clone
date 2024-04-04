import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { HomeRouteReuseStrategy } from './home-route-reuse-strategy';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule, SharedModule, HomeRoutingModule],
  exports: [],
  providers: [
    { provide: RouteReuseStrategy, useClass: HomeRouteReuseStrategy },
  ],
})
export class HomeModule {}
