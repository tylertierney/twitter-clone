import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  usingDarkThemeSubject = new BehaviorSubject(false);

  constructor() {
    let themeFromLocalStorage = localStorage.getItem('dark-theme');
    if (themeFromLocalStorage) {
      if (JSON.parse(themeFromLocalStorage) === true) {
        document.body.classList.add('dark-theme');
        this.usingDarkThemeSubject.next(true);
      }
    } else {
      localStorage.setItem('dark-theme', 'false');
      this.usingDarkThemeSubject.next(false);
    }
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark-theme');
    const usingDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', JSON.stringify(usingDarkTheme));
    this.usingDarkThemeSubject.next(usingDarkTheme);
  }
}
