import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { TagSearchResultComponent } from '../../components/shared/tag-search-result/tag-search-result.component';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [],
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
    MenuModule,
    DialogModule,
    MatDialogModule,
    ToastrModule,
    RouterModule,
    MatMenuModule,
  ],
})
export class SharedModule {}
