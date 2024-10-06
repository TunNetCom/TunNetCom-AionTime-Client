import { DOCUMENT } from '@angular/common';
import {Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  applyTheme(renderer: Renderer2, isDarkMode: boolean) {
    if (isDarkMode) {
      const linkElement = renderer.createElement('link');
      console.log(linkElement);
      
      linkElement.rel = 'stylesheet';
      linkElement.href = 'assets/theme/StylesBlackTheme.css';
      renderer.appendChild(document.head, linkElement);
    } else {
      const darkThemeLink = document.querySelector('link[href="assets/theme/StylesBlackTheme.css"]');
      console.log(darkThemeLink);
      if (darkThemeLink) {
        renderer.removeChild(document.head, darkThemeLink);
      }
    }
  }
}
