import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CircularProgressComponent } from '../../components/shared/circular-progress/circular-progress.component';
import { MenuModule } from '../menu/menu.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../components/shared/modal/modal.component';
// import { MatIconModule } from '@angular/material/icon';

// const materialModules = [MatIconModule];

@NgModule({
  declarations: [CircularProgressComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    OverlayModule,
    DialogModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CircularProgressComponent,
    MenuModule,
    OverlayModule,
    DialogModule,
    MatDialogModule,
    ModalComponent,
  ],
})
export class SharedModule {}
