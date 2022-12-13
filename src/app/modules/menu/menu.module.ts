import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/shared/menu/menu.component';
import { MenuDirective } from '../../components/shared/menu/directive/menu.directive';

@NgModule({
  declarations: [MenuComponent, MenuDirective],
  imports: [CommonModule],
  exports: [MenuDirective],
})
export class MenuModule {}
