import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../../app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from '../../components/auth/login/login.component';
import { RegisterComponent } from '../../components/auth/register/register.component';
// import { SubmitButtonComponent } from '../../components/shared/submit-button/submit-button.component';
import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';
import { MenuModule } from '../menu/menu.module';
import { HomeModule } from '../home/home.module';
import { ApiInterceptor } from '../../interceptors/api-interceptor';
import { SharedModule } from '../shared/shared.module';
import { RouteReuseStrategy } from '@angular/router';
import { HomeRouteReuseStrategy } from '../home/home-route-reuse-strategy';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    // SubmitButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    MenuModule,
    HomeModule,
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    // { provide: RouteReuseStrategy, useClass: HomeRouteReuseStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
