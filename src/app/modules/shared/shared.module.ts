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

@NgModule({
  declarations: [
    CircularProgressComponent,
    ModalComponent,
    SubmitButtonComponent,
    ReadableDatePipe,
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
  ],
})
export class SharedModule {}
