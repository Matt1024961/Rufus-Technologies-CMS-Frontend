import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom, switchMap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { ModuleInterface } from '../interface';

import { INIT, UPDATE, LOCALSTORAGE, STORE } from '@modules/user/state/theme/actions';

import { EMPTY, of } from 'rxjs';

import { RestfulService } from '@modules/user/services/restful/restful.service';



@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private store: Store<ModuleInterface>,
    private restfulService: RestfulService
  ) { }

  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    mergeMap(() =>
      this.restfulService.getTheme().pipe(
        map((results: any) => {

          return {
            type: LOCALSTORAGE,
            result: results
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
        withLatestFrom(this.store.pipe(select(states => states['user']['theme']))),
        map(([storeAction, store]) => {
          const newStore = Object.assign({}, store, storeAction.results);
          return {
            type: LOCALSTORAGE,
            result: newStore
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
        withLatestFrom(this.store.pipe(select(states => states['user']['user-config']))),
        map(([storeAction, store]) => {
          if (Object.keys(storeAction.result).length > 0) {

            if (storeAction.result['name'] && storeAction.result['href']) {
              document.getElementById('style-manager-theme').setAttribute('href', storeAction.result['href']);
            }

            if (Number.isInteger(storeAction.result.font)) {
              switch (storeAction.result.font) {
                case 0: {
                  document.querySelector('html').classList.add('theme-font-small');
                  document.querySelector('html').classList.remove('theme-font-large');

                  break;
                }
                case 1: {
                  document.querySelector('html').classList.remove('theme-font-large');
                  document.querySelector('html').classList.remove('theme-font-small');

                  break;
                }
                case 2: {
                  document.querySelector('html').classList.add('theme-font-large');
                  document.querySelector('html').classList.remove('theme-font-small');

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
            result: storeAction.result
          };
        })
      )
    )
  );
}
