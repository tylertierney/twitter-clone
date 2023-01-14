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

@NgModule({
  declarations: [
    CircularProgressComponent,
    ModalComponent,
    SubmitButtonComponent,
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
  ],
})
export class SharedModule {}
