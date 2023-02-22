import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CircularProgressComponent } from '../../components/shared/circular-progress/circular-progress.component';
import { MenuModule } from '../menu/menu.module';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { SubmitButtonComponent } from '../../components/shared/submit-button/submit-button.component';
import { RouterModule } from '@angular/router';
import { ReadableDatePipe } from '../../pipes/readable-date.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { NavTabsComponent } from '../../components/shared/tabs/nav-tabs/nav-tabs.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { BackButtonComponent } from '../../components/shared/back-button/back-button.component';
import { SubNavComponent } from '../../components/shared/sub-nav/sub-nav.component';
import { UserSearchResultComponent } from '../../components/shared/user-search-result/user-search-result.component';
import { FollowButtonComponent } from '../../components/shared/follow-button/follow-button.component';
import { TweetSearchResultComponent } from '../../components/shared/tweet-search-result/tweet-search-result.component';
import { RoutedNavTabsComponent } from '../../components/shared/tabs/routed-nav-tabs/routed-nav-tabs.component';

@NgModule({
  declarations: [
    CircularProgressComponent,
    ModalComponent,
    SubmitButtonComponent,
    ReadableDatePipe,
    NavTabsComponent,
    RoutedNavTabsComponent,
    SearchbarComponent,
    BackButtonComponent,
    SubNavComponent,
    UserSearchResultComponent,
    TweetSearchResultComponent,
    FollowButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    DialogModule,
    ToastrModule.forRoot({
      maxOpened: 4,
      autoDismiss: true,
      timeOut: 5000,
      positionClass: 'toastPosition',
      toastClass: 'toastClass',
      easing: 'ease-in-out',
      tapToDismiss: true,
      newestOnTop: false,
    }),
    RouterModule,
    MatMenuModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CircularProgressComponent,
    MenuModule,
    DialogModule,
    MatDialogModule,
    ModalComponent,
    ToastrModule,
    SubmitButtonComponent,
    RouterModule,
    ReadableDatePipe,
    MatMenuModule,
    NavTabsComponent,
    RoutedNavTabsComponent,
    SearchbarComponent,
    BackButtonComponent,
    SubNavComponent,
    UserSearchResultComponent,
    TweetSearchResultComponent,
    FollowButtonComponent,
  ],
})
export class SharedModule {}
