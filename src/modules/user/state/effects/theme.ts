import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  map,
  catchError,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { ModuleInterface } from '../interface';

import {
  INIT,
  UPDATE,
  LOCALSTORAGE,
  STORE,
} from '@modules/user/state/theme/actions';

import { EMPTY, of } from 'rxjs';

import { RestfulService } from '@modules/user/services/restful/restful.service';

@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private store: Store<ModuleInterface>,
    private restfulService: RestfulService
  ) {}

  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    mergeMap(() =>
      this.restfulService.getTheme().pipe(
        map((results: any) => {
          return {
            type: LOCALSTORAGE,
            result: results,
          };
        }),
        catchError((err) => {
          console.log(err);
          return EMPTY;
        })
      )
    )
  );

  @Effect({ dispatch: true })
  updateAction = this.actions.pipe(
    ofType(UPDATE),
    switchMap((action: any) =>
      of(action).pipe(
        withLatestFrom(
          this.store.pipe(select((states) => states['user']['theme']))
        ),
        map(([storeAction, store]) => {
          const newStore = Object.assign({}, store, storeAction.results);
          return {
            type: LOCALSTORAGE,
            result: newStore,
          };
        })
      )
    )
  );

  @Effect({ dispatch: true })
  localStorageAction = this.actions.pipe(
    ofType(LOCALSTORAGE),
    switchMap((action: any) =>
      of(action).pipe(
        withLatestFrom(
          this.store.pipe(select((states) => states['user']['user-config']))
        ),
        map(([storeAction, store]) => {
          if (Object.keys(storeAction.result).length > 0) {
            if (document.getElementById(`simple-theme-classes`)) {
              document.getElementById(`simple-theme-classes`).remove();
            }
            if (storeAction.result['name'] && storeAction.result['href']) {
              const styleTag = document.createElement('style');
              styleTag.id = `simple-theme-classes`;

              switch (storeAction.result['href']) {
                case 'assets/themes/deeppurple-amber.css': {
                  document
                    .getElementById('style-manager-theme')
                    .setAttribute('href', storeAction.result['href']);

                  const specificStyles = {
                    '.mat-primary-bg': {
                      'background-color': '#673ab7',
                      color: '#ffd740',
                    },
                    '.mat-accent-bg': {
                      'background-color': '#ffd740',
                      color: '#673ab7',
                    },
                    '.mat-warn-bg': {
                      'background-color': '#f44336',
                    },
                  };
                  let cssString = ``;
                  for (const key in specificStyles) {
                    if (key) {
                      cssString += ` ${key} {`;
                      for (const nestedKey in specificStyles[key]) {
                        if (nestedKey) {
                          cssString += `${nestedKey} : ${specificStyles[key][nestedKey]};`;
                        }
                      }
                      cssString += `}`;
                    }
                  }

                  styleTag.appendChild(document.createTextNode(cssString));

                  document
                    .getElementsByTagName('head')[0]
                    .appendChild(styleTag);

                  break;
                }
                case 'assets/themes/indigo-pink.css': {
                  document
                    .getElementById('style-manager-theme')
                    .setAttribute('href', storeAction.result['href']);

                  const specificStyles = {
                    '.mat-primary-bg': {
                      'background-color': '#3f51b5',
                      color: '#fff !important',
                    },
                    '.mat-accent-bg': {
                      'background-color': '#ff4081',
                      color: 'rgba(0,0,0,.87) !important',
                    },
                    '.mat-warn-bg': { 'background-color': '#f44336' },
                  };
                  let cssString = ``;
                  for (const key in specificStyles) {
                    if (key) {
                      cssString += ` ${key} {`;
                      for (const nestedKey in specificStyles[key]) {
                        if (nestedKey) {
                          cssString += `${nestedKey} : ${specificStyles[key][nestedKey]};`;
                        }
                      }
                      cssString += `}`;
                    }
                  }

                  styleTag.appendChild(document.createTextNode(cssString));

                  document
                    .getElementsByTagName('head')[0]
                    .appendChild(styleTag);
                  break;
                }
                case 'assets/themes/pink-bluegrey.css': {
                  document
                    .getElementById('style-manager-theme')
                    .setAttribute('href', storeAction.result['href']);

                  const specificStyles = {
                    '.mat-primary-bg': {
                      'background-color': '#c2185b',
                      color: '#b0bec5',
                    },
                    '.mat-accent-bg': {
                      'background-color': '#b0bec5',
                      color: '#c2185b',
                    },
                    '.mat-warn-bg': { 'background-color': '#f44336' },
                  };
                  let cssString = ``;
                  for (const key in specificStyles) {
                    if (key) {
                      cssString += ` ${key} {`;
                      for (const nestedKey in specificStyles[key]) {
                        if (nestedKey) {
                          cssString += `${nestedKey} : ${specificStyles[key][nestedKey]};`;
                        }
                      }
                      cssString += `}`;
                    }
                  }
                  styleTag.appendChild(document.createTextNode(cssString));

                  document
                    .getElementsByTagName('head')[0]
                    .appendChild(styleTag);
                  break;
                }
                case 'assets/themes/purple-green.css': {
                  document
                    .getElementById('style-manager-theme')
                    .setAttribute('href', storeAction.result['href']);

                  const specificStyles = {
                    '.mat-primary-bg': {
                      'background-color': '#7b1fa2',
                      color: '#69f0ae',
                    },
                    '.mat-accent-bg': {
                      'background-color': '#69f0ae',
                      color: '#7b1fa2',
                    },
                    '.mat-warn-bg': { 'background-color': '#f44336' },
                  };
                  let cssString = ``;

                  for (const key in specificStyles) {
                    if (key) {
                      cssString += ` ${key} {`;
                      for (const nestedKey in specificStyles[key]) {
                        if (nestedKey) {
                          cssString += `${nestedKey} : ${specificStyles[key][nestedKey]};`;
                        }
                      }
                      cssString += `}`;
                    }
                  }

                  styleTag.appendChild(document.createTextNode(cssString));

                  document
                    .getElementsByTagName('head')[0]
                    .appendChild(styleTag);
                  break;
                }
                default: {
                  console.error('hmmm');
                }
              }
            }

            if (Number.isInteger(storeAction.result.font)) {
              switch (storeAction.result.font) {
                case 0: {
                  document
                    .querySelector('html')
                    .classList.add('theme-font-small');
                  document
                    .querySelector('html')
                    .classList.remove('theme-font-large');

                  break;
                }
                case 1: {
                  document
                    .querySelector('html')
                    .classList.remove('theme-font-large');
                  document
                    .querySelector('html')
                    .classList.remove('theme-font-small');

                  break;
                }
                case 2: {
                  document
                    .querySelector('html')
                    .classList.add('theme-font-large');
                  document
                    .querySelector('html')
                    .classList.remove('theme-font-small');

                  break;
                }
                default: {
                  console.error('hmmmm');
                  break;
                }
              }
            }

            localStorage.setItem('theme', JSON.stringify(storeAction.result));
          } else {
            console.error('no user config!');
          }
          return {
            type: STORE,
            result: storeAction.result,
          };
        })
      )
    )
  );
}
