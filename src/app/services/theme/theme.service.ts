import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  usingDarkTheme: boolean = false;

  constructor() {
    let themeFromLocalStorage = localStorage.getItem('dark-theme');
    if (themeFromLocalStorage) {
      if (JSON.parse(themeFromLocalStorage) === true) {
        document.body.classList.add('dark-theme');
        this.usingDarkTheme = true;
      }
    } else {
      localStorage.setItem('dark-theme', 'false');
      this.usingDarkTheme = false;
    }
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark-theme');
    const usingDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', JSON.stringify(usingDarkTheme));
    this.usingDarkTheme = usingDarkTheme;
  }
}
