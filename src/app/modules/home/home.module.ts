import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedComponent } from '../../components/feed/feed.component';
import { HomeComponent } from '../../components/home/home.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SettingsMenuComponent } from '../../components/navbar/settings-menu/settings-menu.component';
import { UserMenuComponent } from '../../components/navbar/user-menu/user-menu.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { UserFollowLinkComponent } from '../../components/who-to-follow/user-follow-link/user-follow-link.component';
import { WhoToFollowComponent } from '../../components/who-to-follow/who-to-follow.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileHeaderComponent } from '../../components/profile/profile-header/profile-header.component';
import { EditProfileFormComponent } from '../../components/profile/edit-profile-form/edit-profile-form.component';
import { PostModule } from '../post/post.module';
import { ExpandedPostComponent } from '../../components/expanded-post/expanded-post.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    SettingsMenuComponent,
    UserMenuComponent,
    WhoToFollowComponent,
    UserFollowLinkComponent,
    SearchbarComponent,
    FeedComponent,
    ExpandedPostComponent,
    ProfileComponent,
    ProfileHeaderComponent,
    EditProfileFormComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    HomeRoutingModule,
    PostModule,
  ],
  exports: [],
  providers: [],
})
export class HomeModule {}
