import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  constructor() { }

  getUserConfig() {
    const simpleObservable = new Observable((observer) => {
      const currentTheme = JSON.parse(localStorage.getItem('theme'));

      const tempReturn = {
        'theme-name': currentTheme && currentTheme['theme-name'] ? currentTheme['theme-name'] : 'indigo-pink',
        'theme-href': currentTheme && currentTheme['theme-href'] ? currentTheme['theme-href'] : 'assets/themes/indigo-pink.css',
        font: currentTheme && currentTheme.font ? currentTheme.font : 1
      };

      observer.next(tempReturn);
      observer.complete();
    });
    return simpleObservable;

  }
}
