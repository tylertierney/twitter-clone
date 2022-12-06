import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  prefersDarkScheme: boolean = false;
  usingDarkTheme: boolean = false;

  constructor() {
    this.prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    document.body.classList.toggle('dark-theme', this.prefersDarkScheme);
    this.usingDarkTheme = document.body.classList.contains('dark-theme');
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark-theme');
    this.usingDarkTheme = document.body.classList.contains('dark-theme');
  }
}
