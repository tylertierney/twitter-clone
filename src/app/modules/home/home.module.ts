import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedComponent } from '../../components/feed/feed.component';
import { HomeComponent } from '../../components/home/home.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SettingsMenuComponent } from '../../components/navbar/settings-menu/settings-menu.component';
import { UserMenuComponent } from '../../components/navbar/user-menu/user-menu.component';
import { NewPostComponent } from '../../components/new-post/new-post.component';
import { PostBodyComponent } from '../../components/post/post-body/post-body.component';
import { PostHeaderComponent } from '../../components/post/post-header/post-header.component';
import { PostComponent } from '../../components/post/post.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { UserFollowLinkComponent } from '../../components/who-to-follow/user-follow-link/user-follow-link.component';
import { WhoToFollowComponent } from '../../components/who-to-follow/who-to-follow.component';
import { ReadableDatePipe } from '../../pipes/readable-date.pipe';
import { MenuModule } from '../menu/menu.module';
import { HomeRoutingModule } from './home-routing.module';

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
    NewPostComponent,
    PostComponent,
    PostHeaderComponent,
    PostBodyComponent,
    ReadableDatePipe,
    ProfileComponent,
  ],
  imports: [CommonModule, FormsModule, HomeRoutingModule, MenuModule],
  exports: [],
})
export class HomeModule {}
