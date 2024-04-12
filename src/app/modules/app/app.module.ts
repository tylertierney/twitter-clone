import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from '../../routes/app.routes';
import { AppComponent } from '../../app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiInterceptor } from '../../interceptors/api-interceptor';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      maxOpened: 6,
      autoDismiss: false,
      timeOut: 5000,
      positionClass: 'toastPosition',
      toastClass: 'toastClass',
      easing: 'ease-in-out',
      tapToDismiss: true,
      newestOnTop: false,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
