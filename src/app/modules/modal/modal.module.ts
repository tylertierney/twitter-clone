import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDirective } from '../../components/shared/modal/directive/modal.directive';
import { ModalComponent } from '../../components/shared/modal/modal.component';

@NgModule({
  declarations: [ModalComponent, ModalDirective],
  imports: [CommonModule],
  exports: [ModalDirective],
})
export class ModalModule {}
