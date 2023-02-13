import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { WhoToFollowComponent } from '../../components/who-to-follow/who-to-follow.component';
import { UserFollowLinkComponent } from '../../components/who-to-follow/user-follow-link/user-follow-link.component';
import { TrendingTopicsComponent } from '../../components/trending-topics/trending-topics.component';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [
    SidebarComponent,
    WhoToFollowComponent,
    UserFollowLinkComponent,
    TrendingTopicsComponent,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
