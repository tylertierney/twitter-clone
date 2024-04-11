import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { CommonModule } from '@angular/common';
import { MenuComponent, MenuItem } from '../../menu/menu.component';
import { map, Observable, of } from 'rxjs';
import { RxPush } from '@rx-angular/template/push';

@Component({
  standalone: true,
  imports: [CommonModule, MenuComponent, RxPush],
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css'],
})
export class SettingsMenuComponent {
  constructor(public themeService: ThemeService) {}

  // menuItems$: Observable<MenuItem[]> = of(
  //   this.themeService.usingDarkTheme
  // ).pipe(
  //   map((usingDarkTheme) => {
  //     return [
  //       {
  //         label: 'Toggle Theme',
  //         onClick: () => this.themeService.toggleTheme(),
  //         icon: usingDarkTheme ? 'light_mode' : 'dark_mode',
  //       },
  //     ];
  //   })
  // );
}
