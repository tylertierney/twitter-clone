import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/shared/menu/menu.component';
import { MenuDirective } from '../../components/shared/menu/directive/menu.directive';
import { SharedModule } from '../shared/shared.module';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@NgModule({
  declarations: [MenuComponent, MenuDirective, ClickOutsideDirective],
  imports: [CommonModule],
  exports: [MenuDirective],
})
export class MenuModule {}
