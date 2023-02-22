import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedComponent } from '../../components/feed/feed.component';
import { HomeComponent } from '../../components/home/home.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SettingsMenuComponent } from '../../components/navbar/settings-menu/settings-menu.component';
import { UserMenuComponent } from '../../components/navbar/user-menu/user-menu.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileHeaderComponent } from '../../components/profile/profile-header/profile-header.component';
import { EditProfileFormComponent } from '../../components/profile/edit-profile-form/edit-profile-form.component';
import { PostModule } from '../post/post.module';
import { ExpandedPostComponent } from '../../components/expanded-post/expanded-post.component';
import { RouteReuseStrategy } from '@angular/router';
import { HomeRouteReuseStrategy } from './home-route-reuse-strategy';
import { SidebarModule } from '../sidebar/sidebar.module';
import { SearchComponent } from '../../components/search/search.component';
import { SearchModule } from '../search/search.module';
import { ExpandedTagComponent } from '../../components/expanded-tag/expanded-tag.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SettingsMenuComponent,
    UserMenuComponent,
    FeedComponent,
    ExpandedPostComponent,
    ExpandedTagComponent,
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
    SidebarModule,
    SearchModule,
  ],
  exports: [],
  providers: [
    { provide: RouteReuseStrategy, useClass: HomeRouteReuseStrategy },
  ],
})
export class HomeModule {}
