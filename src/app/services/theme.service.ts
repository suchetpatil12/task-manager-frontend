import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = false;

  constructor() {

    const savedTheme =
      localStorage.getItem('theme');

    this.darkMode =
      savedTheme === 'dark';

    this.applyTheme();
  }

  toggleTheme() {

    this.darkMode = !this.darkMode;

    localStorage.setItem(
      'theme',
      this.darkMode ? 'dark' : 'light'
    );

    this.applyTheme();
  }

  isDarkMode(): boolean {

    return this.darkMode;

  }

  private applyTheme() {

    if (this.darkMode) {

      document.body.classList.add('dark-theme');

    }

    else {

      document.body.classList.remove('dark-theme');

    }

  }
}