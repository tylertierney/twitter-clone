import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../../app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserComponent } from '../../components/user/user.component';
import { FeedComponent } from '../../components/feed/feed.component';
import { PostComponent } from '../../components/post/post.component';
import { PostBodyComponent } from '../../components/post/post-body/post-body.component';
import { PostHeaderComponent } from '../../components/post/post-header/post-header.component';
import { ReadableDatePipe } from '../../pipes/readable-date.pipe';
import { NewPostComponent } from '../../components/new-post/new-post.component';
import { LoginComponent } from '../../components/auth/login/login.component';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { HomeComponent } from '../../components/home/home.component';
import { SubmitButtonComponent } from '../../components/shared/submit-button/submit-button.component';
import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';
import { MenuComponent } from '../../components/shared/menu/menu.component';
import { MenuDirective } from '../../components/shared/menu/directive/menu.directive';
import { MenuModule } from '../menu/menu.module';
import { SettingsMenuComponent } from '../../components/navbar/settings-menu/settings-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    FeedComponent,
    PostComponent,
    PostBodyComponent,
    PostHeaderComponent,
    ReadableDatePipe,
    NewPostComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SubmitButtonComponent,
    SettingsMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
