import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CircularProgressComponent } from '../../components/shared/circular-progress/circular-progress.component';
import { MenuModule } from '../menu/menu.module';
import { ModalModule } from '../modal/modal.module';
import { OverlayModule } from '@angular/cdk/overlay';
// import { MatIconModule } from '@angular/material/icon';

// const materialModules = [MatIconModule];

@NgModule({
  declarations: [CircularProgressComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    ModalModule,
    OverlayModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CircularProgressComponent,
    MenuModule,
    ModalModule,
    OverlayModule,
  ],
})
export class SharedModule {}
