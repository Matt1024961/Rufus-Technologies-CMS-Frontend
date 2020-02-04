import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  constructor() { }

  getTheme() {
    const simpleObservable = new Observable((observer) => {
      const currentTheme = JSON.parse(localStorage.getItem('theme'));
      const tempReturn = {
        name: currentTheme && currentTheme['name'] ? currentTheme['name'] : 'indigo-pink',
        href: currentTheme && currentTheme['href'] ? currentTheme['href'] : 'assets/themes/indigo-pink.css',
        font: currentTheme && Number.isInteger(currentTheme.font) ? currentTheme.font : 1
      };

      observer.next(tempReturn);
      observer.complete();
    });
    return simpleObservable;

  }

  getAuthentication() {
    const simpleObservable = new Observable((observer) => {
      const currentAuthentication = JSON.parse(localStorage.getItem('authentication'));

      let tempReturn = {};
      if (currentAuthentication) {
        tempReturn = {
          name: currentAuthentication['name'],
          token: currentAuthentication['token'],
        };
      } else {
        tempReturn = null;
      }


      observer.next(tempReturn);
      observer.complete();
    });
    return simpleObservable;

  }

  getLogin(credentials) {
    const simpleObservable = new Observable((observer) => {
      let temporaryReturn = {};
      if (credentials && credentials.hasOwnProperty('emailAddress') && credentials.hasOwnProperty('password')) {

        temporaryReturn = {
          id: Math.floor(Math.random() * (1000 - 1)) + 1,
          name: 'Crash Test',
          'last-login': Date.now() - 900000,
          token: Math.random().toString(36).substr(0, 20)
        };
      }
      observer.next(temporaryReturn);
      observer.complete();
    });
    return simpleObservable;
  }

  getFavorites(credentials) {
    const simpleObservable = new Observable((observer) => {
      let temporaryReturn = null;
      if (credentials && credentials.hasOwnProperty('id') && credentials.hasOwnProperty('token')) {

        temporaryReturn = [{
          link: 'https://angular.io/',
          internal: false,
          title: 'Angular'
        }, {
          link: 'https://material.angular.io/',
          internal: false,
          title: 'Angular Material'
        }, {
          link: 'https://material.io/resources/icons/?style=baseline',
          internal: false,
          title: 'Material Design Icons'
        },
        {
          link: 'https://github.com/angular/flex-layout',
          internal: false,
          title: 'Flex-Layout'
        }, {
          link: 'https://ngrx.io/',
          internal: false,
          title: 'NGRX'
        }, {
          link: 'https://laravel.com/',
          internal: false,
          title: 'Laravel'
        }, {
          link: 'https://github.com/Matt1024961/Boiler-Plate',
          internal: false,
          title: 'Github Repo'
        },
        ];
      }
      observer.next(temporaryReturn);
      observer.complete();
    });
    return simpleObservable;
  }
}
