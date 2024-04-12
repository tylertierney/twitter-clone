import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RxPush } from '@rx-angular/template/push';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  standalone: true,
  imports: [CommonModule, RxPush],
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css'],
})
export class SettingsMenuComponent {
  constructor(public themeService: ThemeService) {
    const brandPrimary = window
      .getComputedStyle(document.body)
      .getPropertyValue('--brand-primary');

    const asNumberArray = brandPrimary
      .split(',')
      .map((str) => parseInt(str, 10)) as [number, number, number];

    this.colors = [asNumberArray, ...this.colors];

    const savedThemeColor = localStorage.getItem('theme-color');

    if (savedThemeColor) {
      document.body.style.setProperty('--brand-primary', savedThemeColor);
    }
  }

  colorChangerIsOpen = false;

  colors: Array<[number, number, number]> = [
    [255, 197, 57], // gold
    [255, 102, 1], // orange
    [0, 226, 70], // green
    [226, 0, 178], // pink
    [255, 51, 51], // red
    [100, 68, 196], // purple
  ];

  setNewThemeColor(color: [number, number, number]) {
    const asString = color.join(',');
    document.body.style.setProperty('--brand-primary', asString);
    localStorage.setItem('theme-color', asString);
  }
}
