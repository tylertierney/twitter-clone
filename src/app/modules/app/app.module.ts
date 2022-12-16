import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../../app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from '../../components/auth/login/login.component';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { SubmitButtonComponent } from '../../components/shared/submit-button/submit-button.component';
import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';
import { MenuModule } from '../menu/menu.module';
import { HomeModule } from '../home/home.module';
import { ApiInterceptor } from '../../interceptors/api-interceptor';
import { Token } from '@angular/compiler';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SubmitButtonComponent,
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
    HomeModule,
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
